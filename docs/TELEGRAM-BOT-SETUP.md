# Telegram Bot Setup for Notifications

This guide shows how to set up a Telegram bot so KVN School forms (e.g. **Admission Enquiry**) send notifications into your personal chat or a group.

You do this **once**, then reuse the same bot for other forms.

---

## 1. Create a bot and get the token

1. Open Telegram and search for **`@BotFather`**.
2. Start the chat and send:
   ```text
   /newbot
   ```
3. Follow the prompts:
   - Bot name (e.g. `KVN Notifications`)
   - Bot username (must end with `bot`, e.g. `kvn_school_bot`)
4. BotFather replies with an **API token** like:
   ```text
   123456789:AA...   (example)
   ```
5. Copy that string and set it in `.env`:
   ```env
   TELEGRAM_BOT_TOKEN=123456789:AA...
   ```
   Treat this like a password. If it ever leaks, regenerate it in BotFather.

---

## 2. Add the bot to your group (recommended)

You can send notifications to:
- **A private group / supergroup** (school staff group), or
- Your **personal chat** (skip to step 3 if you prefer this).

To use a group:

1. Create or open the group where you want alerts.
2. Add the bot as a **member**:
   - Group → members → **Add member** → search bot username → add.
3. Make the bot **admin** (at least “Send messages” permission).

---

## 3. Disable privacy mode (so bot can see the group)

In **`@BotFather`**:

1. Send:
   ```text
   /setprivacy
   ```
2. Choose your bot.
3. Select **Disable**.

This lets the bot receive group message metadata so we can discover the group id.

---

## 4. Get the `TELEGRAM_CHAT_ID`

1. In the group (or personal chat if you prefer direct messages), send a message like:
   ```text
   test for kvn bot
   ```
2. In a browser, open:
   ```text
   https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
   ```
   (Replace `<YOUR_BOT_TOKEN>` with the value you set in `TELEGRAM_BOT_TOKEN`.)
3. In the JSON response, look for a block like:
   ```json
   "chat": {
     "id": -1001234567890,
     "title": "KVN Staff Group",
     "type": "supergroup"
   }
   ```
   - That `id` (`-1001234567890` in this example) is your **`TELEGRAM_CHAT_ID`**.
4. Set it in `.env`:
   ```env
   TELEGRAM_CHAT_ID=-1001234567890
   ```

If you want notifications directly in your personal chat instead:
- Start a chat with your bot, send “hi”.
- Call `getUpdates` as above and use the **positive** `chat.id` (e.g. `123456789`).

---

## 5. Restart app and test

1. Restart dev server:
   ```bash
   pnpm dev
   ```
   Or redeploy on Vercel after setting env vars there.
2. Open the site → go to **Admission Enquiry**.
3. Fill the form and submit.
4. You should see a Telegram message in the configured chat/group with all details.

---

## 6. Where this is used in code

- **Env variables**
  - `TELEGRAM_BOT_TOKEN`
  - `TELEGRAM_CHAT_ID`
- **Notification module**
  - `src/lib/notifications/providers/telegram.ts`
  - `src/lib/notifications/index.ts`
  - `src/lib/notifications/types.ts`
- **API route**
  - `src/app/api/notifications/admission-enquiry/route.ts`

To add more notification channels (email, WhatsApp API, etc.), implement another provider in `src/lib/notifications/providers/` and register it in `notifications/index.ts`. All providers are called for each event.

