import type { NotificationPayload, NotificationProvider } from "../types";

function toTelegramText(payload: NotificationPayload): string {
  const lines = [
    `🔔 ${payload.message.title}`,
    ...payload.message.lines.map((line) => `• ${line}`),
    `• Submitted At: ${payload.submittedAt}`,
  ];
  return lines.join("\n");
}

export function createTelegramProvider(): NotificationProvider | null {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) return null;

  return {
    name: "telegram",
    async send(payload: NotificationPayload) {
      const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: toTelegramText(payload),
          disable_web_page_preview: true,
        }),
      });

      if (!res.ok) {
        const body = await res.text();
        throw new Error(`Telegram send failed: ${res.status} ${body}`);
      }
    },
  };
}
