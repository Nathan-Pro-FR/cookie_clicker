import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { formatNumber } from "@/lib/game";

interface Props {
  onClick: (x: number, y: number) => number;
  cps: number;
}

interface FloatingNumber {
  id: number;
  x: number;
  y: number;
  value: number;
  dx: number;
}

let nextId = 0;

export function Singularity({ onClick, cps }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [floats, setFloats] = useState<FloatingNumber[]>([]);

  // Pulse/rotation speeds scale with cps
  const rotateDuration = Math.max(4, 30 - Math.log10(cps + 1) * 3);
  const pulseDuration = Math.max(0.6, 2.4 - Math.log10(cps + 1) * 0.2);

  function handleClick(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const gain = onClick(x, y);
    const id = nextId++;
    const dx = (Math.random() - 0.5) * 80;
    setFloats((f) => [...f, { id, x, y, value: gain, dx }]);
    setTimeout(() => setFloats((f) => f.filter((n) => n.id !== id)), 1100);
  }

  return (
    <div
      ref={ref}
      className="relative flex items-center justify-center select-none"
      style={{ width: "min(70vw, 480px)", height: "min(70vw, 480px)" }}
    >
      {/* Orbital rings */}
      <div className="absolute inset-0 pointer-events-none" style={{ animation: `orbit ${rotateDuration}s linear infinite` }}>
        <div className="absolute inset-[8%] rounded-full border border-violet-neon/30" />
        <div className="absolute inset-[16%] rounded-full border border-blue-electric/20" style={{ borderStyle: "dashed" }} />
      </div>
      <div
        className="absolute inset-[4%] pointer-events-none rounded-full border border-gold-celestial/15"
        style={{ animation: `orbit ${rotateDuration * 1.6}s linear infinite reverse` }}
      />

      {/* Singularity core */}
      <motion.button
        onClick={handleClick}
        whileTap={{ scale: 0.88 }}
        transition={{ type: "spring", stiffness: 600, damping: 14 }}
        className="relative rounded-full cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-violet-neon"
        style={{
          width: "62%",
          height: "62%",
          background: "var(--gradient-singularity)",
          animation: `pulse-glow ${pulseDuration}s ease-in-out infinite`,
        }}
        aria-label="Singularité Quantique"
      >
        {/* Inner void */}
        <div
          className="absolute rounded-full"
          style={{
            inset: "22%",
            background: "radial-gradient(circle, oklch(0 0 0) 30%, oklch(0.15 0.1 290 / 0.8) 70%, transparent)",
            boxShadow: "inset 0 0 40px oklch(0.85 0.2 305 / 0.6)",
          }}
        />
        {/* Event horizon shimmer */}
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{ inset: "0%", background: "conic-gradient(from 0deg, transparent, oklch(0.9 0.2 305 / 0.4), transparent, oklch(0.85 0.16 85 / 0.3), transparent)" }}
          animate={{ rotate: 360 }}
          transition={{ duration: rotateDuration / 2, repeat: Infinity, ease: "linear" }}
        />
      </motion.button>

      {/* Floating numbers */}
      <div className="absolute inset-0 pointer-events-none overflow-visible">
        {floats.map((f) => (
          <div
            key={f.id}
            className="absolute text-xl font-display font-bold gold-text"
            style={{
              left: f.x,
              top: f.y,
              animation: "float-up 1.1s ease-out forwards",
              ["--dx" as string]: `calc(-50% + ${f.dx}px)`,
            }}
          >
            +{formatNumber(f.value)}
          </div>
        ))}
      </div>
    </div>
  );
}
