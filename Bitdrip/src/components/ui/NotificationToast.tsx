"use client";

import { useVaultStore, selectNotifications } from "@/store/vaultStore";
import { cn } from "@/utils";
import { NotificationType } from "@/types";

const CONFIG: Record<
  NotificationType,
  { icon: string; classes: string }
> = {
  success: {
    icon: "✓",
    classes: "border-green-500/30 bg-green-500/10 text-green-300",
  },
  error: {
    icon: "✕",
    classes: "border-red-500/30 bg-red-500/10 text-red-300",
  },
  info: {
    icon: "ℹ",
    classes: "border-blue-500/30 bg-blue-500/10 text-blue-300",
  },
  warning: {
    icon: "⚠",
    classes: "border-yellow-500/30 bg-yellow-500/10 text-yellow-300",
  },
};

export function NotificationToast() {
  const notifications = useVaultStore(selectNotifications);
  const removeNotification = useVaultStore((s) => s.removeNotification);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm">
      {notifications.map((n) => {
        const { icon, classes } = CONFIG[n.type];
        return (
          <div
            key={n.id}
            className={cn(
              "flex items-start gap-3 p-4 rounded-xl border backdrop-blur-md shadow-lg",
              classes
            )}
          >
            <span className="text-base leading-none mt-0.5 shrink-0">
              {icon}
            </span>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm">{n.title}</div>
              {n.message && (
                <div className="text-xs mt-0.5 opacity-80 truncate">
                  {n.message}
                </div>
              )}
            </div>
            <button
              onClick={() => removeNotification(n.id)}
              className="opacity-50 hover:opacity-100 text-sm shrink-0 transition-opacity"
            >
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
}
