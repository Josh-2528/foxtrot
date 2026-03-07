"use client";

import { useRef, useCallback } from "react";

interface PostPreviewProps {
  html: string;
  postSize: "square_1080" | "portrait_1080x1350" | "story_1080x1920";
  className?: string;
}

const SIZE_MAP = {
  square_1080: { width: 1080, height: 1080 },
  portrait_1080x1350: { width: 1080, height: 1350 },
  story_1080x1920: { width: 1080, height: 1920 },
};

export default function PostPreview({
  html,
  postSize,
  className = "",
}: PostPreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const size = SIZE_MAP[postSize];

  // Calculate aspect ratio for the container
  const aspectRatio = size.width / size.height;
  // Scale factor to fit inside a max 400px container
  const containerMaxWidth = 400;
  const scale = containerMaxWidth / size.width;

  const containerStyle = {
    width: `${containerMaxWidth}px`,
    height: `${Math.round(containerMaxWidth / aspectRatio)}px`,
    overflow: "hidden" as const,
    position: "relative" as const,
    borderRadius: "12px",
  };

  const iframeStyle = {
    width: `${size.width}px`,
    height: `${size.height}px`,
    transform: `scale(${scale})`,
    transformOrigin: "top left",
    border: "none",
    pointerEvents: "none" as const,
  };

  const getIframeRef = useCallback(
    (node: HTMLIFrameElement | null) => {
      if (node) {
        (iframeRef as React.MutableRefObject<HTMLIFrameElement | null>).current = node;
      }
    },
    []
  );

  if (!html) {
    return null;
  }

  return (
    <div className={className} style={containerStyle}>
      <iframe
        ref={getIframeRef}
        srcDoc={html}
        style={iframeStyle}
        sandbox="allow-same-origin"
        title="Post preview"
      />
    </div>
  );
}
