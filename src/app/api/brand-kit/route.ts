import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

// GET /api/brand-kit — load brand kit for current user
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = createAdminClient();
  const { data, error } = await admin
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

// PUT /api/brand-kit — upsert brand kit with partial fields
export async function PUT(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const admin = createAdminClient();

  const { error } = await admin.from("brand_kits").upsert(
    {
      user_id: user.id,
      ...(body.logo_url !== undefined && { logo_url: body.logo_url }),
      ...(body.primary_colour !== undefined && {
        primary_colour: body.primary_colour,
      }),
      ...(body.secondary_colour !== undefined && {
        secondary_colour: body.secondary_colour,
      }),
      ...(body.accent_colour !== undefined && {
        accent_colour: body.accent_colour,
      }),
      ...(body.background_colour !== undefined && {
        background_colour: body.background_colour,
      }),
      ...(body.text_colour !== undefined && { text_colour: body.text_colour }),
      ...(body.font_preference !== undefined && {
        font_preference: body.font_preference,
      }),
      ...(body.vibe !== undefined && { vibe: body.vibe }),
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );

  if (error) {
    console.error("Brand kit update error:", error);
    return NextResponse.json(
      { error: "Failed to update brand kit" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
