import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";

// GET /api/ideas — list ideas with optional status filter
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
    .from("content_ideas")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (status) {
    query = query.eq("status", status);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Ideas fetch error:", error);
    return NextResponse.json(
      { error: "Failed to load ideas" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ideas: data || [] });
}

// PUT /api/ideas — update an idea by id
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
      { error: "Idea id is required" },
      { status: 400 }
    );
  }

  // DB: use service role key directly (bypasses RLS)
  const db = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error } = await db
    .from("content_ideas")
    .update(updates)
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error("Idea update error:", error);
    return NextResponse.json(
      { error: "Failed to update idea" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}

// DELETE /api/ideas — remove an idea by id
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
      { error: "Idea id is required" },
      { status: 400 }
    );
  }

  // DB: use service role key directly (bypasses RLS)
  const db = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error } = await db
    .from("content_ideas")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    console.error("Idea delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete idea" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
