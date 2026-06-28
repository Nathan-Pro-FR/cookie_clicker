import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useRef } from "react";
import {
  UPGRADES,
  computeCps,
  computeClickPower,
  formatNumber,
  type GameState,
} from "@/lib/game";

interface OfflineProps {
  open: boolean;
  gain: number;
  seconds: number;
  onClose: () => void;
}

export function OfflineModal({ open, gain, seconds, onClose }: OfflineProps) {
  const mins = Math.floor(seconds / 60);
  const hrs = Math.floor(mins / 60);
  const human = hrs > 0 ? `${hrs}h ${mins % 60}m` : mins > 0 ? `${mins}m` : `${Math.floor(seconds)}s`;
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.85, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-panel rounded-2xl p-6 max-w-sm w-full text-center"
            style={{ boxShadow: "var(--shadow-neon)" }}
          >
            <div className="text-[10px] tracking-[0.4em] uppercase text-violet-neon/80 font-display mb-2">
              Bon retour, voyageur
            </div>
            <h3 className="font-display text-2xl neon-text mb-4">Récolte hors-ligne</h3>
            <div className="text-5xl my-4">🌌</div>
            <div className="font-display text-3xl gold-text mb-1">+{formatNumber(gain)}</div>
            <div className="text-xs text-muted-foreground mb-5">
              matière noire accumulée pendant {human}
              <div className="text-[10px] mt-1 opacity-70">(50% d'efficacité hors-ligne)</div>
            </div>
            <button
              onClick={onClose}
              className="w-full rounded-xl py-3 font-display tracking-widest uppercase text-sm cursor-pointer"
              style={{
                background: "linear-gradient(135deg, var(--blue-electric), var(--violet-neon))",
                color: "oklch(0.08 0.02 280)",
                boxShadow: "var(--shadow-neon)",
              }}
            >
              Récolter
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface SummaryProps {
  open: boolean;
  state: GameState;
  startTime: number;
  achievements: string[];
  onClose: () => void;
  onExport: () => void;
  onImport: (raw: string) => void;
  onReset: () => void;
}

export function SummaryModal({
  open,
  state,
  startTime,
  achievements,
  onClose,
  onExport,
  onImport,
  onReset,
}: SummaryProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const cps = useMemo(() => computeCps(state), [state]);
  const clickPower = useMemo(() => computeClickPower(state), [state]);
  const playSec = Math.max(1, (Date.now() - startTime) / 1000);
  const playH = Math.floor(playSec / 3600);
  const playM = Math.floor((playSec % 3600) / 60);
  const ownedModules = UPGRADES.filter((u) => state.upgrades[u.id] > 0).length;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-panel rounded-2xl p-6 max-w-lg w-full max-h-[85vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-[10px] tracking-[0.4em] uppercase text-violet-neon/80 font-display">
                  Codex du voyageur
                </div>
                <h3 className="font-display text-2xl neon-text">Résumé de l'univers</h3>
              </div>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground cursor-pointer text-xl leading-none"
                aria-label="Fermer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-5">
              <StatTile label="Matière actuelle" value={formatNumber(state.matter)} accent="violet" />
              <StatTile label="Production" value={`${formatNumber(cps)}/s`} accent="blue" />
              <StatTile label="Puissance clic" value={`+${formatNumber(clickPower)}`} accent="gold" />
              <StatTile label="Clics totaux" value={formatNumber(state.clicks)} accent="violet" />
              <StatTile label="Matière (cycle)" value={formatNumber(state.totalMatter)} accent="blue" />
              <StatTile label="Matière (totale)" value={formatNumber(state.totalMatterAllTime)} accent="gold" />
              <StatTile label="Ascensions" value={`${state.prestigeCount}`} accent="gold" />
              <StatTile label="Éclats" value={`✦ ${formatNumber(state.shards)}`} accent="gold" />
              <StatTile label="Modules" value={`${ownedModules}/${UPGRADES.length}`} accent="violet" />
              <StatTile label="Temps de jeu" value={`${playH}h ${playM}m`} accent="blue" />
            </div>

            <div className="mb-5">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                Succès débloqués · {achievements.length}
              </div>
              {achievements.length === 0 ? (
                <div className="text-xs text-muted-foreground italic">Aucun succès débloqué pour l'instant.</div>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {achievements.map((a) => (
                    <span
                      key={a}
                      className="text-[10px] px-2 py-1 rounded-md border border-gold-celestial/40 bg-gold-celestial/10 gold-text"
                    >
                      ✦ {a}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="mb-3">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Sauvegarde</div>
              <div className="grid grid-cols-3 gap-2">
                <SaveBtn onClick={onExport}>Exporter</SaveBtn>
                <SaveBtn onClick={() => fileRef.current?.click()}>Importer</SaveBtn>
                <SaveBtn onClick={onReset} danger>Réinit.</SaveBtn>
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="application/json,.json,.txt"
                className="hidden"
                onChange={async (e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  const txt = await f.text();
                  onImport(txt);
                  e.target.value = "";
                }}
              />
              <div className="text-[10px] text-muted-foreground mt-2">
                Exporte ta progression en fichier JSON. L'import remplace l'univers en cours.
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function StatTile({ label, value, accent }: { label: string; value: string; accent: "violet" | "blue" | "gold" }) {
  const cls = accent === "violet" ? "text-violet-neon" : accent === "blue" ? "text-blue-electric" : "gold-text";
  return (
    <div className="rounded-xl border border-border/40 bg-card/30 px-3 py-2">
      <div className="text-[9px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className={`font-display font-mono text-sm mt-0.5 ${cls}`}>{value}</div>
    </div>
  );
}

function SaveBtn({ children, onClick, danger }: { children: React.ReactNode; onClick: () => void; danger?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl py-2 text-xs font-display tracking-widest uppercase cursor-pointer border transition-colors ${
        danger
          ? "border-destructive/50 text-destructive hover:bg-destructive/10"
          : "border-violet-neon/40 text-violet-neon hover:bg-violet-neon/10"
      }`}
    >
      {children}
    </button>
  );
}
