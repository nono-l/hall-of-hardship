import { create } from "zustand";
import type { ExhibitSlug } from "./exhibits";

const KEY = "kurou-kan-visit";

type Snapshot = {
  completed: ExhibitSlug[];
  notes: Partial<Record<ExhibitSlug, string>>;
};

function read(): Snapshot {
  if (typeof window === "undefined") return { completed: [], notes: {} };
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { completed: [], notes: {} };
    const p = JSON.parse(raw) as Snapshot;
    return {
      completed: Array.isArray(p.completed) ? p.completed : [],
      notes: p.notes ?? {},
    };
  } catch {
    return { completed: [], notes: {} };
  }
}

function write(s: Snapshot) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(s));
}

export type VisitState = Snapshot & {
  hydrated: boolean;
  hydrate: () => void;
  mark: (slug: ExhibitSlug, note?: string) => void;
  reset: () => void;
};

export const useVisitStore = create<VisitState>((set, get) => ({
  completed: [],
  notes: {},
  hydrated: false,
  hydrate: () => {
    if (get().hydrated) return;
    set({ ...read(), hydrated: true });
  },
  mark: (slug, note) => {
    const completed = get().completed.includes(slug) ? get().completed : [...get().completed, slug];
    const notes = note ? { ...get().notes, [slug]: note } : get().notes;
    const next = { completed, notes };
    write(next);
    set({ ...next, hydrated: true });
  },
  reset: () => {
    const next = { completed: [] as ExhibitSlug[], notes: {} };
    write(next);
    set({ ...next, hydrated: true });
  },
}));
