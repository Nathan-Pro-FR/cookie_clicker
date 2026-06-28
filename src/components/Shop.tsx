import { motion } from "framer-motion";
import { UPGRADES, costOf, formatNumber, type GameState, type UpgradeDef } from "@/lib/game";

interface Props {
  state: GameState;
  onBuy: (id: UpgradeDef["id"]) => void;
}

export function Shop({ state, onBuy }: Props) {
  return (
    <div className="glass-panel rounded-2xl p-4 h-full flex flex-col">
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="text-sm font-display tracking-[0.3em] uppercase text-violet-neon">Modules</h2>
        <span className="text-xs text-muted-foreground font-mono">{UPGRADES.filter(u => state.upgrades[u.id] > 0).length}/{UPGRADES.length}</span>
      </div>
      <div className="space-y-2 overflow-y-auto pr-1 flex-1 min-h-0">
        {UPGRADES.map((def) => {
          const owned = state.upgrades[def.id];
          const cost = costOf(def, owned);
          const affordable = state.matter >= cost;
          const unlocked = owned > 0 || state.totalMatterAllTime >= def.baseCost * 0.6;
          return (
            <motion.button
              key={def.id}
              whileHover={unlocked && affordable ? { scale: 1.02, x: 2 } : undefined}
              whileTap={affordable ? { scale: 0.98 } : undefined}
              disabled={!affordable || !unlocked}
              onClick={() => onBuy(def.id)}
              className={`w-full text-left rounded-xl p-3 border transition-colors flex items-center gap-3 ${
                affordable
                  ? "border-violet-neon/40 bg-violet-neon/5 hover:bg-violet-neon/10 cursor-pointer"
                  : "border-border/40 bg-card/30 cursor-not-allowed opacity-60"
              }`}
            >
              <div className="text-2xl shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-background/60 border border-border/50">
                {unlocked ? def.icon : "❓"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-display text-sm truncate">{unlocked ? def.name : "???"}</span>
                  <span className="text-xs font-mono text-muted-foreground">x{owned}</span>
                </div>
                {unlocked ? (
                  <div className="flex items-baseline justify-between mt-0.5">
                    <span className="text-[10px] text-muted-foreground truncate pr-2">{def.description}</span>
                    <span className={`text-xs font-mono shrink-0 ${affordable ? "gold-text" : "text-muted-foreground"}`}>
                      {formatNumber(cost)}
                    </span>
                  </div>
                ) : (
                  <div className="text-[10px] text-muted-foreground">Atteignez {formatNumber(def.baseCost * 0.6)} de matière</div>
                )}
                {unlocked && (
                  <div className="text-[10px] text-blue-electric/80 font-mono mt-0.5">+{formatNumber(def.baseCps)}/s</div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
