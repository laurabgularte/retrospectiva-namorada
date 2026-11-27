"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, Calendar, MapPin } from "lucide-react";
import { Memory } from "@/types/memory";

interface PhotoModalProps {
  memory: Memory | null;
  onClose: () => void;
}

export function PhotoModal({ memory, onClose }: PhotoModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (memory) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [memory, onClose]);

  if (!memory) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl"
      >
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-zinc-200 hover:bg-black hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative w-full h-[60vh] max-h-[60vh] bg-zinc-950 overflow-hidden">
          <Image
            src={memory.imageUrl}
            alt={memory.title}
            fill
            sizes="(max-width: 768px) 100vw, 672px"
            className="object-contain"
          />
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-4 text-xs text-rose-400 mb-2">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {memory.displayDate}
            </span>
            {memory.location && (
              <span className="flex items-center gap-1.5 text-zinc-400">
                <MapPin className="w-3.5 h-3.5" />
                {memory.location}
              </span>
            )}
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 mb-3">
            {memory.title}
          </h3>
          <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
            {memory.description}
          </p>
        </div>
      </div>
    </div>
  );
}