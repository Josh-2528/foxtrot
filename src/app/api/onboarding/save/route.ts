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

  // Update user profile with business info and content preferences
  const { error: userError } = await admin
    .from("users")
    .update({
      business_name: body.business_name || null,
      website_url: body.website_url || null,
      industry: body.industry || null,
      business_description: body.business_description || null,
      caption_tone: body.content_tone || "casual",
      onboarding_completed: true,
    })
    .eq("id", user.id);

  if (userError) {
    console.error("User update error:", userError);
    return NextResponse.json(
      { error: "Failed to save user data" },
      { status: 500 }
    );
  }

  // Upsert brand kit
  const { error: brandError } = await admin.from("brand_kits").upsert(
    {
      user_id: user.id,
      logo_url: body.logo_url || null,
      primary_colour: body.primary_color || "#8b5cf6",
      secondary_colour: body.secondary_color || "#0f1729",
      accent_colour: body.accent_color || "#a78bfa",
      vibe: body.vibe || "clean_minimal",
      extracted_from_website: body.website_url
        ? {
            url: body.website_url,
            scraped_colors: [
              body.primary_color,
              body.secondary_color,
              body.accent_color,
            ],
          }
        : null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );

  if (brandError) {
    console.error("Brand kit save error:", brandError);
    return NextResponse.json(
      { error: "Failed to save brand kit" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
