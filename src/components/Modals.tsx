import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import {
  NUM_SLOTS,
  UPGRADES,
  computeCps,
  computeClickPower,
  cpsBreakdown,
  formatNumber,
  type CpsContribution,
  type GameState,
  type SavePayload,
} from "@/lib/game";

// ─── Offline Modal ──────────────────────────────────────────────────────

interface OfflineProps {
  open: boolean;
  gain: number;
  seconds: number;
  breakdown: CpsContribution[];
  totalCps: number;
  onClose: () => void;
}

export function OfflineModal({ open, gain, seconds, breakdown, totalCps, onClose }: OfflineProps) {
  const mins = Math.floor(seconds / 60);
  const hrs = Math.floor(mins / 60);
  const human = hrs > 0 ? `${hrs}h ${mins % 60}m` : mins > 0 ? `${mins}m ${Math.floor(seconds % 60)}s` : `${Math.floor(seconds)}s`;
  const efficiency = 0.5;

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
            className="glass-panel rounded-2xl p-6 max-w-md w-full text-center max-h-[85vh] overflow-y-auto"
            style={{ boxShadow: "var(--shadow-neon)" }}
          >
            <div className="text-[10px] tracking-[0.4em] uppercase text-violet-neon/80 font-display mb-2">
              Bon retour, voyageur
            </div>
            <h3 className="font-display text-2xl neon-text mb-3">Récolte hors-ligne</h3>

            <div className="text-5xl my-3">🌌</div>
            <div className="font-display text-4xl gold-text mb-1">+{formatNumber(gain)}</div>
            <div className="text-xs text-muted-foreground mb-1">matière noire accumulée</div>

            <div className="grid grid-cols-3 gap-2 mt-4 mb-4 text-left">
              <MiniStat label="Durée" value={human} />
              <MiniStat label="CPS" value={`${formatNumber(totalCps)}/s`} />
              <MiniStat label="Efficacité" value={`${(efficiency * 100).toFixed(0)}%`} />
            </div>

            {breakdown.length > 0 && (
              <div className="text-left mb-5">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                  Décomposition par module
                </div>
                <div className="space-y-1.5">
                  {breakdown.map((b) => {
                    const part = b.share * gain;
                    return (
                      <div key={b.id} className="rounded-lg border border-border/40 bg-card/30 px-2.5 py-1.5">
                        <div className="flex items-center justify-between gap-2 text-xs">
                          <span className="truncate flex items-center gap-1.5">
                            <span>{b.icon}</span>
                            <span className="truncate">{b.name}</span>
                            <span className="text-muted-foreground font-mono">×{b.count}</span>
                          </span>
                          <span className="gold-text font-mono shrink-0">+{formatNumber(part)}</span>
                        </div>
                        <div className="h-1 mt-1 rounded-full bg-secondary overflow-hidden">
                          <div
                            className="h-full"
                            style={{
                              width: `${b.share * 100}%`,
                              background: "linear-gradient(90deg, var(--blue-electric), var(--violet-neon))",
                            }}
                          />
                        </div>
                        <div className="text-[9px] text-muted-foreground font-mono mt-0.5">
                          {formatNumber(b.cps)}/s · {(b.share * 100).toFixed(1)}%
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

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

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border/40 bg-card/30 px-2 py-1.5">
      <div className="text-[9px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="font-display font-mono text-xs mt-0.5 text-violet-neon truncate">{value}</div>
    </div>
  );
}

// ─── Summary / Codex Modal ──────────────────────────────────────────────

export interface AchievementMeta {
  id: string;
  name: string;
  description: string;
  current: number;
  target: number;
  unlocked: boolean;
  unlockedAt?: number;
}

interface SummaryProps {
  open: boolean;
  state: GameState;
  startTime: number;
  achievementsMeta: AchievementMeta[];
  slots: { index: number; payload: SavePayload | null }[];
  backup: SavePayload | null;
  onClose: () => void;
  onExport: () => void;
  onImport: (raw: string) => void;
  onReset: () => void;
  onSaveSlot: (i: number) => void;
  onLoadSlot: (i: number) => void;
  onDeleteSlot: (i: number) => void;
  onExportSlot: (i: number) => void;
  onRestoreBackup: () => void;
}

type Tab = "stats" | "achievements" | "saves";

export function SummaryModal({
  open,
  state,
  startTime,
  achievementsMeta,
  slots,
  backup,
  onClose,
  onExport,
  onImport,
  onReset,
  onSaveSlot,
  onLoadSlot,
  onDeleteSlot,
  onExportSlot,
  onRestoreBackup,
}: SummaryProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [tab, setTab] = useState<Tab>("stats");
  const cps = useMemo(() => computeCps(state), [state]);
  const clickPower = useMemo(() => computeClickPower(state), [state]);
  const playSec = Math.max(1, (Date.now() - startTime) / 1000);
  const playH = Math.floor(playSec / 3600);
  const playM = Math.floor((playSec % 3600) / 60);
  const ownedModules = UPGRADES.filter((u) => state.upgrades[u.id] > 0).length;
  const unlockedCount = achievementsMeta.filter((a) => a.unlocked).length;

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
            className="glass-panel rounded-2xl p-6 max-w-2xl w-full max-h-[88vh] overflow-y-auto"
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

            <div className="flex gap-1 mb-4 border-b border-border/40">
              <TabBtn active={tab === "stats"} onClick={() => setTab("stats")}>Stats</TabBtn>
              <TabBtn active={tab === "achievements"} onClick={() => setTab("achievements")}>
                Succès <span className="opacity-60">{unlockedCount}/{achievementsMeta.length}</span>
              </TabBtn>
              <TabBtn active={tab === "saves"} onClick={() => setTab("saves")}>Sauvegardes</TabBtn>
            </div>

            {tab === "stats" && (
              <div className="grid grid-cols-2 gap-2 mb-2">
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
            )}

            {tab === "achievements" && (
              <AchievementsTimeline items={achievementsMeta} />
            )}

            {tab === "saves" && (
              <div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                  Emplacements · {NUM_SLOTS} slots versionnés
                </div>
                <div className="space-y-2 mb-4">
                  {slots.map((s) => (
                    <SlotRow
                      key={s.index}
                      slot={s}
                      onSave={() => onSaveSlot(s.index)}
                      onLoad={() => onLoadSlot(s.index)}
                      onDelete={() => onDeleteSlot(s.index)}
                      onExport={() => onExportSlot(s.index)}
                    />
                  ))}
                </div>

                <div className="rounded-xl border border-blue-electric/30 bg-blue-electric/5 p-3 mb-4">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-blue-electric">Restauration</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {backup
                          ? `Snapshot pré-action du ${new Date(backup.savedAt).toLocaleString()}`
                          : "Aucun snapshot disponible pour l'instant."}
                      </div>
                    </div>
                    <button
                      disabled={!backup}
                      onClick={onRestoreBackup}
                      className={`shrink-0 rounded-lg px-3 py-1.5 text-[10px] font-display tracking-widest uppercase border ${
                        backup
                          ? "border-blue-electric/50 text-blue-electric hover:bg-blue-electric/10 cursor-pointer"
                          : "border-border/30 text-muted-foreground opacity-50 cursor-not-allowed"
                      }`}
                    >
                      Restaurer
                    </button>
                  </div>
                </div>

                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                  Import / Export global
                </div>
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
                  Un snapshot automatique est créé avant chaque import, chargement de slot ou réinitialisation.
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TabBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 text-[11px] uppercase tracking-widest font-display cursor-pointer border-b-2 transition-colors ${
        active ? "border-violet-neon text-violet-neon" : "border-transparent text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function AchievementsTimeline({ items }: { items: AchievementMeta[] }) {
  const unlocked = items.filter((a) => a.unlocked).sort((a, b) => (b.unlockedAt ?? 0) - (a.unlockedAt ?? 0));
  const locked = items
    .filter((a) => !a.unlocked)
    .sort((a, b) => b.current / b.target - a.current / a.target);

  return (
    <div className="space-y-5">
      <div>
        <div className="text-[10px] uppercase tracking-widest text-gold-celestial mb-2">
          Débloqués · {unlocked.length}
        </div>
        {unlocked.length === 0 ? (
          <div className="text-xs text-muted-foreground italic">Aucun succès débloqué pour l'instant.</div>
        ) : (
          <ol className="relative border-l border-gold-celestial/30 ml-2 space-y-2.5">
            {unlocked.map((a) => (
              <li key={a.id} className="ml-4">
                <span className="absolute -left-[5px] mt-1.5 w-2.5 h-2.5 rounded-full bg-gold-celestial shadow-[0_0_8px_var(--gold-celestial)]" />
                <div className="rounded-lg border border-gold-celestial/30 bg-gold-celestial/5 p-2.5">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-display text-sm gold-text">✦ {a.name}</span>
                    <span className="text-[10px] font-mono text-muted-foreground shrink-0">
                      {a.unlockedAt ? new Date(a.unlockedAt).toLocaleString() : "—"}
                    </span>
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">{a.description}</div>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>

      <div>
        <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
          À venir · {locked.length}
        </div>
        {locked.length === 0 ? (
          <div className="text-xs gold-text italic">Tout l'univers a été conquis. ✦</div>
        ) : (
          <div className="space-y-2">
            {locked.map((a) => {
              const pct = Math.min(1, a.target > 0 ? a.current / a.target : 0);
              return (
                <div key={a.id} className="rounded-lg border border-border/40 bg-card/30 p-2.5">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-display text-sm">{a.name}</span>
                    <span className="text-[10px] font-mono text-muted-foreground shrink-0">
                      {formatNumber(a.current)} / {formatNumber(a.target)}
                    </span>
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-0.5 mb-1.5">{a.description}</div>
                  <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${pct * 100}%`,
                        background: "linear-gradient(90deg, var(--blue-electric), var(--violet-neon))",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function SlotRow({
  slot,
  onSave,
  onLoad,
  onDelete,
  onExport,
}: {
  slot: { index: number; payload: SavePayload | null };
  onSave: () => void;
  onLoad: () => void;
  onDelete: () => void;
  onExport: () => void;
}) {
  const p = slot.payload;
  return (
    <div className="rounded-xl border border-violet-neon/30 bg-violet-neon/5 p-3">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="min-w-0">
          <div className="font-display text-sm text-violet-neon">Slot {slot.index + 1}</div>
          {p ? (
            <div className="text-[10px] text-muted-foreground mt-0.5">
              v{p.version} · {new Date(p.savedAt).toLocaleString()}
              <br />
              <span className="font-mono">
                {formatNumber(p.state.totalMatterAllTime)} matière · ✦ {p.state.shards} · #{p.state.prestigeCount}
              </span>
            </div>
          ) : (
            <div className="text-[10px] text-muted-foreground italic mt-0.5">Vide</div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        <SlotBtn onClick={onSave}>Écraser</SlotBtn>
        <SlotBtn onClick={onLoad} disabled={!p}>Charger</SlotBtn>
        <SlotBtn onClick={onExport} disabled={!p}>.json</SlotBtn>
        <SlotBtn onClick={onDelete} disabled={!p} danger>Vider</SlotBtn>
      </div>
    </div>
  );
}

function SlotBtn({
  children,
  onClick,
  disabled,
  danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`rounded-md py-1.5 text-[10px] font-display tracking-widest uppercase border transition-colors ${
        disabled
          ? "border-border/30 text-muted-foreground opacity-50 cursor-not-allowed"
          : danger
            ? "border-destructive/50 text-destructive hover:bg-destructive/10 cursor-pointer"
            : "border-violet-neon/40 text-violet-neon hover:bg-violet-neon/10 cursor-pointer"
      }`}
    >
      {children}
    </button>
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
