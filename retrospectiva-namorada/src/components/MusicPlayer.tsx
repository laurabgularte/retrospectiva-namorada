"use client";

import { Music, Pause, Play } from "lucide-react";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { COUPLE_INFO } from "@/data/memories";

export function MusicPlayer() {
  const { isPlaying, hasError, togglePlay } = useAudioPlayer(
    COUPLE_INFO.musicPath
  );

  if (hasError) return null;

  return (
    <button
      onClick={togglePlay}
      aria-label={isPlaying ? "Pausar música" : "Tocar nossa música"}
      className="fixed bottom-5 right-5 z-40 flex items-center gap-3 bg-zinc-900/90 hover:bg-zinc-800 border border-rose-500/30 text-zinc-100 px-4 py-3 rounded-full shadow-2xl backdrop-blur-md transition-all duration-300"
    >
      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-500/20 text-rose-400">
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
      </span>
      <div className="text-left pr-1">
        <div className="text-xs font-medium text-zinc-100 flex items-center gap-1.5">
          <Music className="w-3 h-3 text-rose-400" />
          {COUPLE_INFO.musicTitle}
        </div>
        <div className="text-[10px] text-zinc-400">
          {isPlaying ? "Tocando agora..." : "Clique para ouvir"}
        </div>
      </div>
    </button>
  );
}