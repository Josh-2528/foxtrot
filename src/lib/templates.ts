import type { VibeOption } from "@/lib/types";

// ─── Types ────────────────────────────────────────────────────────

export type TemplateType =
  | "text_overlay"
  | "stats_highlight"
  | "quote_card"
  | "service_spotlight"
  | "tip_education"
  | "promotional_offer"
  | "testimonial_card";

export type PostSize = "square_1080" | "portrait_1080x1350" | "story_1080x1920";

export interface TemplateInput {
  template: TemplateType;
  headline: string;
  subtext: string;
  accentText: string;
  layoutVariant: number;
  // Brand kit
  primaryColour: string;
  secondaryColour: string;
  accentColour: string;
  backgroundColour: string;
  textColour: string;
  fontPreference: string;
  vibe: VibeOption;
  logoUrl?: string;
  businessName: string;
  // Size
  postSize: PostSize;
}

// ─── Size Dimensions ──────────────────────────────────────────────

const SIZE_MAP: Record<PostSize, { width: number; height: number }> = {
  square_1080: { width: 1080, height: 1080 },
  portrait_1080x1350: { width: 1080, height: 1350 },
  story_1080x1920: { width: 1080, height: 1920 },
};

// ─── Vibe Styles ──────────────────────────────────────────────────

interface VibeStyles {
  borderRadius: string;
  headlineWeight: string;
  subtextWeight: string;
  containerStyle: string;
  accentStyle: string;
  decorElement: string;
}

const VIBE_STYLES: Record<VibeOption, VibeStyles> = {
  clean_minimal: {
    borderRadius: "16px",
    headlineWeight: "600",
    subtextWeight: "400",
    containerStyle: "background: var(--bg); border: 2px solid rgba(0,0,0,0.06);",
    accentStyle: "color: var(--primary); font-weight: 700;",
    decorElement: "",
  },
  bold_loud: {
    borderRadius: "0px",
    headlineWeight: "900",
    subtextWeight: "600",
    containerStyle: "background: var(--primary); transform: rotate(-1deg);",
    accentStyle: "color: var(--accent); font-size: 1.3em; font-weight: 900; text-transform: uppercase;",
    decorElement: `<div style="position:absolute;top:20px;right:20px;width:120px;height:120px;border:6px solid var(--accent);border-radius:0;opacity:0.3;"></div>`,
  },
  dark_premium: {
    borderRadius: "12px",
    headlineWeight: "700",
    subtextWeight: "400",
    containerStyle: "background: linear-gradient(145deg, #1a1a2e 0%, #0a0a15 100%); border: 1px solid rgba(255,255,255,0.08);",
    accentStyle: "color: var(--accent); font-weight: 600; letter-spacing: 2px; text-transform: uppercase;",
    decorElement: `<div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--primary),var(--accent));"></div>`,
  },
  bright_fun: {
    borderRadius: "24px",
    headlineWeight: "800",
    subtextWeight: "500",
    containerStyle: "background: var(--bg); border: 3px solid var(--primary);",
    accentStyle: "color: var(--primary); font-weight: 800; background: var(--accent); padding: 4px 16px; border-radius: 100px; display: inline-block;",
    decorElement: `<div style="position:absolute;bottom:30px;right:30px;width:80px;height:80px;background:var(--accent);border-radius:50%;opacity:0.2;"></div><div style="position:absolute;top:40px;left:-20px;width:60px;height:60px;background:var(--primary);border-radius:50%;opacity:0.15;"></div>`,
  },
  earthy_natural: {
    borderRadius: "20px",
    headlineWeight: "700",
    subtextWeight: "400",
    containerStyle: "background: var(--bg); border: 1px solid rgba(0,0,0,0.1);",
    accentStyle: "color: var(--primary); font-weight: 600; font-style: italic;",
    decorElement: `<div style="position:absolute;bottom:0;left:0;right:0;height:6px;background:var(--primary);opacity:0.3;border-radius:0 0 20px 20px;"></div>`,
  },
  corporate: {
    borderRadius: "8px",
    headlineWeight: "700",
    subtextWeight: "400",
    containerStyle: "background: var(--bg); border: 1px solid #e5e7eb; box-shadow: 0 2px 8px rgba(0,0,0,0.06);",
    accentStyle: "color: var(--primary); font-weight: 700; border-left: 4px solid var(--primary); padding-left: 12px;",
    decorElement: `<div style="position:absolute;top:0;left:0;bottom:0;width:6px;background:var(--primary);border-radius:8px 0 0 8px;"></div>`,
  },
};

// ─── Google Font URL ──────────────────────────────────────────────

function getFontImport(font: string): string {
  const fontMap: Record<string, string> = {
    Inter: "Inter:wght@400;500;600;700;800;900",
    Montserrat: "Montserrat:wght@400;500;600;700;800;900",
    Poppins: "Poppins:wght@400;500;600;700;800;900",
    Merriweather: "Merriweather:wght@400;700;900",
    "Playfair Display": "Playfair+Display:wght@400;600;700;900",
    "Space Grotesk": "Space+Grotesk:wght@400;500;600;700",
  };
  const family = fontMap[font] || fontMap["Inter"];
  return `@import url('https://fonts.googleapis.com/css2?family=${family}&display=swap');`;
}

// ─── Template Generators ──────────────────────────────────────────

function textOverlay(input: TemplateInput, size: { width: number; height: number }, vibeStyle: VibeStyles): string {
  const layouts = [
    // Layout 1: centered text
    `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;height:100%;padding:80px;">
      ${vibeStyle.decorElement}
      <h1 style="font-size:64px;font-weight:${vibeStyle.headlineWeight};color:var(--text);line-height:1.2;margin:0 0 24px 0;">${input.headline}</h1>
      ${input.subtext ? `<p style="font-size:28px;font-weight:${vibeStyle.subtextWeight};color:var(--text);opacity:0.7;margin:0 0 32px 0;max-width:80%;">${input.subtext}</p>` : ""}
      ${input.accentText ? `<p style="${vibeStyle.accentStyle};font-size:24px;margin:0;">${input.accentText}</p>` : ""}
      ${input.logoUrl ? `<img src="${input.logoUrl}" alt="" style="height:40px;margin-top:auto;opacity:0.6;" />` : `<p style="font-size:18px;color:var(--text);opacity:0.4;margin-top:auto;">${input.businessName}</p>`}
    </div>`,
    // Layout 2: top-aligned with accent bar
    `<div style="display:flex;flex-direction:column;height:100%;padding:80px;">
      ${vibeStyle.decorElement}
      <div style="width:60px;height:4px;background:var(--primary);margin-bottom:40px;border-radius:2px;"></div>
      <h1 style="font-size:60px;font-weight:${vibeStyle.headlineWeight};color:var(--text);line-height:1.15;margin:0 0 24px 0;">${input.headline}</h1>
      ${input.subtext ? `<p style="font-size:26px;font-weight:${vibeStyle.subtextWeight};color:var(--text);opacity:0.7;margin:0 0 32px 0;">${input.subtext}</p>` : ""}
      ${input.accentText ? `<p style="${vibeStyle.accentStyle};font-size:22px;margin:0;">${input.accentText}</p>` : ""}
      <div style="margin-top:auto;">
        ${input.logoUrl ? `<img src="${input.logoUrl}" alt="" style="height:36px;opacity:0.6;" />` : `<p style="font-size:18px;color:var(--text);opacity:0.4;margin:0;">${input.businessName}</p>`}
      </div>
    </div>`,
    // Layout 3: bottom-heavy with large accent
    `<div style="display:flex;flex-direction:column;justify-content:flex-end;height:100%;padding:80px;">
      ${vibeStyle.decorElement}
      ${input.accentText ? `<p style="${vibeStyle.accentStyle};font-size:48px;margin:0 0 24px 0;">${input.accentText}</p>` : ""}
      <h1 style="font-size:56px;font-weight:${vibeStyle.headlineWeight};color:var(--text);line-height:1.2;margin:0 0 20px 0;">${input.headline}</h1>
      ${input.subtext ? `<p style="font-size:26px;font-weight:${vibeStyle.subtextWeight};color:var(--text);opacity:0.7;margin:0 0 40px 0;">${input.subtext}</p>` : ""}
      ${input.logoUrl ? `<img src="${input.logoUrl}" alt="" style="height:36px;opacity:0.6;" />` : `<p style="font-size:18px;color:var(--text);opacity:0.4;margin:0;">${input.businessName}</p>`}
    </div>`,
  ];
  return layouts[(input.layoutVariant - 1) % layouts.length];
}

function statsHighlight(input: TemplateInput, size: { width: number; height: number }, vibeStyle: VibeStyles): string {
  return `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;height:100%;padding:80px;">
    ${vibeStyle.decorElement}
    ${input.accentText ? `<p style="font-size:120px;font-weight:900;color:var(--primary);margin:0;line-height:1;">${input.accentText}</p>` : ""}
    <h1 style="font-size:48px;font-weight:${vibeStyle.headlineWeight};color:var(--text);line-height:1.2;margin:24px 0 16px 0;">${input.headline}</h1>
    ${input.subtext ? `<p style="font-size:26px;font-weight:${vibeStyle.subtextWeight};color:var(--text);opacity:0.7;margin:0;">${input.subtext}</p>` : ""}
    ${input.logoUrl ? `<img src="${input.logoUrl}" alt="" style="height:36px;margin-top:auto;opacity:0.6;" />` : `<p style="font-size:18px;color:var(--text);opacity:0.4;margin-top:auto;">${input.businessName}</p>`}
  </div>`;
}

function quoteCard(input: TemplateInput, size: { width: number; height: number }, vibeStyle: VibeStyles): string {
  return `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;height:100%;padding:100px;">
    ${vibeStyle.decorElement}
    <p style="font-size:80px;color:var(--primary);margin:0;line-height:1;opacity:0.3;">&ldquo;</p>
    <h1 style="font-size:44px;font-weight:${vibeStyle.headlineWeight};color:var(--text);line-height:1.4;margin:0 0 24px 0;font-style:italic;">${input.headline}</h1>
    ${input.subtext ? `<p style="font-size:24px;font-weight:${vibeStyle.subtextWeight};color:var(--text);opacity:0.7;margin:0 0 16px 0;">${input.subtext}</p>` : ""}
    ${input.accentText ? `<p style="${vibeStyle.accentStyle};font-size:20px;margin:0;">${input.accentText}</p>` : ""}
    <div style="width:40px;height:3px;background:var(--primary);margin:32px 0;opacity:0.5;border-radius:2px;"></div>
    ${input.logoUrl ? `<img src="${input.logoUrl}" alt="" style="height:32px;opacity:0.6;" />` : `<p style="font-size:18px;color:var(--text);opacity:0.4;margin:0;">${input.businessName}</p>`}
  </div>`;
}

function serviceSpotlight(input: TemplateInput, size: { width: number; height: number }, vibeStyle: VibeStyles): string {
  return `<div style="display:flex;flex-direction:column;height:100%;padding:80px;">
    ${vibeStyle.decorElement}
    <div style="display:flex;align-items:center;gap:16px;margin-bottom:48px;">
      ${input.logoUrl ? `<img src="${input.logoUrl}" alt="" style="height:40px;" />` : `<p style="font-size:20px;font-weight:700;color:var(--primary);margin:0;">${input.businessName}</p>`}
    </div>
    ${input.accentText ? `<p style="${vibeStyle.accentStyle};font-size:20px;margin:0 0 20px 0;letter-spacing:1px;">${input.accentText}</p>` : ""}
    <h1 style="font-size:58px;font-weight:${vibeStyle.headlineWeight};color:var(--text);line-height:1.2;margin:0 0 24px 0;">${input.headline}</h1>
    ${input.subtext ? `<p style="font-size:28px;font-weight:${vibeStyle.subtextWeight};color:var(--text);opacity:0.7;margin:0;">${input.subtext}</p>` : ""}
    <div style="margin-top:auto;padding-top:40px;border-top:1px solid rgba(128,128,128,0.15);">
      <p style="font-size:18px;color:var(--primary);font-weight:600;margin:0;">Learn More &rarr;</p>
    </div>
  </div>`;
}

function tipEducation(input: TemplateInput, size: { width: number; height: number }, vibeStyle: VibeStyles): string {
  return `<div style="display:flex;flex-direction:column;height:100%;padding:80px;">
    ${vibeStyle.decorElement}
    <div style="display:inline-flex;align-items:center;gap:10px;background:var(--primary);color:white;padding:10px 24px;border-radius:${vibeStyle.borderRadius};font-size:18px;font-weight:700;margin-bottom:40px;align-self:flex-start;">
      ${input.accentText || "TIP"}
    </div>
    <h1 style="font-size:52px;font-weight:${vibeStyle.headlineWeight};color:var(--text);line-height:1.25;margin:0 0 28px 0;">${input.headline}</h1>
    ${input.subtext ? `<p style="font-size:28px;font-weight:${vibeStyle.subtextWeight};color:var(--text);opacity:0.7;margin:0;line-height:1.5;">${input.subtext}</p>` : ""}
    ${input.logoUrl ? `<img src="${input.logoUrl}" alt="" style="height:36px;margin-top:auto;opacity:0.6;" />` : `<p style="font-size:18px;color:var(--text);opacity:0.4;margin-top:auto;">${input.businessName}</p>`}
  </div>`;
}

function promotionalOffer(input: TemplateInput, size: { width: number; height: number }, vibeStyle: VibeStyles): string {
  return `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;height:100%;padding:80px;background:linear-gradient(135deg,var(--primary),var(--secondary));">
    ${vibeStyle.decorElement}
    ${input.accentText ? `<p style="font-size:80px;font-weight:900;color:white;margin:0;line-height:1;text-shadow:0 2px 20px rgba(0,0,0,0.2);">${input.accentText}</p>` : ""}
    <h1 style="font-size:52px;font-weight:${vibeStyle.headlineWeight};color:white;line-height:1.2;margin:20px 0;text-shadow:0 2px 10px rgba(0,0,0,0.15);">${input.headline}</h1>
    ${input.subtext ? `<p style="font-size:26px;color:white;opacity:0.9;margin:0 0 32px 0;">${input.subtext}</p>` : ""}
    <div style="background:white;color:var(--primary);padding:16px 48px;border-radius:${vibeStyle.borderRadius};font-size:22px;font-weight:700;">
      Shop Now
    </div>
    ${input.logoUrl ? `<img src="${input.logoUrl}" alt="" style="height:32px;margin-top:auto;opacity:0.8;filter:brightness(10);" />` : `<p style="font-size:18px;color:white;opacity:0.6;margin-top:auto;">${input.businessName}</p>`}
  </div>`;
}

function testimonialCard(input: TemplateInput, size: { width: number; height: number }, vibeStyle: VibeStyles): string {
  return `<div style="display:flex;flex-direction:column;justify-content:center;height:100%;padding:100px;">
    ${vibeStyle.decorElement}
    <div style="display:flex;gap:4px;margin-bottom:32px;">
      ${Array(5).fill(0).map(() => `<span style="font-size:32px;color:var(--primary);">&#9733;</span>`).join("")}
    </div>
    <h1 style="font-size:44px;font-weight:${vibeStyle.headlineWeight};color:var(--text);line-height:1.4;margin:0 0 32px 0;">&ldquo;${input.headline}&rdquo;</h1>
    ${input.subtext ? `<p style="font-size:24px;font-weight:${vibeStyle.subtextWeight};color:var(--text);opacity:0.6;margin:0 0 8px 0;">&mdash; ${input.subtext}</p>` : ""}
    ${input.accentText ? `<p style="font-size:18px;color:var(--primary);margin:0;">${input.accentText}</p>` : ""}
    <div style="margin-top:auto;padding-top:40px;">
      ${input.logoUrl ? `<img src="${input.logoUrl}" alt="" style="height:36px;opacity:0.6;" />` : `<p style="font-size:18px;color:var(--text);opacity:0.4;margin:0;">${input.businessName}</p>`}
    </div>
  </div>`;
}

// ─── Template Router ──────────────────────────────────────────────

const TEMPLATE_MAP: Record<TemplateType, (input: TemplateInput, size: { width: number; height: number }, vibeStyle: VibeStyles) => string> = {
  text_overlay: textOverlay,
  stats_highlight: statsHighlight,
  quote_card: quoteCard,
  service_spotlight: serviceSpotlight,
  tip_education: tipEducation,
  promotional_offer: promotionalOffer,
  testimonial_card: testimonialCard,
};

// ─── Main Export ──────────────────────────────────────────────────

export function generateVisualHtml(input: TemplateInput): string {
  const size = SIZE_MAP[input.postSize];
  const vibeStyle = VIBE_STYLES[input.vibe];
  const templateFn = TEMPLATE_MAP[input.template];

  if (!templateFn) {
    throw new Error(`Unknown template: ${input.template}`);
  }

  const body = templateFn(input, size, vibeStyle);

  // Determine if we need light or dark text based on vibe
  const isDarkBg = ["dark_premium", "bold_loud"].includes(input.vibe);
  const textColor = isDarkBg ? "#ffffff" : input.textColour;
  const bgColor = isDarkBg ? input.secondaryColour : input.backgroundColour;

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
${getFontImport(input.fontPreference)}
:root {
  --primary: ${input.primaryColour};
  --secondary: ${input.secondaryColour};
  --accent: ${input.accentColour};
  --bg: ${bgColor};
  --text: ${textColor};
  --font: '${input.fontPreference}', sans-serif;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
  width: ${size.width}px;
  height: ${size.height}px;
  font-family: var(--font);
  overflow: hidden;
  position: relative;
  ${vibeStyle.containerStyle}
  border-radius: ${vibeStyle.borderRadius};
}
</style>
</head>
<body>
${body}
</body>
</html>`;
}
