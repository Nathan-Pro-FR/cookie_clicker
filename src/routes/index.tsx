import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast, Toaster } from "sonner";
import { Singularity } from "@/components/Singularity";
import { Shop } from "@/components/Shop";
import { Prestige } from "@/components/Prestige";
import { OfflineModal, SummaryModal, type AchievementMeta } from "@/components/Modals";
import {
  INITIAL_STATE,
  NUM_SLOTS,
  PRESTIGE_UPGRADES,
  SAVE_VERSION,
  UPGRADES,
  computeClickPower,
  computeCps,
  cpsBreakdown,
  costOf,
  deleteSlot,
  formatNumber,
  listSlots,
  loadState,
  normalizePayload,
  readBackup,
  readSlot,
  resetSave,
  saveState,
  shardsAvailable,
  snapshotBackup,
  writeSlot,
  type CpsContribution,
  type GameState,
  type PrestigeUpgradeId,
  type SavePayload,
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
  current: (s: GameState) => number;
  target: number;
}

const ACHIEVEMENTS: Achievement[] = [
  { id: "first-click", name: "Premier Contact", description: "Vous avez touché l'inconnu.", current: (s) => s.clicks, target: 1 },
  { id: "hundred-clicks", name: "Doigt Quantique", description: "100 interactions.", current: (s) => s.clicks, target: 100 },
  { id: "thousand-clicks", name: "Frénésie Tachyonique", description: "1 000 clics.", current: (s) => s.clicks, target: 1_000 },
  { id: "thousand", name: "Poussière d'Étoiles", description: "1K de matière noire.", current: (s) => s.totalMatterAllTime, target: 1_000 },
  { id: "ten-k", name: "Nuage Moléculaire", description: "10K accumulés.", current: (s) => s.totalMatterAllTime, target: 10_000 },
  { id: "hundred-k", name: "Nébuleuse", description: "100K accumulés.", current: (s) => s.totalMatterAllTime, target: 100_000 },
  { id: "million", name: "Singularité Stable", description: "1M — ascension disponible.", current: (s) => s.totalMatterAllTime, target: 1_000_000 },
  { id: "billion", name: "Maître du Cosmos", description: "1B de matière.", current: (s) => s.totalMatterAllTime, target: 1_000_000_000 },
  { id: "trillion", name: "Architecte Galactique", description: "1T de matière.", current: (s) => s.totalMatterAllTime, target: 1_000_000_000_000 },
  { id: "first-prestige", name: "Big Bang", description: "Premier univers réinitialisé.", current: (s) => s.prestigeCount, target: 1 },
  { id: "five-prestige", name: "Multivers", description: "Cinq ascensions accomplies.", current: (s) => s.prestigeCount, target: 5 },
  { id: "ten-prestige", name: "Maître du Temps", description: "Dix ascensions.", current: (s) => s.prestigeCount, target: 10 },
  { id: "shards-10", name: "Collectionneur", description: "10 éclats cosmiques détenus.", current: (s) => s.shards, target: 10 },
  { id: "shards-100", name: "Gardien des Éclats", description: "100 éclats détenus.", current: (s) => s.shards, target: 100 },
  { id: "all-modules", name: "Collection Complète", description: "Tous les modules débloqués.", current: (s) => UPGRADES.filter((u) => s.upgrades[u.id] > 0).length, target: UPGRADES.length },
  { id: "module-50", name: "Industrialisation", description: "50 exemplaires d'un même module.", current: (s) => Math.max(0, ...UPGRADES.map((u) => s.upgrades[u.id])), target: 50 },
  { id: "all-prestige", name: "Arbre Achevé", description: "Tout l'arbre temporel acquis.", current: (s) => s.prestigeUpgrades.length, target: PRESTIGE_UPGRADES.length },
];

const ACH_KEY = "cosmic-singularity-achievements-v1";
const ACH_TS_KEY = "cosmic-singularity-achievements-ts-v1";
const START_KEY = "cosmic-singularity-start-v1";

function GamePage() {
  const [state, setState] = useState<GameState>(INITIAL_STATE);
  const [hydrated, setHydrated] = useState(false);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [achievementsTs, setAchievementsTs] = useState<Record<string, number>>({});
  const [offline, setOffline] = useState<{ gain: number; seconds: number; breakdown: CpsContribution[]; totalCps: number } | null>(null);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [slots, setSlots] = useState(() => (typeof window !== "undefined" ? listSlots() : []));
  const [backup, setBackup] = useState<SavePayload | null>(null);
  const stateRef = useRef(state);
  stateRef.current = state;
  const achRef = useRef<Set<string>>(new Set());
  const achTsRef = useRef<Record<string, number>>({});
  const startRef = useRef<number>(startTime);
  startRef.current = startTime;

  const refreshSlots = useCallback(() => {
    setSlots(listSlots());
    setBackup(readBackup());
  }, []);

  const currentPayload = useCallback((): Omit<SavePayload, "version" | "savedAt"> => ({
    state: stateRef.current,
    achievements: Array.from(achRef.current),
    achievementsTs: { ...achTsRef.current },
    startTime: startRef.current,
  }), []);

  const takeBackup = useCallback((label: string) => {
    snapshotBackup({ ...currentPayload(), label });
    setBackup(readBackup());
  }, [currentPayload]);

  // Hydrate
  useEffect(() => {
    const loaded = loadState();
    const elapsed = Math.min(60 * 60 * 4, (Date.now() - (loaded.lastSave || Date.now())) / 1000);
    if (elapsed > 10) {
      const totalCps = computeCps(loaded);
      const gain = totalCps * elapsed * 0.5;
      if (gain > 0) {
        const breakdown = cpsBreakdown(loaded);
        loaded.matter += gain;
        loaded.totalMatter += gain;
        loaded.totalMatterAllTime += gain;
        setOffline({ gain, seconds: elapsed, breakdown, totalCps });
      }
    }
    try {
      const rawAch = localStorage.getItem(ACH_KEY);
      if (rawAch) {
        const arr = JSON.parse(rawAch) as string[];
        achRef.current = new Set(arr);
        setAchievements(arr);
      }
      const rawTs = localStorage.getItem(ACH_TS_KEY);
      if (rawTs) {
        const obj = JSON.parse(rawTs) as Record<string, number>;
        achTsRef.current = obj;
        setAchievementsTs(obj);
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
    refreshSlots();
  }, [refreshSlots]);

  // Tick
  useEffect(() => {
    if (!hydrated) return;
    const tickMs = 100;
    const id = setInterval(() => {
      setState((s) => {
        const c = computeCps(s);
        const gain = (c * tickMs) / 1000;
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
    const now = Date.now();
    for (const a of ACHIEVEMENTS) {
      if (!achRef.current.has(a.id) && a.current(state) >= a.target) {
        achRef.current.add(a.id);
        achTsRef.current[a.id] = now;
        toast(`✦ ${a.name}`, { description: a.description });
        changed = true;
      }
    }
    if (changed) {
      const arr = Array.from(achRef.current);
      setAchievements(arr);
      setAchievementsTs({ ...achTsRef.current });
      try {
        localStorage.setItem(ACH_KEY, JSON.stringify(arr));
        localStorage.setItem(ACH_TS_KEY, JSON.stringify(achTsRef.current));
      } catch { /* ignore */ }
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

  // Ascension inversée : conserve modules, clics, prestige tree.
  // Seuls la matière du cycle est remise à zéro ; les éclats s'ajoutent.
  const onAscend = useCallback(() => {
    takeBackup("Avant ascension");
    setState((s) => {
      const pending = shardsAvailable(s.totalMatterAllTime, s.prestigeUpgrades);
      if (pending <= 0) return s;
      toast(`✦ Big Bang — +${pending} Éclats Cosmiques`, { description: "Modules conservés, cycle réinitialisé." });
      return {
        ...s,
        matter: 0,
        totalMatter: 0,
        totalMatterAllTime: 0,
        shards: s.shards + pending,
        prestigeCount: s.prestigeCount + 1,
        // upgrades, clicks, prestigeUpgrades, startTime conservés
      };
    });
  }, [takeBackup]);

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
    if (!window.confirm("Effacer toute progression (les slots restent intacts) ? Cette action est irréversible.")) return;
    takeBackup("Avant réinitialisation");
    resetSave();
    try {
      localStorage.removeItem(ACH_KEY);
      localStorage.removeItem(ACH_TS_KEY);
      localStorage.removeItem(START_KEY);
    } catch { /* ignore */ }
    achRef.current = new Set();
    achTsRef.current = {};
    setAchievements([]);
    setAchievementsTs({});
    const now = Date.now();
    setStartTime(now);
    try { localStorage.setItem(START_KEY, String(now)); } catch { /* ignore */ }
    setState(INITIAL_STATE);
    setSummaryOpen(false);
    toast("Univers réinitialisé.");
  }, [takeBackup]);

  const downloadPayload = useCallback((payload: SavePayload, suffix: string) => {
    try {
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const stamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
      a.href = url;
      a.download = `cosmic-singularity-${suffix}-${stamp}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast("Sauvegarde exportée.");
    } catch {
      toast("Échec de l'export.");
    }
  }, []);

  const onExport = useCallback(() => {
    saveState(stateRef.current);
    downloadPayload(
      { ...currentPayload(), version: SAVE_VERSION, savedAt: Date.now() },
      "save",
    );
  }, [currentPayload, downloadPayload]);

  const applyPayload = useCallback((p: SavePayload) => {
    achRef.current = new Set(p.achievements);
    achTsRef.current = { ...p.achievementsTs };
    setAchievements(p.achievements);
    setAchievementsTs(p.achievementsTs);
    setStartTime(p.startTime);
    setState(p.state);
    saveState(p.state);
    try {
      localStorage.setItem(ACH_KEY, JSON.stringify(p.achievements));
      localStorage.setItem(ACH_TS_KEY, JSON.stringify(p.achievementsTs));
      localStorage.setItem(START_KEY, String(p.startTime));
    } catch { /* ignore */ }
  }, []);

  const onImport = useCallback((raw: string) => {
    try {
      const parsed = JSON.parse(raw);
      const payload = normalizePayload(parsed);
      if (!payload) {
        toast("Fichier invalide.");
        return;
      }
      if (!window.confirm(`Importer cette sauvegarde (v${payload.version}, ${new Date(payload.savedAt).toLocaleString()}) ?\nUn snapshot de l'état actuel sera créé.`)) return;
      takeBackup("Avant import");
      applyPayload(payload);
      toast("Sauvegarde importée.");
      setSummaryOpen(false);
    } catch {
      toast("Impossible de lire le fichier.");
    }
  }, [applyPayload, takeBackup]);

  const onSaveSlot = useCallback((i: number) => {
    const existing = readSlot(i);
    if (existing && !window.confirm(`Écraser le Slot ${i + 1} ?`)) return;
    writeSlot(i, { ...currentPayload(), label: `Slot ${i + 1}` });
    refreshSlots();
    toast(`Sauvegardé dans le Slot ${i + 1}.`);
  }, [currentPayload, refreshSlots]);

  const onLoadSlot = useCallback((i: number) => {
    const p = readSlot(i);
    if (!p) return;
    if (!window.confirm(`Charger le Slot ${i + 1} ? Un snapshot de l'état actuel sera créé pour restauration.`)) return;
    takeBackup(`Avant chargement Slot ${i + 1}`);
    applyPayload(p);
    refreshSlots();
    toast(`Slot ${i + 1} chargé.`);
  }, [applyPayload, refreshSlots, takeBackup]);

  const onDeleteSlot = useCallback((i: number) => {
    if (!window.confirm(`Vider le Slot ${i + 1} ?`)) return;
    deleteSlot(i);
    refreshSlots();
  }, [refreshSlots]);

  const onExportSlot = useCallback((i: number) => {
    const p = readSlot(i);
    if (!p) return;
    downloadPayload(p, `slot-${i + 1}`);
  }, [downloadPayload]);

  const onRestoreBackup = useCallback(() => {
    const b = readBackup();
    if (!b) return;
    if (!window.confirm(`Restaurer le snapshot du ${new Date(b.savedAt).toLocaleString()} ?`)) return;
    applyPayload(b);
    toast("Snapshot restauré.");
  }, [applyPayload]);

  const cps = computeCps(state);
  const clickPower = computeClickPower(state);

  const achievementsMeta = useMemo<AchievementMeta[]>(
    () => ACHIEVEMENTS.map((a) => {
      const unlocked = achievements.includes(a.id);
      return {
        id: a.id,
        name: a.name,
        description: a.description,
        current: Math.min(a.target, a.current(state)),
        target: a.target,
        unlocked,
        unlockedAt: achievementsTs[a.id],
      };
    }),
    [state, achievements, achievementsTs],
  );

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
        breakdown={offline?.breakdown ?? []}
        totalCps={offline?.totalCps ?? 0}
        onClose={() => setOffline(null)}
      />
      <SummaryModal
        open={summaryOpen}
        state={state}
        startTime={startTime}
        achievementsMeta={achievementsMeta}
        slots={slots}
        backup={backup}
        onClose={() => setSummaryOpen(false)}
        onExport={onExport}
        onImport={onImport}
        onReset={onHardReset}
        onSaveSlot={onSaveSlot}
        onLoadSlot={onLoadSlot}
        onDeleteSlot={onDeleteSlot}
        onExportSlot={onExportSlot}
        onRestoreBackup={onRestoreBackup}
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
            onClick={() => { refreshSlots(); setSummaryOpen(true); }}
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
        <section className="order-3 lg:order-1 lg:min-h-0">
          <Prestige state={state} onAscend={onAscend} onBuyPrestige={onBuyPrestige} />
        </section>

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

        <section className="order-2 lg:order-3 lg:min-h-0">
          <Shop state={state} onBuy={onBuy} />
        </section>
      </div>

      <footer className="mt-6 flex items-center justify-between text-[10px] uppercase tracking-widest text-muted-foreground">
        <span>Sauvegarde auto · {NUM_SLOTS} slots disponibles</span>
        <button
          onClick={() => { refreshSlots(); setSummaryOpen(true); }}
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
