import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";
import {
  callClaude,
  parseJsonFromResponse,
  buildIdeaGenerationPrompt,
} from "@/lib/claude";

export async function POST() {
  // Auth: get user ID from session
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // DB: use service role key directly (bypasses RLS)
  const db = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Fetch user profile — use select("*") so it works even before key_services migration runs
  const { data: profile } = await db
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) {
    return NextResponse.json(
      { error: "User profile not found" },
      { status: 404 }
    );
  }

  // Fetch existing idea topics to avoid repeats
  const { data: existingIdeas } = await db
    .from("content_ideas")
    .select("topic")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(50);

  const previousTopics = (existingIdeas || []).map(
    (i: { topic: string }) => i.topic
  );

  try {
    const { systemPrompt, userMessage } = buildIdeaGenerationPrompt({
      businessName: profile.business_name || "My Business",
      industry: profile.industry || "General",
      businessDescription: profile.business_description || "",
      keyServices: profile.key_services || "",
      postingFrequency: profile.posting_frequency || "3_week",
      previousTopics,
    });

    const { text } = await callClaude({
      systemPrompt,
      userMessage,
      maxTokens: 2048,
      userId: user.id,
      action: "idea_generation",
    });

    const ideas = parseJsonFromResponse<
      Array<{
        topic: string;
        description: string;
        post_type: string;
        suggested_visual_mode: string;
      }>
    >(text);

    // Generate a batch ID to group these ideas
    const batchId = crypto.randomUUID();

    // Insert all ideas
    const rows = ideas.map((idea) => ({
      user_id: user.id,
      topic: idea.topic,
      description: idea.description,
      post_type: idea.post_type,
      suggested_visual_mode: idea.suggested_visual_mode || "graphic",
      status: "generated",
      batch_id: batchId,
    }));

    const { data: inserted, error } = await db
      .from("content_ideas")
      .insert(rows)
      .select();

    if (error) {
      console.error("Ideas insert error:", error);
      return NextResponse.json(
        { error: "Failed to save ideas" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ideas: inserted, batch_id: batchId });
  } catch (error) {
    console.error("Idea generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate ideas" },
      { status: 500 }
    );
  }
}
