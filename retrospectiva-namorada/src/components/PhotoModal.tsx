"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { X, Calendar, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { Memory } from "@/types/memory";

interface PhotoModalProps {
  memory: Memory | null;
  initialIndex?: number;
  onClose: () => void;
}

export function PhotoModal({
  memory,
  initialIndex = 0,
  onClose,
}: PhotoModalProps) {
  const gallery =
    memory?.photos && memory.photos.length > 0
      ? memory.photos
      : memory?.imageUrl
        ? [memory.imageUrl]
        : [];

  const safeStart =
    gallery.length > 0
      ? Math.max(0, Math.min(initialIndex, gallery.length - 1))
      : 0;
  const [indexState, setIndexState] = useState({
    memory,
    initialIndex,
    galleryLength: gallery.length,
    index: safeStart,
  });
  const isCurrentSelection =
    indexState.memory === memory &&
    indexState.initialIndex === initialIndex &&
    indexState.galleryLength === gallery.length;
  const currentIndex = isCurrentSelection
    ? Math.max(0, Math.min(indexState.index, Math.max(0, gallery.length - 1)))
    : safeStart;
  const setCurrentIndex = useCallback((
    nextIndex: number | ((previousIndex: number) => number),
  ) => {
    setIndexState((previousState) => {
      const previousIndex =
        previousState.memory === memory &&
        previousState.initialIndex === initialIndex &&
        previousState.galleryLength === gallery.length
          ? previousState.index
          : currentIndex;
      return {
        memory,
        initialIndex,
        galleryLength: gallery.length,
        index:
          typeof nextIndex === "function"
            ? nextIndex(previousIndex)
            : nextIndex,
      };
    });
  }, [memory, initialIndex, gallery.length, currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && gallery.length > 1) {
        setCurrentIndex((prev) => (prev + 1) % gallery.length);
      }
      if (e.key === "ArrowLeft" && gallery.length > 1) {
        setCurrentIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
      }
    };

    if (memory) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [memory, onClose, gallery.length, setCurrentIndex]);

  if (!memory || gallery.length === 0) return null;

  const activePhoto = gallery[currentIndex] ?? gallery[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % gallery.length);
  };

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
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-zinc-200 hover:bg-black hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative w-full max-h-[60vh] bg-zinc-950 flex items-center justify-center overflow-hidden">
          <Image
            src={activePhoto}
            alt={`${memory.title} (${currentIndex + 1})`}
            width={1200}
            height={800}
            sizes="(max-width: 672px) 100vw, 672px"
            className="w-full h-auto object-contain max-h-[60vh]"
          />

          {gallery.length > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Foto anterior"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/65 text-white hover:bg-black transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Próxima foto"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/65 text-white hover:bg-black transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {gallery.length > 1 && (
          <div className="flex items-center justify-center gap-2 px-6 pt-4">
            {gallery.map((photo, idx) => (
              <button
                type="button"
                key={`${photo}-${idx}`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Ver foto ${idx + 1}`}
                className={`w-12 h-12 rounded-lg overflow-hidden border transition ${
                  idx === currentIndex
                    ? "border-rose-400 scale-105"
                    : "border-zinc-800 opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={photo}
                  alt={`Miniatura ${idx + 1}`}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

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