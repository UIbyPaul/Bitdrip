import { create } from "zustand";
import { VaultInfo, DripEvent, Notification, NotificationType } from "@/types";

// ─── State Shape ──────────────────────────────────────────────────────────────

interface VaultStore {
  // Vault data
  vault: VaultInfo | null;
  dripHistory: DripEvent[];
  isLoading: boolean;

  // UI notifications
  notifications: Notification[];

  // Actions — vault
  setVault: (vault: VaultInfo | null) => void;
  setDripHistory: (history: DripEvent[]) => void;
  setLoading: (loading: boolean) => void;

  // Actions — notifications
  addNotification: (n: {
    type: NotificationType;
    title: string;
    message?: string;
  }) => void;
  removeNotification: (id: string) => void;
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useVaultStore = create<VaultStore>((set) => ({
  vault: null,
  dripHistory: [],
  isLoading: false,
  notifications: [],

  setVault: (vault) => set({ vault }),
  setDripHistory: (dripHistory) => set({ dripHistory }),
  setLoading: (isLoading) => set({ isLoading }),

  addNotification: ({ type, title, message }) => {
    const id = crypto.randomUUID();
    set((state) => ({
      notifications: [...state.notifications, { id, type, title, message }],
    }));
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
      }));
    }, 5000);
  },

  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}));

// ─── Selectors (use these to avoid re-renders) ────────────────────────────────

export const selectVault = (s: VaultStore) => s.vault;
export const selectHasVault = (s: VaultStore) =>
  s.vault !== null && s.vault.isActive;
export const selectNotifications = (s: VaultStore) => s.notifications;
export const selectIsLoading = (s: VaultStore) => s.isLoading;
