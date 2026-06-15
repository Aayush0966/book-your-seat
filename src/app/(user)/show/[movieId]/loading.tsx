import { Film } from 'lucide-react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#1a0505] via-[#2b0808] to-[#0a0303]">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff0000]/10 blur-[120px]" />

      <div className="relative flex flex-col items-center gap-9">
        {/* Cinematic spinner */}
        <div className="relative h-24 w-24">
          {/* soft pulse halo */}
          <div className="absolute inset-0 rounded-full bg-[#ff0000]/20 blur-2xl animate-pulse" />

          {/* static outer track */}
          <div className="absolute inset-0 rounded-full border border-white/10" />

          {/* primary spinning arc */}
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#ff0000] border-r-[#ff0000]/40 animate-spin [animation-duration:1.1s]" />

          {/* inner counter-rotating arc */}
          <div className="absolute inset-[14px] rounded-full border border-transparent border-b-[#ff0000]/70 animate-premium-spin-reverse" />

          {/* center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Film className="h-7 w-7 text-[#ff0000] animate-premium-float" />
          </div>
        </div>

        {/* Wordmark */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-base font-semibold uppercase tracking-[0.35em] text-white/90 sm:text-lg">
            Book Your Seat
          </h1>

          {/* shimmer line */}
          <div className="relative h-px w-44 overflow-hidden rounded-full bg-white/10">
            <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-[#ff0000] to-transparent animate-premium-shimmer" />
          </div>

          <p className="text-xs font-light tracking-wide text-white/45">
            Preparing your cinematic experience
          </p>
        </div>
      </div>
    </div>
  );
}
