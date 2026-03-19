# Notifications Module

This project includes a pluggable notification module for form events.

Current flow:

1. User submits form on `admission-enquiry` page.
2. Frontend calls `POST /api/notifications/admission-enquiry`.
3. API builds a normalized payload and calls `notifyAll(...)`.
4. `notifyAll` executes all configured providers.

## Architecture

- `src/lib/notifications/types.ts`
  - Shared types (`NotificationPayload`, `NotificationProvider`, etc.)
- `src/lib/notifications/index.ts`
  - Provider registry + `notifyAll` orchestration
- `src/lib/notifications/providers/telegram.ts`
  - Telegram provider implementation
- `src/app/api/notifications/admission-enquiry/route.ts`
  - Admission enquiry API endpoint

This design supports adding more providers (e.g. email, WhatsApp API) without changing form pages.

## Telegram Setup (Free)

Set these environment variables:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

### How to get values

1. In Telegram, create a bot with `@BotFather` and copy the bot token.
2. Send at least one message to your bot from the chat/channel/group where you want alerts.
3. Get chat id:
   - Open:
     `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
   - Find `chat.id` in the response.

## Add a new provider later

1. Create a provider file under `src/lib/notifications/providers/`.
2. Implement `NotificationProvider` interface.
3. Register it in `src/lib/notifications/index.ts`.
4. Add required env vars in deployment docs and `.env.example`.

All registered providers run for each event.
