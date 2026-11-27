"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Calendar,
  MapPin,
  ImageIcon,
  Expand,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Memory } from "@/types/memory";
import { PhotoModal } from "./PhotoModal";

interface TimelineSectionProps {
  memories: Memory[];
}

function getMemoryPhotos(memory: Memory): string[] {
  if (memory.photos && memory.photos.length > 0) {
    return memory.photos;
  }
  return memory.imageUrl ? [memory.imageUrl] : [];
}

export function TimelineSection({ memories }: TimelineSectionProps) {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [photoIndexes, setPhotoIndexes] = useState<Record<string, number>>({});
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const handlePrevPhoto = (
    e: React.MouseEvent<HTMLButtonElement>,
    memory: Memory,
    totalPhotos: number
  ) => {
    e.stopPropagation();
    setPhotoIndexes((prev) => {
      const current = prev[memory.id] ?? 0;
      return {
        ...prev,
        [memory.id]: (current - 1 + totalPhotos) % totalPhotos,
      };
    });
  };

  const handleNextPhoto = (
    e: React.MouseEvent<HTMLButtonElement>,
    memory: Memory,
    totalPhotos: number
  ) => {
    e.stopPropagation();
    setPhotoIndexes((prev) => {
      const current = prev[memory.id] ?? 0;
      return {
        ...prev,
        [memory.id]: (current + 1) % totalPhotos,
      };
    });
  };

  const handleImageError = (photoKey: string) => {
    setFailedImages((prev) => ({ ...prev, [photoKey]: true }));
  };

  return (
    <section className="py-16 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-14">
        <span className="text-xs font-semibold uppercase tracking-widest text-rose-400">
          Nossa História
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-zinc-100 mt-2">
          Momentos que Marcaram
        </h2>
      </div>

      <div className="relative border-l border-zinc-800 ml-3 sm:ml-6 space-y-12">
        {memories.map((memory) => {
          const photos = getMemoryPhotos(memory);
          const hasMultiplePhotos = photos.length > 1;
          const currentIndex = photoIndexes[memory.id] ?? 0;
          const safeIndex = currentIndex < photos.length ? currentIndex : 0;
          const activePhoto = photos[safeIndex] ?? memory.imageUrl;
          const photoKey = `${memory.id}-${safeIndex}`;
          const isImageMissing = failedImages[photoKey];

          return (
            <div key={memory.id} className="relative pl-8 sm:pl-12">
              <span className="absolute -left-[7px] top-2 w-3.5 h-3.5 rounded-full bg-rose-500 ring-4 ring-zinc-950" />

              <div
                onClick={() => setSelectedMemory(memory)}
                className="group cursor-pointer bg-zinc-900/70 hover:bg-zinc-900 border border-zinc-800/90 hover:border-rose-500/40 rounded-3xl overflow-hidden transition-all duration-300 shadow-lg grid grid-cols-1 md:grid-cols-12"
              >
                <div className="md:col-span-5 relative aspect-[4/3] md:aspect-auto bg-zinc-950 overflow-hidden flex items-center justify-center">
                  {!isImageMissing && activePhoto ? (
                    <>
                      <Image
                        src={activePhoto}
                        alt={`${memory.title} - foto ${safeIndex + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 42vw"
                        onError={() => handleImageError(photoKey)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {hasMultiplePhotos && (
                        <>
                          <button
                            type="button"
                            onClick={(e) =>
                              handlePrevPhoto(e, memory, photos.length)
                            }
                            aria-label="Foto anterior"
                            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/65 hover:bg-black text-white transition"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={(e) =>
                              handleNextPhoto(e, memory, photos.length)
                            }
                            aria-label="Próxima foto"
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/65 hover:bg-black text-white transition"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>

                          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/65">
                            {photos.map((_, idx) => (
                              <span
                                key={idx}
                                className={`h-1.5 rounded-full transition-all ${
                                  idx === safeIndex
                                    ? "w-4 bg-rose-400"
                                    : "w-1.5 bg-zinc-400/60"
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}

                      <div className="absolute top-2.5 right-2.5 bg-black/60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <Expand className="w-3.5 h-3.5" />
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-zinc-500 p-6 text-center">
                      <ImageIcon className="w-10 h-10 mb-2 text-zinc-600" />
                      <span className="text-xs font-mono">
                        Adicione: {activePhoto || "/photos/sua-foto.jpg"}
                      </span>
                    </div>
                  )}
                </div>

                <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-3 text-xs mb-3">
                    {memory.tag && (
                      <span className="px-2.5 py-1 rounded-full bg-rose-500/15 text-rose-400 font-medium">
                        {memory.tag}
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-zinc-400">
                      <Calendar className="w-3.5 h-3.5 text-rose-400" />
                      {memory.displayDate}
                    </span>
                    {memory.location && (
                      <span className="flex items-center gap-1 text-zinc-400">
                        <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                        {memory.location}
                      </span>
                    )}
                    {hasMultiplePhotos && (
                      <span className="text-zinc-500 font-medium">
                        {safeIndex + 1}/{photos.length} fotos
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 group-hover:text-rose-300 transition-colors mb-3">
                    {memory.title}
                  </h3>

                  <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                    {memory.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <PhotoModal
        memory={selectedMemory}
        onClose={() => setSelectedMemory(null)}
      />
    </section>
  );
}