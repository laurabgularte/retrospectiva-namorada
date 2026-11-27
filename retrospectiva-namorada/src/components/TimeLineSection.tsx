"use client";

import { useState } from "react";
import Image from "next/image";
import { Calendar, MapPin, ImageIcon, Expand } from "lucide-react";
import { Memory } from "@/types/memory";
import { PhotoModal } from "./PhotoModal";

interface TimelineSectionProps {
  memories: Memory[];
}

export function TimelineSection({ memories }: TimelineSectionProps) {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
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
          const isImageMissing = failedImages[memory.id];

          return (
            <div key={memory.id} className="relative pl-8 sm:pl-12">
              <span className="absolute -left-[7px] top-2 w-3.5 h-3.5 rounded-full bg-rose-500 ring-4 ring-zinc-950" />

              <div
                onClick={() => setSelectedMemory(memory)}
                className="group cursor-pointer bg-zinc-900/70 hover:bg-zinc-900 border border-zinc-800/90 hover:border-rose-500/40 rounded-3xl overflow-hidden transition-all duration-300 shadow-lg grid grid-cols-1 md:grid-cols-12"
              >
                <div className="md:col-span-5 relative aspect-[4/3] md:aspect-auto bg-zinc-950 overflow-hidden flex items-center justify-center">
                  {!isImageMissing ? (
                    <>
                      <Image
                        src={memory.imageUrl}
                        alt={memory.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 42vw"
                        onError={() => handleImageError(memory.id)}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-black/70 text-white p-2.5 rounded-full">
                          <Expand className="w-4 h-4" />
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-zinc-500 p-6 text-center">
                      <ImageIcon className="w-10 h-10 mb-2 text-zinc-600" />
                      <span className="text-xs font-mono">
                        Adicione: {memory.imageUrl}
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