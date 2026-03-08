import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import {
  callClaude,
  parseJsonFromResponse,
  buildVisualContentPrompt,
} from "@/lib/claude";
import { generateVisualHtml, type TemplateType } from "@/lib/templates";
import type { VibeOption } from "@/lib/types";

export async function POST(request: Request) {
  // Auth: get user ID from session
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { topic, description, post_type, post_size } = body;

  if (!topic) {
    return NextResponse.json(
      { error: "Topic is required" },
      { status: 400 }
    );
  }

  // DB: use service role key directly (bypasses RLS)
  const db = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Fetch user profile for business name
  const { data: profile } = await db
    .from("users")
    .select("business_name")
    .eq("id", user.id)
    .single();

  // Fetch brand kit
  const { data: brandKit } = await db
    .from("brand_kits")
    .select("*")
    .eq("user_id", user.id)
    .single();

  const businessName = profile?.business_name || "My Business";
  const vibe = (brandKit?.vibe as VibeOption) || "clean_minimal";

  try {
    const { systemPrompt, userMessage } = buildVisualContentPrompt({
      businessName,
      vibe,
      postType: post_type || "promotional",
      topic,
      description: description || "",
    });

    const { text } = await callClaude({
      systemPrompt,
      userMessage,
      maxTokens: 512,
      userId: user.id,
      action: "visual_generation",
    });

    const content = parseJsonFromResponse<{
      template: string;
      headline: string;
      subtext: string;
      accent_text: string;
      layout_variant: number;
    }>(text);

    const visualHtml = generateVisualHtml({
      template: content.template as TemplateType,
      headline: content.headline,
      subtext: content.subtext || "",
      accentText: content.accent_text || "",
      layoutVariant: content.layout_variant || 1,
      primaryColour: brandKit?.primary_colour || "#8b5cf6",
      secondaryColour: brandKit?.secondary_colour || "#0f1729",
      accentColour: brandKit?.accent_colour || "#a78bfa",
      backgroundColour: brandKit?.background_colour || "#ffffff",
      textColour: brandKit?.text_colour || "#111827",
      fontPreference: brandKit?.font_preference || "Inter",
      vibe,
      logoUrl: brandKit?.logo_url || undefined,
      businessName,
      postSize: post_size || "square_1080",
    });

    return NextResponse.json({
      visual_html: visualHtml,
      template: content.template,
      headline: content.headline,
      subtext: content.subtext,
      accent_text: content.accent_text,
    });
  } catch (error) {
    console.error("Visual generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate visual" },
      { status: 500 }
    );
  }
}
