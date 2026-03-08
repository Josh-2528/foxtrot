import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";

// GET /api/settings — load user profile
export async function GET() {
  // Auth: get user ID from session
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("[settings GET] auth user ID:", user?.id ?? "null");

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // DB: use service role key directly (bypasses RLS)
  const db = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await db
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  console.log(
    "[settings GET] raw Supabase result:",
    JSON.stringify({ data, error }, null, 2)
  );

  // Handle "no rows found" — user row may not exist yet
  if (error && error.code === "PGRST116") {
    const responseBody = {
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
    };
    console.log(
      "[settings GET] returning defaults (PGRST116):",
      JSON.stringify(responseBody, null, 2)
    );
    return NextResponse.json(responseBody);
  }

  if (error) {
    console.error(
      "[settings GET] query error:",
      JSON.stringify(error, null, 2)
    );
    return NextResponse.json(
      { error: "Failed to load settings" },
      { status: 500 }
    );
  }

  const responseBody = { user: data };
  console.log(
    "[settings GET] returning user data:",
    JSON.stringify(responseBody, null, 2)
  );
  return NextResponse.json(responseBody);
}

// PUT /api/settings — update user profile fields
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
  console.log(
    "[settings PUT] incoming request body:",
    JSON.stringify(body, null, 2)
  );
  console.log("[settings PUT] user ID being updated:", user.id);

  // DB: use service role key directly (bypasses RLS)
  const db = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

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

  console.log(
    "[settings PUT] fields being updated:",
    JSON.stringify(allowedFields, null, 2)
  );

  const { data: updateData, error } = await db
    .from("users")
    .update(allowedFields)
    .eq("id", user.id)
    .select();

  console.log(
    "[settings PUT] Supabase update result:",
    JSON.stringify({ data: updateData, error }, null, 2)
  );

  if (error) {
    console.error("Settings update error:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
