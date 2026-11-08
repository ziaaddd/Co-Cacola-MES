# Coca-Cola MES backend

Express 5 API scaffold with MongoDB/Mongoose models, request middleware, and
authentication wrappers. Business endpoints and production workflows can be
added in `src/controllers/` and `src/routes/`.

## Run locally

Requires Node.js 20+ and a reachable MongoDB instance.

```powershell
Copy-Item .env.example .env
npm install
npm run dev
```

Set `MONGODB_URI` and a strong `JWT_SECRET` in `.env`. The health endpoint is
available at `GET /api/health`.
