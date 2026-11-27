import { Heart, Plane, Sparkles, Calendar } from "lucide-react";
import { COUPLE_INFO, MILESTONES, MEMORIES, FINAL_LETTER } from "@/data/memories";
import { LoveCounter } from "@/components/LoveCounter";
import { TimelineSection } from "@/components/TimeLineSection";
import { MusicPlayer } from "@/components/MusicPlayer";

export default function HomePage() {
  const getIcon = (icon: string) => {
    switch (icon) {
      case "heart":
        return <Heart className="w-5 h-5 text-rose-400" />;
      case "plane":
        return <Plane className="w-5 h-5 text-rose-400" />;
      case "sparkles":
        return <Sparkles className="w-5 h-5 text-rose-400" />;
      default:
        return <Calendar className="w-5 h-5 text-rose-400" />;
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 text-center">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-950/35 via-zinc-950 to-zinc-950" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium mb-6">
          <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
          Para {COUPLE_INFO.herName}
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-3xl mx-auto">
          {COUPLE_INFO.heroTitle}
        </h1>

        <p className="mt-5 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          {COUPLE_INFO.heroSubtitle}
        </p>

        {/* Contador em Tempo Real */}
        <div className="mt-12">
          <p className="text-xs uppercase tracking-widest text-zinc-500 mb-4">
            Compartilhando a vida há
          </p>
          <LoveCounter />
        </div>
      </section>

      {/* Marcos Principais */}
      <section className="py-12 px-4 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MILESTONES.map((item) => (
            <div
              key={item.id}
              className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-5 hover:border-rose-500/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center mb-4">
                {getIcon(item.icon)}
              </div>
              <div className="text-xs text-rose-400 font-medium mb-1">
                {item.date}
              </div>
              <h3 className="text-base font-bold text-zinc-100 mb-1.5">
                {item.title}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {item.highlight}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Linha do Tempo com Fotos */}
      <TimelineSection memories={MEMORIES} />

      {/* Carta Final */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto bg-gradient-to-b from-zinc-900 to-zinc-900/50 border border-zinc-800 rounded-3xl p-8 sm:p-12 shadow-2xl relative">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/15 flex items-center justify-center mb-6">
            <Heart className="w-6 h-6 text-rose-400 fill-rose-400" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            {FINAL_LETTER.greeting}
          </h2>

          <div className="space-y-4 text-zinc-300 leading-relaxed text-base sm:text-lg">
            {FINAL_LETTER.paragraphs.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-800/80">
            <p className="text-rose-400 font-semibold text-lg">
              {FINAL_LETTER.signature}
            </p>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="py-8 text-center text-xs text-zinc-600">
        Feito com amor especialmente para você.
      </footer>

      {/* Player de Música Flutuante */}
      <MusicPlayer />
    </main>
  );
}