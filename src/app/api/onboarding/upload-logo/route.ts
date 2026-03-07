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

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json(
      { error: "File must be under 5MB" },
      { status: 400 }
    );
  }

  const admin = createAdminClient();
  const ext = file.name.split(".").pop() || "png";
  const path = `logos/${user.id}/logo.${ext}`;

  const { error: uploadError } = await admin.storage
    .from("brand-assets")
    .upload(path, file, {
      upsert: true,
      contentType: file.type,
    });

  if (uploadError) {
    console.error("Upload error:", uploadError);
    return NextResponse.json(
      { error: "Failed to upload logo" },
      { status: 500 }
    );
  }

  const {
    data: { publicUrl },
  } = admin.storage.from("brand-assets").getPublicUrl(path);

  return NextResponse.json({ url: publicUrl });
}
