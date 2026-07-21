export function isTriggerSupported(): boolean {
  if (typeof window === "undefined") return false;
  return "showTrigger" in Notification.prototype;
}

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return "denied";
  }
  if (Notification.permission === "granted") return "granted";
  return await Notification.requestPermission();
}

export async function scheduleReminder(
  id: string,
  title: string,
  body: string,
  triggerTime: number
) {
  const registration = await navigator.serviceWorker.getRegistration();
  if (!registration) return false;

  if (isTriggerSupported()) {
    await registration.showNotification(title, {
      tag: id,
      body,
      icon: "/icons/icon-192.png",
      // @ts-expect-error - showTrigger eksperimental
      showTrigger: new TimestampTrigger(triggerTime),
    });
    return true;
  }

  // Fallback: cuma jalan kalau app/tab lagi kebuka
  const delay = triggerTime - Date.now();
  if (delay <= 0) return false;

  setTimeout(() => {
    registration.showNotification(title, {
      tag: id,
      body,
      icon: "/icons/icon-192.png",
    });
  }, delay);
  return true;
}

export async function cancelReminder(id: string) {
  const registration = await navigator.serviceWorker.getRegistration();
  if (!registration) return;
  const notifications = await registration.getNotifications({ tag: id });
  notifications.forEach((n) => n.close());
}