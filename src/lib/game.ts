export type UpgradeId =
  | "probe"
  | "harvester"
  | "stringMaster"
  | "blackHoleCondenser"
  | "quasarForge"
  | "galacticWeaver"
  | "dimensionRipper";

export interface UpgradeDef {
  id: UpgradeId;
  name: string;
  description: string;
  baseCost: number;
  baseCps: number;
  icon: string;
}

export const UPGRADES: UpgradeDef[] = [
  { id: "probe", name: "Sonde Orbitale", description: "Récolte passive de poussière stellaire.", baseCost: 15, baseCps: 0.2, icon: "📡" },
  { id: "harvester", name: "Moissonneur de Naines Blanches", description: "Aspire la matière des étoiles mortes.", baseCost: 100, baseCps: 1.2, icon: "⚪" },
  { id: "stringMaster", name: "Manipulateur de Cordes Cosmiques", description: "Vibre la structure même de l'espace.", baseCost: 1_100, baseCps: 8, icon: "🎼" },
  { id: "blackHoleCondenser", name: "Condensateur de Trous Noirs", description: "Compresse les singularités voisines.", baseCost: 12_000, baseCps: 47, icon: "🕳️" },
  { id: "quasarForge", name: "Forge à Quasars", description: "Convertit les jets de plasma en matière.", baseCost: 130_000, baseCps: 260, icon: "✨" },
  { id: "galacticWeaver", name: "Tisseur Galactique", description: "Tresse des filaments de galaxies entières.", baseCost: 1_400_000, baseCps: 1_400, icon: "🌌" },
  { id: "dimensionRipper", name: "Déchireur Dimensionnel", description: "Extrait de la matière d'univers parallèles.", baseCost: 20_000_000, baseCps: 7_800, icon: "🌀" },
];

export type PrestigeUpgradeId = "lightSpeed" | "wormhole" | "entropy" | "darkCore" | "echo";

export interface PrestigeUpgradeDef {
  id: PrestigeUpgradeId;
  name: string;
  description: string;
  cost: number;
  effect: string;
}

export const PRESTIGE_UPGRADES: PrestigeUpgradeDef[] = [
  { id: "lightSpeed", name: "Vitesse de la Lumière", description: "+25% CPS passif permanent.", cost: 1, effect: "+25% CPS" },
  { id: "wormhole", name: "Trou de Ver", description: "Les clics rapportent 5% du CPS global.", cost: 3, effect: "Clic = 5% CPS" },
  { id: "entropy", name: "Entropie Inversée", description: "+50% CPS supplémentaire.", cost: 8, effect: "+50% CPS" },
  { id: "darkCore", name: "Noyau Obscur", description: "Le pouvoir des clics est doublé.", cost: 15, effect: "Clic x2" },
  { id: "echo", name: "Écho Primordial", description: "Doublez les gains de prestige futurs.", cost: 40, effect: "Éclats x2" },
];

export interface GameState {
  matter: number;
  totalMatter: number;
  totalMatterAllTime: number;
  clicks: number;
  upgrades: Record<UpgradeId, number>;
  shards: number;
  prestigeUpgrades: PrestigeUpgradeId[];
  prestigeCount: number;
  lastSave: number;
}

export const INITIAL_STATE: GameState = {
  matter: 0,
  totalMatter: 0,
  totalMatterAllTime: 0,
  clicks: 0,
  upgrades: { probe: 0, harvester: 0, stringMaster: 0, blackHoleCondenser: 0, quasarForge: 0, galacticWeaver: 0, dimensionRipper: 0 },
  shards: 0,
  prestigeUpgrades: [],
  prestigeCount: 0,
  lastSave: Date.now(),
};

export const PRESTIGE_THRESHOLD = 1_000_000;
export const SAVE_VERSION = 2;

export function costOf(def: UpgradeDef, owned: number): number {
  return Math.ceil(def.baseCost * Math.pow(1.15, owned));
}

export function shardsAvailable(totalMatterAllTime: number, prestigeUpgrades: PrestigeUpgradeId[]): number {
  if (totalMatterAllTime < PRESTIGE_THRESHOLD) return 0;
  const base = Math.floor(Math.pow(totalMatterAllTime / PRESTIGE_THRESHOLD, 0.5));
  const mult = prestigeUpgrades.includes("echo") ? 2 : 1;
  return base * mult;
}

export function computeMultipliers(state: GameState) {
  const shardBonus = 1 + state.shards * 0.02;
  let cpsMult = shardBonus;
  if (state.prestigeUpgrades.includes("lightSpeed")) cpsMult *= 1.25;
  if (state.prestigeUpgrades.includes("entropy")) cpsMult *= 1.5;
  let clickMult = shardBonus;
  if (state.prestigeUpgrades.includes("darkCore")) clickMult *= 2;
  return { cpsMult, clickMult };
}

export function computeCps(state: GameState): number {
  const { cpsMult } = computeMultipliers(state);
  let cps = 0;
  for (const def of UPGRADES) {
    cps += def.baseCps * state.upgrades[def.id];
  }
  return cps * cpsMult;
}

export interface CpsContribution {
  id: UpgradeId;
  name: string;
  icon: string;
  count: number;
  cps: number;
  share: number;
}

export function cpsBreakdown(state: GameState): CpsContribution[] {
  const { cpsMult } = computeMultipliers(state);
  const rows = UPGRADES.map((def) => {
    const count = state.upgrades[def.id];
    const cps = def.baseCps * count * cpsMult;
    return { id: def.id, name: def.name, icon: def.icon, count, cps, share: 0 };
  });
  const total = rows.reduce((acc, r) => acc + r.cps, 0);
  if (total > 0) for (const r of rows) r.share = r.cps / total;
  return rows.filter((r) => r.count > 0).sort((a, b) => b.cps - a.cps);
}

export function computeClickPower(state: GameState): number {
  const { clickMult } = computeMultipliers(state);
  const cps = computeCps(state);
  let base = 1 * clickMult;
  if (state.prestigeUpgrades.includes("wormhole")) {
    base += cps * 0.05;
  }
  return base;
}

export function formatNumber(n: number): string {
  if (!isFinite(n)) return "∞";
  if (n < 1000) return n.toFixed(n < 10 ? 1 : 0).replace(/\.0$/, "");
  const units = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc"];
  const tier = Math.floor(Math.log10(Math.abs(n)) / 3);
  if (tier >= units.length) return n.toExponential(2);
  const scaled = n / Math.pow(10, tier * 3);
  return scaled.toFixed(2) + units[tier];
}

const SAVE_KEY = "cosmic-singularity-save-v1";

export function loadState(): GameState {
  if (typeof window === "undefined") return INITIAL_STATE;
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return INITIAL_STATE;
    const parsed = JSON.parse(raw) as Partial<GameState>;
    return {
      ...INITIAL_STATE,
      ...parsed,
      upgrades: { ...INITIAL_STATE.upgrades, ...(parsed.upgrades ?? {}) },
      prestigeUpgrades: parsed.prestigeUpgrades ?? [],
    };
  } catch {
    return INITIAL_STATE;
  }
}

export function saveState(state: GameState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify({ ...state, lastSave: Date.now() }));
  } catch {
    /* ignore */
  }
}

export function resetSave() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SAVE_KEY);
}

// ─── Save slots & backup ────────────────────────────────────────────────

export interface SavePayload {
  version: number;
  savedAt: number;
  label?: string;
  state: GameState;
  achievements: string[];
  achievementsTs: Record<string, number>;
  startTime: number;
}

export const NUM_SLOTS = 3;
const SLOT_KEY = (i: number) => `cosmic-singularity-slot-${i}-v1`;
const BACKUP_KEY = "cosmic-singularity-backup-v1";

export interface SlotInfo {
  index: number;
  payload: SavePayload | null;
}

export function listSlots(): SlotInfo[] {
  const out: SlotInfo[] = [];
  for (let i = 0; i < NUM_SLOTS; i++) {
    out.push({ index: i, payload: readSlot(i) });
  }
  return out;
}

export function readSlot(i: number): SavePayload | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SLOT_KEY(i));
    if (!raw) return null;
    return JSON.parse(raw) as SavePayload;
  } catch {
    return null;
  }
}

export function writeSlot(i: number, payload: Omit<SavePayload, "version" | "savedAt"> & { label?: string }) {
  if (typeof window === "undefined") return;
  const full: SavePayload = { ...payload, version: SAVE_VERSION, savedAt: Date.now() };
  try {
    localStorage.setItem(SLOT_KEY(i), JSON.stringify(full));
  } catch {
    /* ignore */
  }
}

export function deleteSlot(i: number) {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SLOT_KEY(i));
}

export function snapshotBackup(payload: Omit<SavePayload, "version" | "savedAt">) {
  if (typeof window === "undefined") return;
  const full: SavePayload = { ...payload, version: SAVE_VERSION, savedAt: Date.now(), label: "Auto-backup" };
  try {
    localStorage.setItem(BACKUP_KEY, JSON.stringify(full));
  } catch {
    /* ignore */
  }
}

export function readBackup(): SavePayload | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(BACKUP_KEY);
    return raw ? (JSON.parse(raw) as SavePayload) : null;
  } catch {
    return null;
  }
}

export function normalizePayload(raw: unknown): SavePayload | null {
  if (!raw || typeof raw !== "object") return null;
  const obj = raw as Record<string, unknown>;
  const incoming = (obj.state ?? obj) as Partial<GameState> | undefined;
  if (!incoming || typeof incoming !== "object" || typeof (incoming as GameState).matter !== "number") return null;
  const state: GameState = {
    ...INITIAL_STATE,
    ...(incoming as GameState),
    upgrades: { ...INITIAL_STATE.upgrades, ...((incoming as GameState).upgrades ?? {}) },
    prestigeUpgrades: (incoming as GameState).prestigeUpgrades ?? [],
  };
  return {
    version: typeof obj.version === "number" ? (obj.version as number) : 1,
    savedAt: typeof obj.savedAt === "number" ? (obj.savedAt as number) : Date.now(),
    label: typeof obj.label === "string" ? (obj.label as string) : undefined,
    state,
    achievements: Array.isArray(obj.achievements) ? (obj.achievements as string[]) : [],
    achievementsTs: (obj.achievementsTs as Record<string, number>) ?? {},
    startTime: typeof obj.startTime === "number" ? (obj.startTime as number) : Date.now(),
  };
}
