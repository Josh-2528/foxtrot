import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";

// GET /api/posts — list posts with optional status filter
export async function GET(request: NextRequest) {
  // Auth: get user ID from session
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const status = request.nextUrl.searchParams.get("status");

  // DB: use service role key directly (bypasses RLS)
  const db = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  let query = db
    .from("posts")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Posts fetch error:", error);
    return NextResponse.json(
      { error: "Failed to load posts" },
      { status: 500 }
    );
  }

  return NextResponse.json({ posts: data || [] });
}

// PUT /api/posts — update a post by id
export async function PUT(request: Request) {
  // Auth: get user ID from session
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { id, ...updates } = body;

  if (!id) {
    return NextResponse.json(
      { error: "Post id is required" },
      { status: 400 }
    );
  }

  // DB: use service role key directly (bypasses RLS)
  const db = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error } = await db
    .from("posts")
    .update(updates)
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error("Post update error:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}

// DELETE /api/posts — remove a post by id
export async function DELETE(request: Request) {
  // Auth: get user ID from session
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await request.json();

  if (!id) {
    return NextResponse.json(
      { error: "Post id is required" },
      { status: 400 }
    );
  }

  // DB: use service role key directly (bypasses RLS)
  const db = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error } = await db
    .from("posts")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error("Post delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
