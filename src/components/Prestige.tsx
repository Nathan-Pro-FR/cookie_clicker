import { motion, AnimatePresence } from "framer-motion";
import {
  PRESTIGE_THRESHOLD,
  PRESTIGE_UPGRADES,
  formatNumber,
  shardsAvailable,
  type GameState,
  type PrestigeUpgradeId,
} from "@/lib/game";

interface Props {
  state: GameState;
  onAscend: () => void;
  onBuyPrestige: (id: PrestigeUpgradeId) => void;
}

export function Prestige({ state, onAscend, onBuyPrestige }: Props) {
  const pending = shardsAvailable(state.totalMatterAllTime, state.prestigeUpgrades);
  const progress = Math.min(1, state.totalMatterAllTime / PRESTIGE_THRESHOLD);
  const ready = pending > 0;

  return (
    <div className="glass-panel rounded-2xl p-4 h-full flex flex-col">
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="text-sm font-display tracking-[0.3em] uppercase text-gold-celestial">Ascension</h2>
        <span className="text-xs font-mono text-muted-foreground">#{state.prestigeCount}</span>
      </div>

      <div className="rounded-xl border border-gold-celestial/30 bg-gold-celestial/5 p-3 mb-3">
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Éclats détenus</span>
          <span className="gold-text font-display text-lg">✦ {formatNumber(state.shards)}</span>
        </div>
        <div className="text-[10px] text-muted-foreground">
          Bonus actuel : <span className="text-gold-celestial">+{(state.shards * 2).toFixed(0)}% production</span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {ready ? (
          <motion.button
            key="ascend"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={onAscend}
            className="w-full rounded-xl py-3 px-4 mb-3 font-display tracking-widest uppercase text-sm cursor-pointer"
            style={{
              background: "linear-gradient(135deg, oklch(0.85 0.16 85), oklch(0.72 0.22 305))",
              color: "oklch(0.08 0.02 280)",
              boxShadow: "var(--shadow-gold)",
            }}
          >
            ⚡ Déclencher le Big Bang
            <div className="text-[10px] font-sans normal-case tracking-normal opacity-80 mt-0.5">
              Gagner ✦ {pending} éclats
            </div>
          </motion.button>
        ) : (
          <motion.div
            key="progress"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-3"
          >
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
              Seuil de singularité
            </div>
            <div className="h-2 rounded-full bg-secondary overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, var(--blue-electric), var(--violet-neon), var(--gold-celestial))" }}
                animate={{ width: `${progress * 100}%` }}
                transition={{ type: "spring", stiffness: 80, damping: 20 }}
              />
            </div>
            <div className="text-[10px] font-mono text-muted-foreground mt-1">
              {formatNumber(state.totalMatterAllTime)} / {formatNumber(PRESTIGE_THRESHOLD)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Arbre temporel</div>
      <div className="space-y-2 overflow-y-auto pr-1 flex-1 min-h-0">
        {PRESTIGE_UPGRADES.map((p) => {
          const owned = state.prestigeUpgrades.includes(p.id);
          const affordable = state.shards >= p.cost;
          return (
            <button
              key={p.id}
              disabled={owned || !affordable}
              onClick={() => onBuyPrestige(p.id)}
              className={`w-full text-left rounded-xl p-2.5 border transition-colors ${
                owned
                  ? "border-gold-celestial/50 bg-gold-celestial/10"
                  : affordable
                    ? "border-violet-neon/40 bg-violet-neon/5 hover:bg-violet-neon/10 cursor-pointer"
                    : "border-border/30 bg-card/20 opacity-60 cursor-not-allowed"
              }`}
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-display text-sm">{p.name}</span>
                <span className={`text-xs font-mono shrink-0 ${owned ? "gold-text" : "text-gold-celestial"}`}>
                  {owned ? "✓ Acquis" : `✦ ${p.cost}`}
                </span>
              </div>
              <div className="text-[10px] text-muted-foreground mt-0.5">{p.description}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
