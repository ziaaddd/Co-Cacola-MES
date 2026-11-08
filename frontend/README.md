# Coca-Cola MES frontend

Next.js App Router application scaffolded with TypeScript, Tailwind CSS, and ESLint.
The app and component directories are intentionally placeholders; feature UI will be
added incrementally.

## Run locally

```powershell
npm install
npm run dev
```

Set `NEXT_PUBLIC_API_URL` in `.env.local` to the backend API base URL. The default
template value is `http://localhost:4000/api`.

## Source layout

- `src/app/` - App Router layout and minimal landing page
- `src/components/` - Common, dashboard, and chart component areas
- `src/services/` - Axios API client and service modules
- `src/types/` - Shared frontend model interfaces
- `src/context/` - Reserved for shared application state
- `src/utils/` - Styling and formatting helpers
