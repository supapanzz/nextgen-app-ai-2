# AGENTS.md

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Quick commands

```bash
npm run dev          # dev server on localhost:3000
npm run build        # production build (standalone output)
npm run lint         # eslint flat config (core-web-vitals + typescript)
npx tsc --noEmit     # typecheck (no npm script for this)
npx prisma generate  # regenerate Prisma client after schema changes
npx prisma migrate dev --name <name>  # create & apply migration
```

There is no test framework, formatter, or pre-commit hook configured.

## Architecture

- **Next.js 16.3.1** App Router with `cacheComponents: true`
- **Route groups:** `(auth)` for login/signup, `(front)` for the main site
- **Path alias:** `@/*` → `./src/*`
- **Database:** MariaDB via Prisma 7 driver adapter (`@prisma/adapter-mariadb`), not the built-in MySQL driver
- **Auth:** better-auth with Prisma adapter — API catch-all at `src/app/api/auth/[...all]/route.ts`
- **UI:** shadcn/ui (radix-lyra style) + Tailwind CSS 4 (CSS-based config, no `tailwind.config`)
- **State:** zustand (cart store uses localStorage persistence)
- **Forms:** react-hook-form + zod v4 resolvers

## Prisma quirks

- Schema: `prisma/schema.prisma`
- Client output: `generated/prisma` (not default `node_modules/.prisma/client`)
- Import path: `../../generated/prisma/client` (see `src/lib/prisma.ts`)
- `generated/prisma` is gitignored — must run `npx prisma generate` after clone or schema changes
- Driver adapter pattern: `PrismaMariaDb` wraps `DATABASE_URL` from `.env`
- The `datasource.db.provider` is `mysql` even though the actual DB is MariaDB

## Environment

`.env` requires:
- `DATABASE_URL` — MySQL-format connection string for MariaDB
- `BETTER_AUTH_SECRET` — random secret for better-auth sessions
- `BETTER_AUTH_URL` — app base URL (default `http://localhost:3000`)

Prisma CLI reads env via `dotenv/config` imported in `prisma.config.ts`.

## Deployment

Dockerfile builds a multi-stage image (node:24-alpine). Standalone output is used — the runner copies `server.js`, `.next/static`, `generated/`, and `prisma/` into the final image. Do not rely on `node_modules` at runtime.

## Known TODOs in codebase

Several route components export `export const instant = false;` to opt out of Next.js 16 Cache Components. These are flagged for future refactoring (see `src/app/(front)/layout.tsx`, `src/app/(front)/page.tsx`, `src/app/(front)/product/page.tsx`, `src/app/(auth)/layout.tsx`).
