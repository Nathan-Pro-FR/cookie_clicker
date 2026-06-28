import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast, Toaster } from "sonner";
import { Singularity } from "@/components/Singularity";
import { Shop } from "@/components/Shop";
import { Prestige } from "@/components/Prestige";
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

function GamePage() {
  const [state, setState] = useState<GameState>(INITIAL_STATE);
  const [hydrated, setHydrated] = useState(false);
  const stateRef = useRef(state);
  stateRef.current = state;
  const achievementsRef = useRef<Set<string>>(new Set());

  // Hydrate from localStorage on mount (client-only)
  useEffect(() => {
    const loaded = loadState();
    // Offline progress
    const elapsed = Math.min(60 * 60 * 4, (Date.now() - (loaded.lastSave || Date.now())) / 1000);
    if (elapsed > 10) {
      const cps = computeCps(loaded);
      const gain = cps * elapsed * 0.5;
      if (gain > 0) {
        loaded.matter += gain;
        loaded.totalMatter += gain;
        loaded.totalMatterAllTime += gain;
        setTimeout(() => {
          toast(`Récolte hors-ligne : +${formatNumber(gain)} matière`, {
            description: `Pendant votre absence (${Math.floor(elapsed / 60)} min, 50% efficacité)`,
          });
        }, 600);
      }
    }
    setState(loaded);
    setHydrated(true);
  }, []);

  // Game tick
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

  // Autosave every 5s
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
    const ach = achievementsRef.current;
    const milestones: Array<[string, boolean, string, string]> = [
      ["first-click", state.clicks >= 1, "Premier Contact", "Vous avez touché l'inconnu."],
      ["thousand", state.totalMatterAllTime >= 1_000, "Poussière d'Étoiles", "1K de matière noire."],
      ["million", state.totalMatterAllTime >= 1_000_000, "Singularité Stable", "1M atteint — ascension disponible."],
      ["billion", state.totalMatterAllTime >= 1_000_000_000, "Maître du Cosmos", "1B de matière."],
      ["first-prestige", state.prestigeCount >= 1, "Big Bang", "Votre premier univers réinitialisé."],
      ["five-prestige", state.prestigeCount >= 5, "Multivers", "Cinq ascensions accomplies."],
    ];
    for (const [id, ok, name, desc] of milestones) {
      if (ok && !ach.has(id)) {
        ach.add(id);
        toast(`✦ ${name}`, { description: desc });
      }
    }
  }, [state.clicks, state.totalMatterAllTime, state.prestigeCount]);

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
      toast(`✦ Big Bang — +${pending} Éclats Cosmiques`, {
        description: "Un nouvel univers commence.",
      });
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
    setState(INITIAL_STATE);
    achievementsRef.current = new Set();
    toast("Univers réinitialisé.");
  }, []);

  const cps = computeCps(state);
  const clickPower = computeClickPower(state);

  return (
    <main className="min-h-screen w-full px-4 py-6 lg:px-8">
      <Toaster
        position="top-right"
        theme="dark"
        toastOptions={{
          className: "!glass-panel !text-foreground !border-violet-neon/40",
        }}
      />

      {/* Header */}
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
        </div>
      </header>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr_1fr] gap-4 lg:gap-6 lg:h-[calc(100vh-180px)]">
        {/* Left: Prestige */}
        <section className="order-2 lg:order-1 lg:min-h-0">
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

        {/* Right: Shop */}
        <section className="order-3 lg:min-h-0">
          <Shop state={state} onBuy={onBuy} />
        </section>
      </div>

      <footer className="mt-6 flex items-center justify-between text-[10px] uppercase tracking-widest text-muted-foreground">
        <span>Sauvegarde automatique · LocalStorage</span>
        <button
          onClick={onHardReset}
          className="hover:text-destructive transition-colors cursor-pointer"
        >
          Réinitialiser l'univers
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
