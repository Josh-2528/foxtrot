export interface User {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  onboarding_completed: boolean;
  created_at: string;
}

export interface OnboardingData {
  id: string;
  user_id: string;
  // Step 1: Website
  website_url: string | null;
  business_name: string | null;
  business_description: string | null;
  industry: string | null;
  // Step 2: Brand Kit
  logo_url: string | null;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  // Step 3: Vibe
  vibe: VibeOption | null;
  // Step 4: Content
  content_tone: string | null;
  target_audience: string | null;
  key_services: string[] | null;
  unique_selling_points: string[] | null;
  created_at: string;
  updated_at: string;
}

export type VibeOption =
  | "minimal"
  | "bold"
  | "playful"
  | "elegant"
  | "industrial"
  | "organic";

export interface ScrapedWebsite {
  business_name: string;
  description: string;
  industry: string;
  colors: string[];
  logo_url: string | null;
}
