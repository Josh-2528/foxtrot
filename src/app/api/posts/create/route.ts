import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const admin = createAdminClient();

  // Insert the post
  const { data: post, error } = await admin
    .from("posts")
    .insert({
      user_id: user.id,
      idea_id: body.idea_id || null,
      visual_html: body.visual_html || null,
      visual_mode: body.visual_mode || "graphic",
      uploaded_photo_url: body.uploaded_photo_url || null,
      caption: body.caption || null,
      hashtags: body.hashtags || null,
      cta: body.cta || null,
      alt_text: body.alt_text || null,
      post_size: body.post_size || "square_1080",
      status: body.status || "draft",
      scheduled_date: body.scheduled_date || null,
    })
    .select()
    .single();

  if (error) {
    console.error("Post create error:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }

  // If idea_id provided, mark the idea as 'used'
  if (body.idea_id) {
    await admin
      .from("content_ideas")
      .update({ status: "used" })
      .eq("id", body.idea_id)
      .eq("user_id", user.id);
  }

  return NextResponse.json({ post });
}
