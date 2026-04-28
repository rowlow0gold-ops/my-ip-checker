# My IP Checker

Next.js app that displays your current IP address. Uses Supabase for data.

## Quick Start

```bash
npm install
npm run dev
# -> http://localhost:3000
```

## Environment Variables

Create `.env.local` in the project root:

```
NEXT_PUBLIC_SUPABASE_URL=<your supabase url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your supabase anon key>
```

> The actual key values are saved in `checkout/SAVED_ENVS.md`.

## Build

```bash
npm run build
npm run start   # production server
```
