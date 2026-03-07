# Foxtrot — AI-Powered Social Media Content Creator

## Product Spec & Build Reference

**Last Updated:** March 7, 2026
**Domain:** foxtrotai.com.au
**Parent Company:** Obvitech Pty Ltd
**Also sold via:** carwashai.com.au (as third product alongside WashBot + ReviewFlow)

---

## What Is Foxtrot?

Foxtrot is a standalone SaaS that generates ready-to-post social media content for businesses. Users set up their brand once — colours, logo, vibe, industry — and Foxtrot generates post ideas, creates branded visuals, writes captions, and delivers everything ready to download and post. Instagram first, expanding to all platforms.

**One-liner:** "Foxtrot creates your social media posts — visuals, copy, and all — so you don't have to."

**Target customer:** Any small-to-medium business owner who knows they should post on social media but doesn't have the time, skill, or a marketing team to do it. Cafes, gyms, tradies, salons, car washes, e-commerce, local services — anyone.

---

## Tech Stack

- **Framework:** Next.js (TypeScript)
- **Database:** Supabase (PostgreSQL + Auth)
- **AI:** Anthropic Claude API (content generation + copy)
- **Visual Generation:** HTML/CSS rendered to images via Puppeteer/html-to-image
- **Payments:** Stripe
- **Email:** Resend
- **Hosting:** Vercel
- **Image Storage:** Supabase Storage (logos, uploaded photos, generated images)

---

## User Flow

### 1. Onboarding (One-Time Setup)

**Step 1 — Website Scrape:**
- User enters their website URL
- AI scrapes the site and auto-extracts: business name, industry, services/features, existing colour palette, tone of voice, tagline
- User reviews the extracted info, corrects anything wrong, adds missing details
- If no website: manual entry form for business name, industry, what they do, key services

**Step 2 — Brand Kit Setup:**
- Upload logo (PNG/SVG, stored in Supabase Storage)
- Set brand colours: primary, secondary, accent, background, text colour
  - Auto-suggested from website scrape if available
  - Colour picker + hex input for each
- Font preference: Clean/Modern (Inter), Bold/Strong (Montserrat), Classic (Merriweather), Playful (Poppins) — or custom Google Font name

**Step 3 — Vibe Selection:**
- Show 6 visual style cards, each with a sample Instagram post mockup:
  - **Clean & Minimal** — white space, simple layouts, thin fonts
  - **Bold & Loud** — big text, high contrast, punchy colours
  - **Dark & Premium** — dark backgrounds, gold/violet accents, luxury feel
  - **Bright & Fun** — colourful, playful, energetic
  - **Earthy & Natural** — muted tones, organic textures, warm
  - **Corporate & Professional** — structured, navy/grey, formal
- User picks one → this drives all future visual generation
- Can be changed later in Brand Kit settings

**Step 4 — Content Preferences:**
- Industry selector (dropdown with common options + "Other" with text field)
- What topics should Foxtrot create content about? (text area — user describes their business focus, promotions, seasonal things)
- Posting frequency preference: 3/week, 5/week, daily, custom
- Caption style default: Short & Sharp / Medium / Long & Detailed
- Caption tone default: Professional / Casual / Witty / Motivational
- Hashtag preferences: enter default hashtags that always get included + toggle for AI-generated topic hashtags
- Call-to-action default: "Link in bio" / "DM us" / "Book now" / "Call us" / Custom

### 2. Content Idea Generation

**How it works:**
- User clicks "Generate Ideas" (or ideas auto-generate based on posting frequency)
- AI generates a batch of 12 post ideas (configurable)
- Each idea card shows:
  - Topic/angle (e.g. "Showcase your most popular service")
  - Post type tag: Promotional / Educational / Behind-the-scenes / Testimonial / Seasonal / Offer / Engagement
  - Brief description of what the post would say/show
  - Suggested visual style (graphic post vs photo-based)
- User can: Approve ✓, Skip ✗, Edit the idea, or Regenerate a single idea
- Approved ideas move to the "Create" queue

**AI prompt context for idea generation:**
- Business name, industry, services
- Content preferences and topics
- Previously generated ideas (to avoid repeats)
- Current season/time of year
- Posting frequency

### 3. Visual Creation

**Two modes:**

**Mode A — AI Graphic Posts (Default):**
- For approved ideas, AI generates branded visual posts as HTML/CSS
- Renders to 1080x1080 PNG (Instagram square) — also 1080x1350 (portrait), 1080x1920 (story)
- Uses brand colours, logo, vibe style, fonts
- Post types include:
  - Text overlay on solid/gradient background
  - Stats/numbers highlight
  - Quote cards
  - Service spotlight
  - Before/after comparison layout
  - Review/testimonial showcase
  - Tip/education card
  - Promotional offer card
  - Seasonal/holiday themed
- Each generated post shows a preview — user can:
  - Approve as-is
  - Regenerate (new design, same idea)
  - Edit colours, text, layout tweaks
  - Change post size (square/portrait/story)

**Mode B — Photo-Based Posts:**
- User uploads a photo (e.g. a car, a coffee, their shopfront, a finished job)
- AI adds branded overlays to the photo:
  - Logo watermark (corner, adjustable position and opacity)
  - Text overlay with caption/tagline
  - Colour-matched border or frame
  - Branded caption bar at bottom
  - Optional colour filter/adjustment to match brand vibe
- Photo stays as the hero — AI enhances, doesn't replace
- Same preview/edit/approve flow as graphic posts

### 4. Caption Generation

**For each post, AI generates:**
- Instagram caption in the user's chosen style and tone
- Hashtag set: user defaults + AI topic-specific hashtags (up to 30)
- Call-to-action line
- Alt text for accessibility

**User controls per-post:**
- Caption style override: Short & Sharp / Medium / Long & Detailed
- Tone override: Professional / Casual / Witty / Motivational
- Regenerate caption only (without regenerating visual)
- Edit caption manually
- Toggle hashtags on/off
- Edit CTA

**Caption rules (hardcoded into AI prompt):**
- Never use cringey AI language: "In today's fast-paced world", "Are you ready to", "Game-changer", "Revolutionize"
- No excessive emojis — max 3 per caption
- No emoji spam at the end of sentences
- Write like a real business owner posting, not a marketing agency
- Australian English spelling
- Hashtags go in a separate block after a line break, not inline with caption

### 5. Content Calendar

**Dashboard view showing:**
- Monthly calendar grid with posts placed on their scheduled dates
- Drag-and-drop to rearrange post dates
- Status badges: Draft, Ready, Posted, Skipped
- Click any day to see the post preview (visual + caption)
- Empty days highlighted to show content gaps
- "Fill Gaps" button → AI generates ideas for empty days

**List view option:**
- All posts in chronological order
- Quick actions: approve, edit, skip, download, copy caption

### 6. Export & Posting

**V1 (MVP):**
- Download image button (PNG, high-res)
- Copy caption button (copies to clipboard with hashtags)
- One-click "Download All This Week" (zip of images + captions as text file)

**V2 (Future):**
- Buffer/Later API integration for scheduling
- Direct Instagram publishing via Meta Graph API

---

## App Pages & Navigation

### Public Pages (No Auth)
- `/` — Landing page
- `/pricing` — Pricing page
- `/login` — Login
- `/signup` — Signup
- `/terms` — Terms & Conditions
- `/privacy` — Privacy Policy

### Authenticated Pages (User)
- `/onboarding` — 4-step onboarding flow (website → brand kit → vibe → preferences)
- `/dashboard` — Content calendar view (default home after onboarding)
- `/ideas` — Idea generation and curation
- `/create` — Post creation workspace (visual + caption generation)
- `/posts` — All generated posts (history, drafts, ready, posted)
- `/brand-kit` — Brand settings (logo, colours, fonts, vibe, tone)
- `/settings` — Account settings, subscription, email preferences
- `/upload` — Photo upload for Mode B posts

### Admin Pages
- `/admin` — Admin dashboard (user list, stats, usage)
- `/admin/usage` — API cost tracking per user

---

## Database Schema

### users
- id (uuid, PK, FK to auth.users)
- email (text)
- business_name (text)
- website_url (text)
- industry (text)
- business_description (text)
- plan_id (text: 'trial', 'starter', 'pro', 'agency')
- trial_started_at (timestamptz)
- stripe_customer_id (text)
- stripe_subscription_id (text)
- subscription_status (text)
- posting_frequency (text: '3_week', '5_week', 'daily', 'custom')
- caption_style (text: 'short', 'medium', 'long')
- caption_tone (text: 'professional', 'casual', 'witty', 'motivational')
- default_hashtags (text)
- default_cta (text)
- email_new_content (boolean, default true)
- email_weekly_summary (boolean, default true)
- onboarding_completed (boolean, default false)
- created_at (timestamptz)

### brand_kits
- id (uuid, PK)
- user_id (uuid, FK to users)
- logo_url (text)
- primary_colour (text)
- secondary_colour (text)
- accent_colour (text)
- background_colour (text)
- text_colour (text)
- font_preference (text)
- vibe (text: 'clean_minimal', 'bold_loud', 'dark_premium', 'bright_fun', 'earthy_natural', 'corporate')
- extracted_from_website (jsonb — raw scrape data for reference)
- created_at (timestamptz)
- updated_at (timestamptz)

### content_ideas
- id (uuid, PK)
- user_id (uuid, FK to users)
- topic (text)
- description (text)
- post_type (text: 'promotional', 'educational', 'behind_scenes', 'testimonial', 'seasonal', 'offer', 'engagement')
- suggested_visual_mode (text: 'graphic', 'photo')
- status (text: 'generated', 'approved', 'skipped', 'used')
- batch_id (uuid — groups ideas from same generation)
- created_at (timestamptz)

### posts
- id (uuid, PK)
- user_id (uuid, FK to users)
- idea_id (uuid, FK to content_ideas, nullable)
- visual_html (text — the HTML source for the visual)
- visual_url (text — rendered image URL in Supabase Storage)
- visual_mode (text: 'graphic', 'photo')
- uploaded_photo_url (text, nullable — for Mode B)
- caption (text)
- hashtags (text)
- cta (text)
- alt_text (text)
- post_size (text: 'square_1080', 'portrait_1080x1350', 'story_1080x1920')
- status (text: 'draft', 'ready', 'posted', 'skipped')
- scheduled_date (date, nullable)
- created_at (timestamptz)
- updated_at (timestamptz)

### api_usage_log
- id (uuid, PK)
- user_id (uuid, FK to users)
- action (text: 'idea_generation', 'visual_generation', 'caption_generation', 'website_scrape')
- input_tokens (integer)
- output_tokens (integer)
- estimated_cost_usd (numeric)
- created_at (timestamptz)

---

## Pricing

### Starter — $29/month
- 15 posts per month
- AI graphic posts only (no photo mode)
- Basic caption generation
- 1 brand kit
- Download images + copy captions

### Pro — $49/month (14-day free trial)
- Unlimited posts
- AI graphic posts + photo-based posts
- Full caption customisation (style, tone, CTA)
- Content calendar
- Batch generation
- 1 brand kit
- Priority generation

### Agency — $99/month
- Everything in Pro
- Up to 5 brand kits (manage multiple businesses)
- Team access (invite collaborators)
- White-label exports (no Foxtrot branding on downloads)
- Priority support

---

## Landing Page Structure

**Design:** Dark premium theme matching WashBot/ReviewFlow aesthetic. Navy hero, white/grey content sections, violet/purple accent CTAs.

**NAV:** Foxtrot logo + name | Features | Pricing | FAQ | Login | Start Free Trial (violet CTA)

**HERO (dark navy):**
- Headline: "Your Social Media. Created By AI. On Brand. Every Time."
- Subhead: "Foxtrot generates ready-to-post content for your business — visuals, captions, hashtags, and all. Set up your brand once, get weeks of content in minutes."
- CTAs: "Start Free Trial →" (violet) + "See It In Action" (ghost/outline → scrolls to demo section)
- Right side: mockup showing a phone with an Instagram feed of Foxtrot-generated posts

**HOW IT WORKS (white):**
- "From Zero to a Month of Content in 4 Steps"
- Step 1: Add Your Brand — "Drop in your website link. Foxtrot pulls your colours, logo, and vibe automatically."
- Step 2: Pick Your Style — "Choose a visual style that matches your brand. Clean, bold, dark, bright — you decide."
- Step 3: Generate Ideas — "AI creates a month of post ideas based on your business. Approve the ones you like."
- Step 4: Download & Post — "Foxtrot creates the visuals and writes the captions. Download and post."

**LIVE DEMO SECTION (light grey):**
- Show 3 example posts side by side: a graphic post, a photo-based post, and a testimonial card
- Each in different vibes (clean, bold, dark) to show variety
- "These were all generated by Foxtrot in under 60 seconds."

**FEATURES (white):**
- "Everything You Need. Nothing You Don't."
- Feature cards:
  - AI Graphic Posts — "Professional visuals without a designer"
  - Photo Overlays — "Upload a photo, Foxtrot adds your branding"
  - Smart Captions — "AI-written captions that don't sound like AI"
  - Content Calendar — "See your whole month at a glance"
  - Brand Consistency — "Every post matches your colours, fonts, and vibe"
  - Batch Generation — "Create a week of content in one click"

**PRICING (white):**
- Show three tiers: Starter $29, Pro $49 (highlighted), Agency $99

**FAQ (light grey):**
- "Will the posts look generic?" → "No. Foxtrot uses your brand colours, logo, fonts, and visual style. Every post is unique to your business."
- "Can I edit the posts after they're generated?" → "Yes. Edit the text, colours, caption, hashtags — or regenerate the whole thing with one click."
- "Do I need design skills?" → "None. Foxtrot handles the design. You just approve and post."
- "What if I have my own photos?" → "Upload them. Foxtrot adds your branding, text overlays, and frames to make them post-ready."
- "Can I cancel anytime?" → "Yes. No contracts, no lock-in."
- "Does it post to Instagram for me?" → "Right now you download and post manually. Auto-posting is coming soon."

**FINAL CTA (dark navy):**
- "Stop Staring at a Blank Feed."
- "Start your free trial and have a week of content ready in 10 minutes."
- "Start Free Trial →"

**FOOTER:** Foxtrot logo | Features | Pricing | FAQ | Terms | Privacy | Login | © 2026 Obvitech Pty Ltd

---

## Visual Generation System

### How Visuals Are Created

Foxtrot generates posts as HTML/CSS, then renders them to PNG images. This approach:
- Produces pixel-perfect, consistent designs
- Allows easy template creation and variation
- Supports all brand customisation (colours, fonts, logos)
- Can be rendered server-side via Puppeteer or client-side via html-to-image

### Template System

Each vibe (clean_minimal, bold_loud, etc.) has a set of HTML/CSS templates for each post type:
- text_overlay.html
- stats_highlight.html
- quote_card.html
- service_spotlight.html
- tip_education.html
- promotional_offer.html
- testimonial_card.html
- before_after.html
- photo_overlay.html

Templates use CSS custom properties for brand colours:
```css
:root {
  --primary: {{primary_colour}};
  --secondary: {{secondary_colour}};
  --accent: {{accent_colour}};
  --bg: {{background_colour}};
  --text: {{text_colour}};
  --font: {{font_preference}};
}
```

AI selects the appropriate template + fills in content → renders to image.

### Photo Overlay System

For Mode B (user-uploaded photos):
1. User uploads photo → stored in Supabase Storage
2. Photo placed as full-bleed background in HTML template
3. Overlay elements added:
   - Logo (positioned via CSS, adjustable)
   - Text overlay (headline/tagline with text-shadow for readability)
   - Gradient overlay at bottom for caption bar
   - Brand-coloured border/frame (optional)
4. Rendered to PNG same as graphic posts

---

## AI Prompt Architecture

### Idea Generation Prompt
```
You are a social media content strategist for a {industry} business.

Business: {business_name}
What they do: {business_description}
Key services/products: {services}
Preferred topics: {user_topics}

Generate {count} unique Instagram post ideas. Each idea should include:
- topic: a clear, specific topic
- description: 1-2 sentences describing what the post shows/says
- post_type: one of [promotional, educational, behind_scenes, testimonial, seasonal, offer, engagement]
- suggested_visual_mode: 'graphic' or 'photo'

Rules:
- Mix up the post types — no more than 3 of any type
- Make ideas specific to this business, not generic marketing advice
- Consider the current season/time of year
- Avoid ideas that have already been generated: {previous_ideas}
- Write in Australian English

Return as JSON array.
```

### Caption Generation Prompt
```
You write Instagram captions for a {industry} business.

Business: {business_name}
Post topic: {topic}
Post description: {description}
Caption style: {style} (short = 1-2 lines, medium = 3-5 lines, long = full paragraph)
Caption tone: {tone}
Default CTA: {cta}

Rules:
- Australian English spelling
- Maximum 3 emojis per caption, used naturally
- No cringey AI language: never use "game-changer", "revolutionize", "in today's fast-paced world", "are you ready to", "take your X to the next level"
- Write like a real business owner, not a marketing agency
- Do not start with a question unless the tone is 'witty'
- Hashtags go in a separate block after a line break (do not put inline)
- Include the CTA naturally at the end
- Keep it genuine and conversational

Return JSON: { caption, hashtags (array of strings, max 30), alt_text }
```

### Visual Content Prompt
```
You are selecting and filling a visual template for an Instagram post.

Brand: {business_name}
Vibe: {vibe}
Post type: {post_type}
Topic: {topic}
Description: {description}

Select the most appropriate template from: [text_overlay, stats_highlight, quote_card, service_spotlight, tip_education, promotional_offer, testimonial_card]

Fill in the template variables:
- headline: short punchy headline (max 8 words)
- subtext: supporting text (max 20 words, optional)
- accent_text: highlighted stat or keyword (optional)
- layout_variant: which layout option within the template

Return JSON: { template, headline, subtext, accent_text, layout_variant }
```

---

## Environment Variables

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Anthropic
ANTHROPIC_API_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_STARTER_PRICE_ID=
STRIPE_PRO_PRICE_ID=
STRIPE_AGENCY_PRICE_ID=

# Resend
RESEND_API_KEY=
RESEND_FROM_EMAIL=

# App
NEXT_PUBLIC_APP_URL=https://foxtrotai.com.au
ADMIN_EMAIL=josh@obvitech.com.au
```

---

## Supabase SQL Migration

```sql
-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users table
create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  business_name text,
  website_url text,
  industry text,
  business_description text,
  plan_id text default 'trial',
  trial_started_at timestamptz default now(),
  stripe_customer_id text,
  stripe_subscription_id text,
  subscription_status text,
  posting_frequency text default '3_week',
  caption_style text default 'medium',
  caption_tone text default 'casual',
  default_hashtags text,
  default_cta text default 'Link in bio',
  email_new_content boolean default true,
  email_weekly_summary boolean default true,
  onboarding_completed boolean default false,
  created_at timestamptz default now()
);

-- Brand kits
create table public.brand_kits (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete cascade,
  logo_url text,
  primary_colour text default '#8b5cf6',
  secondary_colour text default '#0f1729',
  accent_colour text default '#a78bfa',
  background_colour text default '#ffffff',
  text_colour text default '#111827',
  font_preference text default 'Inter',
  vibe text default 'clean_minimal',
  extracted_from_website jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Content ideas
create table public.content_ideas (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete cascade,
  topic text not null,
  description text,
  post_type text not null,
  suggested_visual_mode text default 'graphic',
  status text default 'generated',
  batch_id uuid,
  created_at timestamptz default now()
);

-- Posts
create table public.posts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete cascade,
  idea_id uuid references public.content_ideas(id) on delete set null,
  visual_html text,
  visual_url text,
  visual_mode text default 'graphic',
  uploaded_photo_url text,
  caption text,
  hashtags text,
  cta text,
  alt_text text,
  post_size text default 'square_1080',
  status text default 'draft',
  scheduled_date date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- API usage tracking
create table public.api_usage_log (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.users(id) on delete cascade,
  action text not null,
  input_tokens integer default 0,
  output_tokens integer default 0,
  estimated_cost_usd numeric(10, 6) default 0,
  created_at timestamptz default now()
);

-- Indexes
create index idx_brand_kits_user_id on public.brand_kits(user_id);
create index idx_content_ideas_user_id on public.content_ideas(user_id);
create index idx_content_ideas_status on public.content_ideas(status);
create index idx_posts_user_id on public.posts(user_id);
create index idx_posts_status on public.posts(status);
create index idx_posts_scheduled_date on public.posts(scheduled_date);
create index idx_api_usage_log_user_id on public.api_usage_log(user_id);
create index idx_api_usage_log_created_at on public.api_usage_log(created_at);

-- RLS
alter table public.users enable row level security;
alter table public.brand_kits enable row level security;
alter table public.content_ideas enable row level security;
alter table public.posts enable row level security;
alter table public.api_usage_log enable row level security;

-- Users policies
create policy "Users can view own profile" on public.users for select using (auth.uid() = id);
create policy "Users can update own profile" on public.users for update using (auth.uid() = id);
create policy "Service role full access users" on public.users for all using (true);

-- Brand kits policies
create policy "Users can view own brand kit" on public.brand_kits for select using (auth.uid() = user_id);
create policy "Users can insert own brand kit" on public.brand_kits for insert with check (auth.uid() = user_id);
create policy "Users can update own brand kit" on public.brand_kits for update using (auth.uid() = user_id);
create policy "Service role full access brand_kits" on public.brand_kits for all using (true);

-- Content ideas policies
create policy "Users can view own ideas" on public.content_ideas for select using (auth.uid() = user_id);
create policy "Users can insert own ideas" on public.content_ideas for insert with check (auth.uid() = user_id);
create policy "Users can update own ideas" on public.content_ideas for update using (auth.uid() = user_id);
create policy "Users can delete own ideas" on public.content_ideas for delete using (auth.uid() = user_id);
create policy "Service role full access content_ideas" on public.content_ideas for all using (true);

-- Posts policies
create policy "Users can view own posts" on public.posts for select using (auth.uid() = user_id);
create policy "Users can insert own posts" on public.posts for insert with check (auth.uid() = user_id);
create policy "Users can update own posts" on public.posts for update using (auth.uid() = user_id);
create policy "Users can delete own posts" on public.posts for delete using (auth.uid() = user_id);
create policy "Service role full access posts" on public.posts for all using (true);

-- API usage policies
create policy "Users can view own usage" on public.api_usage_log for select using (auth.uid() = user_id);
create policy "Service role full access api_usage" on public.api_usage_log for all using (true);

-- Handle new user trigger
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email, trial_started_at)
  values (new.id, new.email, now());
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Updated at trigger
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger brand_kits_updated_at before update on public.brand_kits
  for each row execute procedure public.update_updated_at();
create trigger posts_updated_at before update on public.posts
  for each row execute procedure public.update_updated_at();
```

---

## Build Order (For Claude Code)

### Phase 1 — Foundation
1. Next.js project setup with TypeScript, Tailwind CSS
2. Supabase auth (email/password signup + login)
3. Database migration (run SQL above)
4. Basic layout: nav, sidebar, page routing
5. Landing page
6. Pricing page
7. Terms & Privacy pages

### Phase 2 — Onboarding
8. Step 1: Website URL input + AI scrape (or manual entry)
9. Step 2: Brand kit setup (logo upload, colour pickers)
10. Step 3: Vibe selection (6 visual cards)
11. Step 4: Content preferences
12. Save all to database, mark onboarding complete

### Phase 3 — Core Engine
13. Idea generation page (/ideas) — AI generates batch, user approves/skips
14. Visual template system — HTML/CSS templates for each vibe × post type
15. Post creation (/create) — select approved idea, generate visual + caption
16. Caption generation with style/tone controls
17. Post preview with edit capabilities
18. Download image + copy caption functionality

### Phase 4 — Calendar & Management
19. Content calendar view (/dashboard)
20. Post history page (/posts)
21. Brand kit settings page (/brand-kit)
22. Account settings page (/settings)

### Phase 5 — Payments & Admin
23. Stripe integration (3 tiers + 14-day trial)
24. Admin panel (user list, usage tracking, stats)
25. Feature gating by plan
26. Email notifications (Resend)

### Phase 6 — Photo Mode
27. Photo upload + storage
28. Photo overlay templates
29. Photo-based post generation

---

## Design System

### Colours
- **Navy (dark sections):** #0f1729
- **White:** #ffffff
- **Light grey (alt sections):** #f8fafc
- **Violet (primary CTA):** #8b5cf6
- **Violet hover:** #7c3aed
- **Text primary:** #111827
- **Text secondary:** #6b7280
- **Border:** #e5e7eb

### Typography
- **Headings:** Inter, 700 weight
- **Body:** Inter, 400 weight
- **Mono/code:** JetBrains Mono

### Components
- Buttons: rounded-lg, violet primary, navy secondary, ghost/outline tertiary
- Cards: white bg, subtle border, rounded-xl, shadow-sm
- Inputs: rounded-lg, border-gray-300, focus ring violet
- Modals: centered, backdrop blur, rounded-2xl
- Mobile: fully responsive, hamburger nav, stacked layouts
