import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast, Toaster } from "sonner";
import { Singularity } from "@/components/Singularity";
import { Shop } from "@/components/Shop";
import { Prestige } from "@/components/Prestige";
import { OfflineModal, SummaryModal } from "@/components/Modals";
import {
  INITIAL_STATE,
  PRESTIGE_UPGRADES,
  UPGRADES,
  computeClickPower,
  computeCps,
  costOf,
  formatNumber,
  loadState,
  resetSave,
  saveState,
  shardsAvailable,
  type GameState,
  type PrestigeUpgradeId,
  type UpgradeId,
} from "@/lib/game";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cosmic Singularity — Extracteur de Matière Noire" },
      { name: "description", content: "Jeu incrémental cosmique : extrayez la matière noire d'une singularité quantique, ascensionnez, transcendez le Big Bang." },
      { property: "og:title", content: "Cosmic Singularity" },
      { property: "og:description", content: "Idle game sci-fi : pressez la singularité, déclenchez le Big Bang, collectez des Éclats Cosmiques." },
    ],
  }),
  component: GamePage,
});

interface Achievement {
  id: string;
  name: string;
  description: string;
  check: (s: GameState) => boolean;
}

const ACHIEVEMENTS: Achievement[] = [
  { id: "first-click", name: "Premier Contact", description: "Vous avez touché l'inconnu.", check: (s) => s.clicks >= 1 },
  { id: "hundred-clicks", name: "Doigt Quantique", description: "100 interactions.", check: (s) => s.clicks >= 100 },
  { id: "thousand-clicks", name: "Frénésie Tachyonique", description: "1 000 clics.", check: (s) => s.clicks >= 1_000 },
  { id: "thousand", name: "Poussière d'Étoiles", description: "1K de matière noire.", check: (s) => s.totalMatterAllTime >= 1_000 },
  { id: "ten-k", name: "Nuage Moléculaire", description: "10K accumulés.", check: (s) => s.totalMatterAllTime >= 10_000 },
  { id: "hundred-k", name: "Nébuleuse", description: "100K accumulés.", check: (s) => s.totalMatterAllTime >= 100_000 },
  { id: "million", name: "Singularité Stable", description: "1M — ascension disponible.", check: (s) => s.totalMatterAllTime >= 1_000_000 },
  { id: "billion", name: "Maître du Cosmos", description: "1B de matière.", check: (s) => s.totalMatterAllTime >= 1_000_000_000 },
  { id: "trillion", name: "Architecte Galactique", description: "1T de matière.", check: (s) => s.totalMatterAllTime >= 1_000_000_000_000 },
  { id: "first-prestige", name: "Big Bang", description: "Premier univers réinitialisé.", check: (s) => s.prestigeCount >= 1 },
  { id: "five-prestige", name: "Multivers", description: "Cinq ascensions accomplies.", check: (s) => s.prestigeCount >= 5 },
  { id: "ten-prestige", name: "Maître du Temps", description: "Dix ascensions.", check: (s) => s.prestigeCount >= 10 },
  { id: "shards-10", name: "Collectionneur", description: "10 éclats cosmiques détenus.", check: (s) => s.shards >= 10 },
  { id: "shards-100", name: "Gardien des Éclats", description: "100 éclats détenus.", check: (s) => s.shards >= 100 },
  { id: "all-modules", name: "Collection Complète", description: "Tous les modules débloqués.", check: (s) => UPGRADES.every((u) => s.upgrades[u.id] > 0) },
  { id: "module-50", name: "Industrialisation", description: "50 exemplaires d'un même module.", check: (s) => UPGRADES.some((u) => s.upgrades[u.id] >= 50) },
  { id: "all-prestige", name: "Arbre Achevé", description: "Tout l'arbre temporel acquis.", check: (s) => PRESTIGE_UPGRADES.every((p) => s.prestigeUpgrades.includes(p.id)) },
];

const ACH_KEY = "cosmic-singularity-achievements-v1";
const START_KEY = "cosmic-singularity-start-v1";

function GamePage() {
  const [state, setState] = useState<GameState>(INITIAL_STATE);
  const [hydrated, setHydrated] = useState(false);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [offline, setOffline] = useState<{ gain: number; seconds: number } | null>(null);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const stateRef = useRef(state);
  stateRef.current = state;
  const achRef = useRef<Set<string>>(new Set());

  // Hydrate
  useEffect(() => {
    const loaded = loadState();
    const elapsed = Math.min(60 * 60 * 4, (Date.now() - (loaded.lastSave || Date.now())) / 1000);
    if (elapsed > 10) {
      const cps = computeCps(loaded);
      const gain = cps * elapsed * 0.5;
      if (gain > 0) {
        loaded.matter += gain;
        loaded.totalMatter += gain;
        loaded.totalMatterAllTime += gain;
        setOffline({ gain, seconds: elapsed });
      }
    }
    try {
      const rawAch = localStorage.getItem(ACH_KEY);
      if (rawAch) {
        const arr = JSON.parse(rawAch) as string[];
        achRef.current = new Set(arr);
        setAchievements(arr);
      }
      const rawStart = localStorage.getItem(START_KEY);
      if (rawStart) setStartTime(parseInt(rawStart, 10));
      else {
        const now = Date.now();
        localStorage.setItem(START_KEY, String(now));
        setStartTime(now);
      }
    } catch {
      /* ignore */
    }
    setState(loaded);
    setHydrated(true);
  }, []);

  // Tick
  useEffect(() => {
    if (!hydrated) return;
    const tickMs = 100;
    const id = setInterval(() => {
      setState((s) => {
        const cps = computeCps(s);
        const gain = (cps * tickMs) / 1000;
        if (gain <= 0) return s;
        return {
          ...s,
          matter: s.matter + gain,
          totalMatter: s.totalMatter + gain,
          totalMatterAllTime: s.totalMatterAllTime + gain,
        };
      });
    }, tickMs);
    return () => clearInterval(id);
  }, [hydrated]);

  // Autosave
  useEffect(() => {
    if (!hydrated) return;
    const id = setInterval(() => saveState(stateRef.current), 5000);
    const onUnload = () => saveState(stateRef.current);
    window.addEventListener("beforeunload", onUnload);
    return () => {
      clearInterval(id);
      window.removeEventListener("beforeunload", onUnload);
    };
  }, [hydrated]);

  // Achievements
  useEffect(() => {
    if (!hydrated) return;
    let changed = false;
    for (const a of ACHIEVEMENTS) {
      if (!achRef.current.has(a.id) && a.check(state)) {
        achRef.current.add(a.id);
        toast(`✦ ${a.name}`, { description: a.description });
        changed = true;
      }
    }
    if (changed) {
      const arr = Array.from(achRef.current);
      setAchievements(arr);
      try { localStorage.setItem(ACH_KEY, JSON.stringify(arr)); } catch { /* ignore */ }
    }
  }, [state, hydrated]);

  const onClick = useCallback(() => {
    const power = computeClickPower(stateRef.current);
    setState((s) => ({
      ...s,
      matter: s.matter + power,
      totalMatter: s.totalMatter + power,
      totalMatterAllTime: s.totalMatterAllTime + power,
      clicks: s.clicks + 1,
    }));
    return power;
  }, []);

  const onBuy = useCallback((id: UpgradeId) => {
    setState((s) => {
      const def = UPGRADES.find((u) => u.id === id)!;
      const cost = costOf(def, s.upgrades[id]);
      if (s.matter < cost) return s;
      return {
        ...s,
        matter: s.matter - cost,
        upgrades: { ...s.upgrades, [id]: s.upgrades[id] + 1 },
      };
    });
  }, []);

  const onAscend = useCallback(() => {
    setState((s) => {
      const pending = shardsAvailable(s.totalMatterAllTime, s.prestigeUpgrades);
      if (pending <= 0) return s;
      toast(`✦ Big Bang — +${pending} Éclats Cosmiques`, { description: "Un nouvel univers commence." });
      return {
        ...INITIAL_STATE,
        shards: s.shards + pending,
        prestigeUpgrades: s.prestigeUpgrades,
        prestigeCount: s.prestigeCount + 1,
        totalMatterAllTime: 0,
      };
    });
  }, []);

  const onBuyPrestige = useCallback((id: PrestigeUpgradeId) => {
    setState((s) => {
      if (s.prestigeUpgrades.includes(id)) return s;
      const def = PRESTIGE_UPGRADES.find((p) => p.id === id)!;
      if (s.shards < def.cost) return s;
      return {
        ...s,
        shards: s.shards - def.cost,
        prestigeUpgrades: [...s.prestigeUpgrades, id],
      };
    });
  }, []);

  const onHardReset = useCallback(() => {
    if (typeof window === "undefined") return;
    if (!window.confirm("Effacer toute progression et redémarrer ? Cette action est irréversible.")) return;
    resetSave();
    try {
      localStorage.removeItem(ACH_KEY);
      localStorage.removeItem(START_KEY);
    } catch { /* ignore */ }
    achRef.current = new Set();
    setAchievements([]);
    const now = Date.now();
    setStartTime(now);
    try { localStorage.setItem(START_KEY, String(now)); } catch { /* ignore */ }
    setState(INITIAL_STATE);
    setSummaryOpen(false);
    toast("Univers réinitialisé.");
  }, []);

  const onExport = useCallback(() => {
    try {
      saveState(stateRef.current);
      const payload = {
        version: 1,
        state: stateRef.current,
        achievements: Array.from(achRef.current),
        startTime,
        exportedAt: Date.now(),
      };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
      a.href = url;
      a.download = `cosmic-singularity-save-${stamp}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast("Sauvegarde exportée.");
    } catch {
      toast("Échec de l'export.");
    }
  }, [startTime]);

  const onImport = useCallback((raw: string) => {
    try {
      const parsed = JSON.parse(raw);
      const incoming: GameState | undefined = parsed?.state ?? parsed;
      if (!incoming || typeof incoming !== "object" || typeof (incoming as GameState).matter !== "number") {
        toast("Fichier invalide.");
        return;
      }
      const merged: GameState = {
        ...INITIAL_STATE,
        ...(incoming as GameState),
        upgrades: { ...INITIAL_STATE.upgrades, ...((incoming as GameState).upgrades ?? {}) },
        prestigeUpgrades: (incoming as GameState).prestigeUpgrades ?? [],
      };
      const ach: string[] = Array.isArray(parsed?.achievements) ? parsed.achievements : [];
      achRef.current = new Set(ach);
      setAchievements(ach);
      try {
        localStorage.setItem(ACH_KEY, JSON.stringify(ach));
        if (parsed?.startTime) {
          localStorage.setItem(START_KEY, String(parsed.startTime));
          setStartTime(parsed.startTime);
        }
      } catch { /* ignore */ }
      setState(merged);
      saveState(merged);
      toast("Sauvegarde importée.");
      setSummaryOpen(false);
    } catch {
      toast("Impossible de lire le fichier.");
    }
  }, []);

  const cps = computeCps(state);
  const clickPower = computeClickPower(state);

  return (
    <main className="min-h-screen w-full px-4 py-6 lg:px-8">
      <Toaster
        position="top-right"
        theme="dark"
        toastOptions={{ className: "!glass-panel !text-foreground !border-violet-neon/40" }}
      />

      <OfflineModal
        open={!!offline}
        gain={offline?.gain ?? 0}
        seconds={offline?.seconds ?? 0}
        onClose={() => setOffline(null)}
      />
      <SummaryModal
        open={summaryOpen}
        state={state}
        startTime={startTime}
        achievements={achievements}
        onClose={() => setSummaryOpen(false)}
        onExport={onExport}
        onImport={onImport}
        onReset={onHardReset}
      />

      <header className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <div className="text-[10px] tracking-[0.4em] uppercase text-violet-neon/80 font-display">Cosmic Singularity</div>
          <h1 className="text-2xl lg:text-3xl font-display tracking-wide neon-text">
            Extracteur de Matière Noire
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Stat label="Matière" value={formatNumber(state.matter)} accent="violet" big />
          <Stat label="Production" value={`${formatNumber(cps)}/s`} accent="blue" />
          <Stat label="Clic" value={`+${formatNumber(clickPower)}`} accent="gold" />
          <Stat label="Éclats" value={`✦ ${formatNumber(state.shards)}`} accent="gold" />
          <button
            onClick={() => setSummaryOpen(true)}
            className="glass-panel rounded-xl px-3 py-2 cursor-pointer hover:bg-violet-neon/10 transition-colors"
            title="Résumé & sauvegarde"
            aria-label="Ouvrir le résumé"
          >
            <div className="text-[9px] uppercase tracking-widest text-muted-foreground">Codex</div>
            <div className="font-display text-base text-violet-neon">✦ {achievements.length}</div>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr_1fr] gap-4 lg:gap-6 lg:h-[calc(100vh-180px)]">
        {/* Left col (desktop): Prestige — Mobile: last */}
        <section className="order-3 lg:order-1 lg:min-h-0">
          <Prestige state={state} onAscend={onAscend} onBuyPrestige={onBuyPrestige} />
        </section>

        {/* Center: Singularity */}
        <section className="order-1 lg:order-2 flex flex-col items-center justify-center gap-4 glass-panel rounded-2xl py-8">
          <Singularity onClick={onClick} cps={cps} />
          <div className="text-center">
            <div className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Matière Noire Totale</div>
            <div className="font-display text-3xl lg:text-4xl mt-1 neon-text">{formatNumber(state.matter)}</div>
            <div className="text-xs text-muted-foreground font-mono mt-1">
              {formatNumber(cps)}/s · {state.clicks} interactions
            </div>
          </div>
        </section>

        {/* Right col (desktop): Shop — Mobile: directly under singularity */}
        <section className="order-2 lg:order-3 lg:min-h-0">
          <Shop state={state} onBuy={onBuy} />
        </section>
      </div>

      <footer className="mt-6 flex items-center justify-between text-[10px] uppercase tracking-widest text-muted-foreground">
        <span>Sauvegarde automatique · LocalStorage</span>
        <button
          onClick={() => setSummaryOpen(true)}
          className="hover:text-violet-neon transition-colors cursor-pointer"
        >
          Codex & sauvegardes
        </button>
      </footer>
    </main>
  );
}

function Stat({ label, value, accent, big }: { label: string; value: string; accent: "violet" | "blue" | "gold"; big?: boolean }) {
  const cls =
    accent === "violet" ? "text-violet-neon" : accent === "blue" ? "text-blue-electric" : "gold-text";
  return (
    <div className="glass-panel rounded-xl px-3 py-2 min-w-[110px]">
      <div className="text-[9px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className={`font-display font-mono ${cls} ${big ? "text-xl" : "text-base"}`}>{value}</div>
    </div>
  );
}
