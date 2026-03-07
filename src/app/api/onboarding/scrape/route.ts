import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import Anthropic from "@anthropic-ai/sdk";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { url } = await request.json();

  if (!url || typeof url !== "string") {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    // Fetch the website HTML
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; Foxtrot/1.0; +https://foxtrot.app)",
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Could not fetch website" },
        { status: 422 }
      );
    }

    const html = await response.text();
    // Truncate HTML to avoid exceeding token limits
    const truncatedHtml = html.slice(0, 15000);

    // Use Claude to extract business info
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-5-20250514",
      max_tokens: 500,
      messages: [
        {
          role: "user",
          content: `Analyze this website HTML and extract:
1. Business name
2. A short description of what the business does (1-2 sentences)
3. Industry category (one of: car_wash_self_serve, car_wash_full_service, car_wash_express, car_wash_detailing, car_wash_multi, auto_service, other)
4. Up to 3 brand colours you can identify from inline styles or CSS (hex format)

Return JSON only, no markdown:
{"business_name": "", "description": "", "industry": "", "colors": ["#hex1", "#hex2", "#hex3"]}

HTML:
${truncatedHtml}`,
        },
      ],
    });

    const textContent = message.content.find((c) => c.type === "text");
    if (!textContent || textContent.type !== "text") {
      return NextResponse.json(
        { error: "AI could not parse response" },
        { status: 422 }
      );
    }

    // Parse the JSON from Claude's response
    const jsonMatch = textContent.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json(
        { error: "AI could not extract info" },
        { status: 422 }
      );
    }

    const result = JSON.parse(jsonMatch[0]);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Scrape error:", error);
    return NextResponse.json(
      { error: "Failed to analyze website" },
      { status: 500 }
    );
  }
}
