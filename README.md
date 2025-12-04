# MattePaint Gallery V5

High-fidelity frontend prototype of the next-generation MattePaint HDRI gallery / library rebuild.

Currently **frontend-only** with **no backend** or production data; it focuses purely on UI/UX and interaction design. Running on **Nuxt 4** with Vue 3 and the Composition API.

Focus areas:
- **HDRI sequences** with frame scrubbing and detailed tech specs
- **HDRI detail page** with resolution/format selection and download UX
- **Global layout** with sidebar, sticky header, breadcrumbs-ready `AppHeader`, and command palette
- **Scans page** with scrubbable preview cards driven by video seeking
- **Refined UI/UX** for sidebar (hover-expand, collapsible groups), header, loading states, and preview interactions

---

## Tech Stack

- **Framework**: [Nuxt 4](https://nuxt.com) (Vue 3, Composition API)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Icons**: [Phosphor Icons](https://phosphoricons.com/) via `@phosphor-icons/vue`
- **Build Tool**: Vite (via Nuxt)
- **Package Manager**: **pnpm** (preferred)

Project structure (high level):
- `app/pages/` – Nuxt pages (`/`, `/hdris`, `/hdris/[id]`, `/scans`)
- `app/components/` – shared UI (sidebar, header, loading, HDRI cards, scans cards, etc.)
- `app/composables/` – data and state composables (`useHdri`, `useScans`, breadcrumbs, etc.)

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
