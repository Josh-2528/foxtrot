import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

// GET /api/settings — load user profile
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("[settings GET] auth user:", user?.id ?? "null");

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from("users")
    .select(
      "id, email, business_name, website_url, industry, business_description, key_services, plan_id, trial_started_at, stripe_customer_id, stripe_subscription_id, subscription_status, posting_frequency, caption_style, caption_tone, default_hashtags, default_cta, email_new_content, email_weekly_summary, onboarding_completed, created_at"
    )
    .eq("id", user.id)
    .single();

  console.log("[settings GET] query result:", { data: data ? "found" : "null", error: error?.code ?? "none", errorMsg: error?.message ?? "none" });

  // Handle "no rows found" — user row may not exist yet
  if (error && error.code === "PGRST116") {
    console.log("[settings GET] no user row found, returning defaults for:", user.id);
    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        business_name: null,
        website_url: null,
        industry: null,
        business_description: null,
        key_services: null,
        plan_id: "trial",
        trial_started_at: null,
        posting_frequency: "3_week",
        caption_style: "medium",
        caption_tone: "casual",
        default_hashtags: null,
        default_cta: "Link in bio",
        email_new_content: true,
        email_weekly_summary: true,
        onboarding_completed: false,
        created_at: new Date().toISOString(),
      },
    });
  }

  if (error) {
    console.error("[settings GET] query error:", error);
    return NextResponse.json(
      { error: "Failed to load settings" },
      { status: 500 }
    );
  }

  console.log("[settings GET] returning user data for:", data.email);
  return NextResponse.json({ user: data });
}

// PUT /api/settings — update user profile fields
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

  // Only allow updating specific fields
  const allowedFields: Record<string, unknown> = {};
  const updatable = [
    "business_name",
    "website_url",
    "industry",
    "business_description",
    "key_services",
    "posting_frequency",
    "caption_style",
    "caption_tone",
    "default_hashtags",
    "default_cta",
    "email_new_content",
    "email_weekly_summary",
  ];

  for (const field of updatable) {
    if (body[field] !== undefined) {
      allowedFields[field] = body[field];
    }
  }

  if (Object.keys(allowedFields).length === 0) {
    return NextResponse.json(
      { error: "No valid fields to update" },
      { status: 400 }
    );
  }

  const { error } = await admin
    .from("users")
    .update(allowedFields)
    .eq("id", user.id);

  if (error) {
    console.error("Settings update error:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
