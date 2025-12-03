# MattePaint Gallery V5

High-fidelity frontend prototype of the next-generation MattePaint HDRI gallery / library rebuild.

Currently **frontend-only** with **no backend** or production data; it focuses purely on UI/UX and interaction design. On Nuxt3 but priming it for Nuxt4 migration.

Focus areas:
- **HDRI sequences** with frame scrubbing and detailed tech specs
- **HDRI detail page** with resolution/format selection and download UX
- **Refined UI/UX** for sidebar, header, loading states, and preview interactions

---

## Tech Stack

- **Framework**: [Nuxt 3](https://nuxt.com) (Vue 3, Composition API)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Build Tool**: Vite (via Nuxt)
- **Package Manager**: **pnpm** (preferred)

Project structure (high level):
- `app/pages/` – Nuxt pages (`/`, `/hdris`, `/hdris/[id]`)
- `app/components/` – shared UI (sidebar, header, loading, HDRI cards, etc.)
- `app/composables/` – data fetching and mock HDRI data (`useHdri`)

---

## Getting Started

Install dependencies (use **pnpm**):

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

The app will be available at `http://localhost:3000`.

---

## Production

Build for production:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm preview
```

Deployment follows standard Nuxt 3 / Nitro deployment workflows.
