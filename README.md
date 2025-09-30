# NextNews

A demo Next.js (App Router) project showcasing:

- Parallel routes (archive filtering + latest list)
- Intercepting routes & modal UI for images
- Nested layouts & route groups
- Streaming with Suspense & loading / error boundaries
- Data fetching from a local SQLite database (`data.db`) via `better-sqlite3`

## Tech Stack

- Next.js App Router
- React Server Components
- SQLite (`better-sqlite3`)
- CSS (global stylesheet at [app/globals.css](app/globals.css))

## Project Structure (selected)

```
app/
  (marketing)/              Public marketing home
  (content)/                Auth / main content area
    layout.jsx              Root content layout
    news/                   News listing & detail
      [slug]/               Dynamic article routes
        image/page.jsx      Fullscreen (non‑modal) image page
        @modal/             Parallel route slot for modal overlay
          (.)image/page.jsx Intercepted image route (modal)
          default.jsx       Fallback when modal not mounted
    archive/                Archive with parallel slots
      layout.jsx
      @archive/[[...filter]]/page.jsx  Year / month filtering
      @archive/[[...filter]]/error.jsx Error boundary for filter page
      @latest/default.jsx   Parallel route (latest news)
components/
  main-header.jsx
  nav-link.jsx
  modal-backdrop.jsx
lib/
  news.js                   DB query helpers
data.db                     SQLite database
```

## Data Layer

All database access lives in [lib/news.js](lib/news.js):

- [`getAllNews`](lib/news.js)
- [`getNewsItem`](lib/news.js)
- [`getLatestNews`](lib/news.js)
- [`getAvailableNewsYears`](lib/news.js)
- [`getAvailableNewsMonths`](lib/news.js)
- [`getNewsForYear`](lib/news.js)
- [`getNewsForYearAndMonth`](lib/news.js)

Each async function simulates latency with a short `setTimeout` to demonstrate Suspense boundaries.

## Routing Features

### Parallel Routes & Slots

Archive page uses parallel slots:

- Archive filter: [app/(content)/archive/@archive/[[...filter]]/page.jsx](<app/(content)/archive/@archive/[[...filter]]/page.jsx>)
- Latest list: [app/(content)/archive/@latest/default.jsx](<app/(content)/archive/@latest/default.jsx>)

Layout combining them: [app/(content)/archive/layout.jsx](<app/(content)/archive/layout.jsx>)

### Intercepted & Modal Routes

Image modal lives in a parallel `@modal` slot:

- Standard image route: [app/(content)/news/[slug]/image/page.jsx](<app/(content)/news/[slug]/image/page.jsx>)
- Intercepted modal version: [app/(content)/news/[slug]/@modal/(.)image/page.jsx](<app/(content)/news/[slug]/@modal/(.)image/page.jsx>)
- Slot layout: [app/(content)/news/[slug]/layout.jsx](<app/(content)/news/[slug]/layout.jsx>)
- Backdrop component: [components/modal-backdrop.jsx](components/modal-backdrop.jsx)

## Development

Install dependencies:

```bash
npm install
```

Run dev server:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Start production:

```bash
npm start
```

## Database

SQLite file: `data.db` (committed locally for simplicity).

## Adding Features (Ideas)

- Pagination for `/news`
- API routes for JSON (extend [app/api/route.js](app/api/route.js))
- Image optimization via `next/image`
- Incremental static regeneration (convert some queries to cached / revalidated)

## Environment Notes

No environment variables required currently. If externalizing DB path, introduce `process.env.DB_PATH` and update [lib/news.js](lib/news.js).

## Accessibility & UX

- Modal dismiss via backdrop click (`router.back()`)
- Links remain standard for SEO

## License

demo purposes.

## Summary

This project demonstrates structured Next.js App Router concepts (parallel + intercepted routes) combined with a lightweight synchronous SQLite access layer wrapped in async utilities to integrate smoothly with Suspense boundaries.
