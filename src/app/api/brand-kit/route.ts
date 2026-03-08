import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";

// GET /api/brand-kit — load brand kit for current user
export async function GET() {
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

  const { data, error } = await db
    .from("brand_kits")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Brand kit fetch error:", error);
    return NextResponse.json(
      { error: "Failed to load brand kit" },
      { status: 500 }
    );
  }

  // Return defaults if no brand kit exists yet
  if (!data) {
    return NextResponse.json({
      brand_kit: {
        user_id: user.id,
        logo_url: null,
        primary_colour: "#8b5cf6",
        secondary_colour: "#0f1729",
        accent_colour: "#a78bfa",
        background_colour: "#ffffff",
        text_colour: "#111827",
        font_preference: "Inter",
        vibe: "clean_minimal",
        extracted_from_website: null,
      },
    });
  }

  return NextResponse.json({ brand_kit: data });
}

// PUT /api/brand-kit — save brand kit (select then update/insert)
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

  // DB: use service role key directly (bypasses RLS)
  const db = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Build update payload from provided fields
  const updates: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };
  const fields = [
    "logo_url",
    "primary_colour",
    "secondary_colour",
    "accent_colour",
    "background_colour",
    "text_colour",
    "font_preference",
    "vibe",
  ];
  for (const field of fields) {
    if (body[field] !== undefined) {
      updates[field] = body[field];
    }
  }

  // Check if brand kit already exists for this user
  const { data: existing } = await db
    .from("brand_kits")
    .select("id")
    .eq("user_id", user.id)
    .single();

  let error;
  if (existing) {
    ({ error } = await db
      .from("brand_kits")
      .update(updates)
      .eq("user_id", user.id));
  } else {
    ({ error } = await db.from("brand_kits").insert({
      user_id: user.id,
      ...updates,
    }));
  }

  if (error) {
    console.error("Brand kit update error:", error);
    return NextResponse.json(
      { error: "Failed to update brand kit" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
