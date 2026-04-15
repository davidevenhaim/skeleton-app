import { create } from "zustand";

interface LoaderState {
  pendingCount: number;
  addLoading: () => void;
  removeLoading: () => void;
}

export const useLoaderStore = create<LoaderState>((set) => ({
  pendingCount: 0,
  addLoading: () => set((s) => ({ pendingCount: s.pendingCount + 1 })),
  removeLoading: () =>
    set((s) => ({ pendingCount: Math.max(0, s.pendingCount - 1) })),
}));

/** Selector: true when any request is pending */
export const useIsLoading = () => useLoaderStore((s) => s.pendingCount > 0);
