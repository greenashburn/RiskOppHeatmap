# Risk–Opportunity Heatmap

An interactive workshop companion for mapping and prioritising business risks and opportunities. This repository contains the Next.js 14 MVP scaffold with Tailwind CSS styling, demo data, and state management powered by Zustand.

## Getting started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) to explore the live heatmap prototype.

> **Note:** Package installation may require Node.js 18.18 or later.

## Available scripts

- `npm run dev` – start Next.js in development mode.
- `npm run build` – create an optimised production build.
- `npm run start` – run the production server locally.
- `npm run lint` – run ESLint using the Next.js shareable config.
- `npm run test` – execute Vitest (tests will be added alongside backend/API work).

## Project structure

```
app/                  # App router routes and global layout
components/           # Reusable UI building blocks
lib/                  # Shared utilities and state stores
public/               # Static assets (to be added)
tailwind.config.ts    # Tailwind theme configuration
```

## Next steps

- Implement persistent storage via Prisma and PostgreSQL.
- Add API routes for sessions, entries, and votes with Zod validation.
- Wire up real-time updates via WebSockets or Supabase Realtime.
- Introduce AI-assisted scoring using the OpenAI Responses API.
- Expand test coverage with Vitest for API endpoints and stores.
