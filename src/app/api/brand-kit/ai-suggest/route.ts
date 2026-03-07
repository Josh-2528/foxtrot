import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  callClaude,
  parseJsonFromResponse,
  buildBrandSuggestionPrompt,
} from "@/lib/claude";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { description, industry } = await request.json();

  if (!description) {
    return NextResponse.json(
      { error: "Description is required" },
      { status: 400 }
    );
  }

  try {
    const { systemPrompt, userMessage } = buildBrandSuggestionPrompt({
      description,
      industry: industry || "",
    });

    const { text } = await callClaude({
      systemPrompt,
      userMessage,
      maxTokens: 512,
      userId: user.id,
      action: "brand_suggestion",
    });

    const suggestion = parseJsonFromResponse<{
      primary_colour: string;
      secondary_colour: string;
      accent_colour: string;
      background_colour: string;
      text_colour: string;
      font_preference: string;
      vibe: string;
      reasoning: string;
    }>(text);

    return NextResponse.json({ suggestion });
  } catch (error) {
    console.error("Brand suggestion error:", error);
    return NextResponse.json(
      { error: "Failed to generate brand suggestions" },
      { status: 500 }
    );
  }
}
