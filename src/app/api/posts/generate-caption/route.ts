import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  callClaude,
  parseJsonFromResponse,
  buildCaptionPrompt,
} from "@/lib/claude";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { topic, description, caption_style, caption_tone } = body;

  if (!topic) {
    return NextResponse.json(
      { error: "Topic is required" },
      { status: 400 }
    );
  }

  const admin = createAdminClient();

  // Fetch user profile for defaults
  const { data: profile } = await admin
    .from("users")
    .select(
      "business_name, industry, caption_style, caption_tone, default_cta, default_hashtags"
    )
    .eq("id", user.id)
    .single();

  try {
    const { systemPrompt, userMessage } = buildCaptionPrompt({
      businessName: profile?.business_name || "My Business",
      industry: profile?.industry || "General",
      topic,
      description: description || "",
      captionStyle: caption_style || profile?.caption_style || "medium",
      captionTone: caption_tone || profile?.caption_tone || "casual",
      defaultCta: profile?.default_cta || "Link in bio",
      defaultHashtags: profile?.default_hashtags || "",
    });

    const { text } = await callClaude({
      systemPrompt,
      userMessage,
      maxTokens: 1024,
      userId: user.id,
      action: "caption_generation",
    });

    const result = parseJsonFromResponse<{
      caption: string;
      hashtags: string[];
      alt_text: string;
    }>(text);

    return NextResponse.json({
      caption: result.caption,
      hashtags: result.hashtags.join(" "),
      alt_text: result.alt_text,
    });
  } catch (error) {
    console.error("Caption generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate caption" },
      { status: 500 }
    );
  }
}
