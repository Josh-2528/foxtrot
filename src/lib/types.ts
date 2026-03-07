export interface User {
  id: string;
  email: string;
  business_name: string | null;
  website_url: string | null;
  industry: string | null;
  business_description: string | null;
  key_services: string | null;
  plan_id: string;
  posting_frequency: string;
  caption_style: string;
  caption_tone: string;
  default_hashtags: string | null;
  default_cta: string;
  onboarding_completed: boolean;
  created_at: string;
}

export interface BrandKit {
  id: string;
  user_id: string;
  logo_url: string | null;
  primary_colour: string;
  secondary_colour: string;
  accent_colour: string;
  background_colour: string;
  text_colour: string;
  font_preference: string;
  vibe: VibeOption;
  extracted_from_website: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export type VibeOption =
  | "clean_minimal"
  | "bold_loud"
  | "dark_premium"
  | "bright_fun"
  | "earthy_natural"
  | "corporate";

export interface ContentIdea {
  id: string;
  user_id: string;
  topic: string;
  description: string | null;
  post_type: PostType;
  suggested_visual_mode: "graphic" | "photo";
  status: "generated" | "approved" | "skipped" | "used";
  batch_id: string | null;
  created_at: string;
}

export type PostType =
  | "promotional"
  | "educational"
  | "behind_scenes"
  | "testimonial"
  | "seasonal"
  | "offer"
  | "engagement";

export interface Post {
  id: string;
  user_id: string;
  idea_id: string | null;
  visual_html: string | null;
  visual_url: string | null;
  visual_mode: "graphic" | "photo";
  uploaded_photo_url: string | null;
  caption: string | null;
  hashtags: string | null;
  cta: string | null;
  alt_text: string | null;
  post_size: "square_1080" | "portrait_1080x1350" | "story_1080x1920";
  status: "draft" | "ready" | "posted" | "skipped";
  scheduled_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface ScrapedWebsite {
  business_name: string;
  description: string;
  industry: string;
  colors: string[];
  logo_url: string | null;
}
