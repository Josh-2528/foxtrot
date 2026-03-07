import Anthropic from "@anthropic-ai/sdk";
import { createAdminClient } from "@/lib/supabase/admin";

const MODEL = "claude-sonnet-4-20250514";

// Sonnet 4 pricing: $3/M input, $15/M output
const INPUT_COST_PER_TOKEN = 3 / 1_000_000;
const OUTPUT_COST_PER_TOKEN = 15 / 1_000_000;

// ─── Core API Call ────────────────────────────────────────────────

interface CallClaudeParams {
  systemPrompt: string;
  userMessage: string;
  maxTokens?: number;
  userId: string;
  action: string;
}

interface ClaudeResponse {
  text: string;
  inputTokens: number;
  outputTokens: number;
}

export async function callClaude({
  systemPrompt,
  userMessage,
  maxTokens = 1024,
  userId,
  action,
}: CallClaudeParams): Promise<ClaudeResponse> {
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  });

  const message = await anthropic.messages.create({
    model: MODEL,
    max_tokens: maxTokens,
    system: systemPrompt,
    messages: [{ role: "user", content: userMessage }],
  });

  const textBlock = message.content.find((c) => c.type === "text");
  const text = textBlock && textBlock.type === "text" ? textBlock.text : "";

  const inputTokens = message.usage.input_tokens;
  const outputTokens = message.usage.output_tokens;

  // Log usage in the background — don't block the response
  logApiUsage({ userId, action, inputTokens, outputTokens }).catch((err) =>
    console.error("Failed to log API usage:", err)
  );

  return { text, inputTokens, outputTokens };
}

// ─── Usage Logging ────────────────────────────────────────────────

interface LogUsageParams {
  userId: string;
  action: string;
  inputTokens: number;
  outputTokens: number;
}

export async function logApiUsage({
  userId,
  action,
  inputTokens,
  outputTokens,
}: LogUsageParams) {
  const estimatedCost =
    inputTokens * INPUT_COST_PER_TOKEN +
    outputTokens * OUTPUT_COST_PER_TOKEN;

  const admin = createAdminClient();
  await admin.from("api_usage_log").insert({
    user_id: userId,
    action,
    input_tokens: inputTokens,
    output_tokens: outputTokens,
    estimated_cost_usd: estimatedCost,
  });
}

// ─── JSON Parser ──────────────────────────────────────────────────

export function parseJsonFromResponse<T = unknown>(text: string): T {
  // Try extracting from code block first
  const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeBlockMatch) {
    return JSON.parse(codeBlockMatch[1].trim()) as T;
  }

  // Try raw JSON (object or array)
  const jsonMatch = text.match(/[\[{][\s\S]*[\]}]/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]) as T;
  }

  throw new Error("No valid JSON found in response");
}

// ─── Prompt Builders ──────────────────────────────────────────────

interface IdeaGenerationParams {
  businessName: string;
  industry: string;
  businessDescription: string;
  postingFrequency: string;
  previousTopics: string[];
}

export function buildIdeaGenerationPrompt(params: IdeaGenerationParams) {
  const currentMonth = new Date().toLocaleDateString("en-AU", {
    month: "long",
    year: "numeric",
  });

  const systemPrompt = `You are a social media content strategist. You generate specific, creative Instagram post ideas for real businesses.

Rules:
- Write in Australian English
- Make ideas specific to this business, not generic marketing advice
- Mix up post types — no more than 3 of any single type in a batch
- Consider the current season and time of year (${currentMonth} in Australia)
- Each idea must be unique and actionable
- No cringey AI language: never use "game-changer", "revolutionize", "in today's fast-paced world", "are you ready to", "take your X to the next level"
- Return valid JSON only, no markdown wrapping`;

  const previousSection =
    params.previousTopics.length > 0
      ? `\nAvoid repeating these previously generated topics:\n${params.previousTopics.map((t) => `- ${t}`).join("\n")}`
      : "";

  const userMessage = `Generate 12 unique Instagram post ideas for this business:

Business: ${params.businessName}
Industry: ${params.industry || "General"}
What they do: ${params.businessDescription || "Not specified"}
Posting frequency: ${params.postingFrequency}
${previousSection}

Return a JSON array of 12 objects, each with:
- "topic": a clear, specific topic (string)
- "description": 1-2 sentences describing what the post shows or says (string)
- "post_type": one of "promotional", "educational", "behind_scenes", "testimonial", "seasonal", "offer", "engagement" (string)
- "suggested_visual_mode": "graphic" or "photo" (string)

Return the JSON array only.`;

  return { systemPrompt, userMessage };
}

interface CaptionParams {
  businessName: string;
  industry: string;
  topic: string;
  description: string;
  captionStyle: string;
  captionTone: string;
  defaultCta: string;
  defaultHashtags: string;
}

export function buildCaptionPrompt(params: CaptionParams) {
  const styleGuide: Record<string, string> = {
    short: "1-2 lines, punchy and direct",
    medium: "3-5 lines, conversational with some detail",
    long: "Full paragraph, detailed and storytelling",
  };

  const systemPrompt = `You write Instagram captions for real businesses. You sound like a genuine business owner, not a marketing agency or chatbot.

Rules:
- Australian English spelling (colour, favourite, organise, etc.)
- Maximum 3 emojis per caption, used naturally — never spam emojis
- No cringey AI language: never use "game-changer", "revolutionize", "in today's fast-paced world", "are you ready to", "take your X to the next level", "we strive to", "rest assured"
- Do not start with a question unless the tone is 'witty'
- Hashtags go in a separate block after a line break — never inline with the caption
- Include the CTA naturally at the end of the caption (before hashtags)
- Keep it genuine and conversational — write like a real person posting
- Return valid JSON only, no markdown wrapping`;

  const userMessage = `Write an Instagram caption for this post:

Business: ${params.businessName}
Industry: ${params.industry || "General"}
Post topic: ${params.topic}
Post description: ${params.description}
Caption style: ${params.captionStyle} (${styleGuide[params.captionStyle] || styleGuide.medium})
Caption tone: ${params.captionTone}
Default CTA: ${params.defaultCta || "Link in bio"}
${params.defaultHashtags ? `Always include these hashtags: ${params.defaultHashtags}` : ""}

Return JSON: { "caption": "...", "hashtags": ["#tag1", "#tag2", ...], "alt_text": "..." }
- caption: the full caption text (without hashtags)
- hashtags: array of strings, each starting with #, max 30 total. Include any default hashtags plus relevant topic-specific ones.
- alt_text: a short description for accessibility (what the image shows)

Return the JSON only.`;

  return { systemPrompt, userMessage };
}

interface VisualContentParams {
  businessName: string;
  vibe: string;
  postType: string;
  topic: string;
  description: string;
}

export function buildVisualContentPrompt(params: VisualContentParams) {
  const systemPrompt = `You select and fill visual templates for Instagram posts. You choose the best template for the content and write short, punchy text that works on a visual card.

Rules:
- Headlines must be 8 words or fewer
- Subtext must be 20 words or fewer
- Write in Australian English
- Match the vibe: ${params.vibe.replace("_", " ")}
- No cringey AI language
- Return valid JSON only, no markdown wrapping`;

  const userMessage = `Select and fill a visual template for this Instagram post:

Business: ${params.businessName}
Vibe: ${params.vibe}
Post type: ${params.postType}
Topic: ${params.topic}
Description: ${params.description}

Available templates: text_overlay, stats_highlight, quote_card, service_spotlight, tip_education, promotional_offer, testimonial_card

Return JSON: { "template": "...", "headline": "...", "subtext": "...", "accent_text": "...", "layout_variant": 1 }
- template: one of the available template names
- headline: short punchy headline (max 8 words)
- subtext: supporting text (max 20 words, can be empty string if not needed)
- accent_text: highlighted stat, keyword, or price (can be empty string if not needed)
- layout_variant: 1, 2, or 3 (different layout options within the template)

Return the JSON only.`;

  return { systemPrompt, userMessage };
}

interface BrandSuggestionParams {
  description: string;
  industry: string;
}

export function buildBrandSuggestionPrompt(params: BrandSuggestionParams) {
  const systemPrompt = `You are a brand designer. You suggest colour palettes, fonts, and visual styles for businesses based on their description and industry. Your suggestions should be professional and visually cohesive.

Rules:
- Suggest colours as hex codes
- Pick from these fonts: Inter, Montserrat, Poppins, Merriweather, Playfair Display, Space Grotesk
- Pick from these vibes: clean_minimal, bold_loud, dark_premium, bright_fun, earthy_natural, corporate
- Return valid JSON only, no markdown wrapping`;

  const userMessage = `Suggest a brand identity for this business:

Description: ${params.description}
Industry: ${params.industry || "General"}

Return JSON: {
  "primary_colour": "#hex",
  "secondary_colour": "#hex",
  "accent_colour": "#hex",
  "background_colour": "#hex",
  "text_colour": "#hex",
  "font_preference": "FontName",
  "vibe": "vibe_id",
  "reasoning": "1-2 sentences explaining why these choices suit the brand"
}

Return the JSON only.`;

  return { systemPrompt, userMessage };
}
