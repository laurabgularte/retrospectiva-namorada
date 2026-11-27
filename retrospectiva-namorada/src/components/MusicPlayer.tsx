"use client";

import { useState } from "react";
import { Music, ChevronDown, ChevronUp } from "lucide-react";
import { COUPLE_INFO } from "@/data/memories";

function getSpotifyEmbedUrl(url: string): string | null {
  const match = url.match(/track\/([a-zA-Z0-9]+)/);
  if (!match || !match[1]) return null;
  return `https://open.spotify.com/embed/track/${match[1]}?utm_source=generator&theme=0`;
}

export function MusicPlayer() {
  const [isMinimized, setIsMinimized] = useState(false);
  const embedUrl = getSpotifyEmbedUrl(COUPLE_INFO.spotifyUrl);

  if (!embedUrl) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 w-[300px] sm:w-[340px] bg-zinc-900/95 border border-zinc-800 rounded-2xl shadow-2xl backdrop-blur-md overflow-hidden transition-all duration-300">
      <button
        onClick={() => setIsMinimized(!isMinimized)}
        className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-medium text-zinc-200 hover:bg-zinc-800/70 transition"
      >
        <span className="flex items-center gap-2">
          <Music className="w-3.5 h-3.5 text-rose-400" />
          {COUPLE_INFO.musicTitle}
        </span>
        {isMinimized ? (
          <ChevronUp className="w-4 h-4 text-zinc-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-zinc-400" />
        )}
      </button>

      {!isMinimized && (
        <div className="px-2 pb-2">
          <iframe
            src={embedUrl}
            width="100%"
            height="80"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-xl border-0"
            title={COUPLE_INFO.musicTitle}
          />
        </div>
      )}
    </div>
  );
}