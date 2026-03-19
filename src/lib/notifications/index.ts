import { createTelegramProvider } from "./providers/telegram";
import type {
  NotificationPayload,
  NotificationProvider,
  NotificationResult,
} from "./types";

function getProviders(): NotificationProvider[] {
  const providers: Array<NotificationProvider | null> = [createTelegramProvider()];
  return providers.filter((p): p is NotificationProvider => p !== null);
}

export async function notifyAll(payload: NotificationPayload): Promise<NotificationResult[]> {
  const providers = getProviders();
  if (providers.length === 0) {
    return [{ provider: "none", ok: false, error: "No providers configured." }];
  }

  const settled = await Promise.allSettled(
    providers.map(async (provider) => {
      await provider.send(payload);
      return provider.name;
    })
  );

  return settled.map((result, idx) => {
    const provider = providers[idx]?.name ?? "unknown";
    if (result.status === "fulfilled") {
      return { provider, ok: true };
    }
    return {
      provider,
      ok: false,
      error: result.reason instanceof Error ? result.reason.message : "Unknown error",
    };
  });
}
