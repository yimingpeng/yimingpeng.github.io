# Ask Yiming Assistant

This portfolio keeps the frontend on GitHub Pages and runs the assistant API as a Cloudflare
Worker. The first version uses Cloudflare Workers AI and a curated knowledge file, so no OpenAI key
or vector database is required.

## Current Status

Implemented locally:

- Chat UI component: `src/components/AIChat.astro`
- Worker API: `worker/src/index.ts`
- Curated knowledge file: `worker/src/knowledge.ts`
- Local config example: `.env.example`
- Worker config template: `wrangler.toml`

Still requires Yiming's Cloudflare account:

- Run `npx wrangler login`
- Create the production and preview `RATE_LIMITS` KV namespaces
- Replace the placeholder KV IDs in `wrangler.toml`
- Deploy the Worker and set the production `PUBLIC_AI_CHAT_API_URL`

## Local Development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the public frontend config:

   ```bash
   cp .env.example .env
   ```

3. Start the Worker API:

   ```bash
   npm run worker:dev
   ```

4. In a second terminal, start Astro:

   ```bash
   npm run dev
   ```

The Astro site will call `http://localhost:8787/chat` by default when opened from localhost.

## Cloudflare Setup

1. Create a Cloudflare account and install/login with Wrangler:

   ```bash
   npx wrangler login
   ```

2. Create a Workers KV namespace for rate limits:

   ```bash
   npx wrangler kv namespace create RATE_LIMITS
   npx wrangler kv namespace create RATE_LIMITS --preview
   ```

3. Replace the placeholder `id` and `preview_id` values in `wrangler.toml` with the returned IDs.

4. Deploy the Worker:

   ```bash
   npm run worker:deploy
   ```

5. Set `PUBLIC_AI_CHAT_API_URL` for the GitHub Pages build to the deployed Worker URL, ending in
   `/chat`. Example:

   ```text
   https://yiming-portfolio-ai-assistant.<your-workers-subdomain>.workers.dev/chat
   ```

No secrets should be committed. The frontend value is public by design; the AI binding and KV
namespace stay server-side in Cloudflare. Wrangler local state is ignored via `.wrangler/`.

## Limits and Behavior

- Allowed origins are `https://yimingpeng.github.io`, `http://localhost:4321`, and
  `http://127.0.0.1:4321`.
- Each visitor IP is limited to 10 chat requests per UTC day.
- The assistant has a global soft limit of 200 chat requests per UTC day.
- User messages are capped at 1,500 characters.
- The Worker sends only the last 12 chat messages to the model.
- Answers should stay under 300 words and use only portfolio knowledge.

## Verification

Run these before deploying:

```bash
npm run lint
npm run format:check
npm run build
npm run worker:typecheck
```

Manual checks:

- Ask about Yiming's current role.
- Ask about publications and community work.
- Ask an unknown/private question and confirm the assistant says it does not know from the
  portfolio.
- Send a message over 1,500 characters and confirm it is rejected.
