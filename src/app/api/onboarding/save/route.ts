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

  // Upsert onboarding data
  const { error: onboardingError } = await admin
    .from("onboarding")
    .upsert(
      {
        user_id: user.id,
        website_url: body.website_url || null,
        business_name: body.business_name || null,
        business_description: body.business_description || null,
        industry: body.industry || null,
        logo_url: body.logo_url || null,
        primary_color: body.primary_color || "#22c55e",
        secondary_color: body.secondary_color || "#0f1629",
        accent_color: body.accent_color || "#4ade80",
        vibe: body.vibe || null,
        content_tone: body.content_tone || null,
        target_audience: body.target_audience || null,
        key_services: body.key_services || [],
        unique_selling_points: body.unique_selling_points || [],
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );

  if (onboardingError) {
    console.error("Onboarding save error:", onboardingError);
    return NextResponse.json(
      { error: "Failed to save onboarding data" },
      { status: 500 }
    );
  }

  // Mark user as onboarded
  const { error: userError } = await admin
    .from("users")
    .update({ onboarding_completed: true })
    .eq("id", user.id);

  if (userError) {
    console.error("User update error:", userError);
  }

  return NextResponse.json({ success: true });
}
