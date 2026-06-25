# Payground — Lab Expenses UI

A [Next.js](https://nextjs.org/) (App Router) expense tracker. Browse monthly
statement cards, drill into a statement's line items, and add / edit / delete
expenses. Built with TypeScript, Tailwind CSS + daisyUI, Swiper and next-auth.

## Tech Stack

- **Next.js** (App Router) + **React** + **TypeScript** (`strict`)
- **Tailwind CSS** + **daisyUI** for styling
- **axios** for the API layer, **moment** for date formatting
- **Swiper** for the card carousel
- **next-auth** for authentication (Google provider)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Available scripts

| Script              | Description                          |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Start the dev server                 |
| `npm run build`     | Production build                     |
| `npm run start`     | Serve the production build           |
| `npm run lint`      | Run ESLint (`next lint`)             |
| `npm run typecheck` | Type-check with `tsc --noEmit`       |

## Environment

Create a `.env.local` (kept out of git) with:

```bash
# Selects which endpoint below is active: DEV | UAT | PRD
NEXT_PUBLIC_STATE=DEV
NEXT_PUBLIC_ENDPOINT_DEV=http://localhost:8080/api/v1
NEXT_PUBLIC_ENDPOINT_UAT=http://localhost:8080/api/v2
NEXT_PUBLIC_ENDPOINT_PRD=http://localhost:8080/api/v3

# next-auth Google provider
NEXT_SECRET_GOOGLE_CLIENT_ID=...
NEXT_SECRET_GOOGLE_CLIENT_SECRET=...
```

> **Security:** keep real secrets in `.env.local` (git-ignored), not in `.env`.

## Project Structure

The app follows a **feature-based** layout. Routes stay thin and delegate to a
self-contained `expenses` feature; cross-cutting UI and infrastructure live in
shared folders.

```
src/
├── app/                      # Routes — thin pages that compose feature pieces
│   ├── layout.tsx
│   ├── page.tsx              # Home: statement cards + create card / add expense
│   ├── expenses/page.tsx     # Statement detail: table + add / edit / delete
│   └── api/route.ts          # Mock auth-session endpoint
│
├── lib/                      # App-wide infrastructure
│   ├── config.ts             # Resolve API base URL from NEXT_PUBLIC_STATE
│   └── apiClient.ts          # Shared axios instance (baseURL + headers)
│
├── features/expenses/        # The expenses domain
│   ├── types.ts              # Domain & API types
│   ├── constants.ts          # Type options, badge map, description presets
│   ├── api.ts                # Data-access layer (expensesApi.*)
│   ├── hooks/                # useExpenseCards, useExpenseDetails
│   ├── components/           # Table, card swiper, modals, form fields
│   └── index.ts              # Public barrel export
│
├── components/
│   ├── ui/                   # Reusable primitives: Modal, StatCard, SuccessAlert, icons
│   ├── layout/PageHeader.tsx
│   └── Providers / NavBars / SignInButton
│
└── hooks/                    # Shared hooks: useDialog, useTransientMessage
```

### Layering

```
page (UI) → feature hooks (state/logic) → feature api → lib/apiClient → lib/config
```

Components never build endpoint strings or call axios directly — all requests
go through `features/expenses/api.ts`, which uses the shared `apiClient`.

## Path Aliases

`@/*` maps to `src/*` (configured in `tsconfig.json`), e.g.:

```ts
import { useExpenseCards } from '@/features/expenses/hooks/useExpenseCards';
```

## Docker

```bash
docker compose up --build
```

See `Dockerfile` / `docker-compose.yml` for details.
