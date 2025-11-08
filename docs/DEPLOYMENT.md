# Deployment Guide

This guide walks you through deploying the KeyVora stack:
- Frontend (Vite + React) → Vercel
- Backend (Express + MongoDB) → Render

You can swap providers (e.g., Cloudflare Pages, Railway, Fly.io) using the same env/CORS pattern.

## Prerequisites
- GitHub repository with this code
- MongoDB connection string (MongoDB Atlas or Render Mongo add-on)
- Node 18+ locally (for building/running)

## 1) Prepare environment files

Copy examples and fill values:

```bash
# Backend
copy .env.example .env
# Frontend
copy frontend\.env.example frontend\.env
```

Edit `.env` (backend):
- MONGODB_URI="your MongoDB Atlas connection string (mongodb+srv://...)"
- FRONTEND_ORIGIN="http://localhost:5173" (will update to Vercel URL later)
- ENCRYPTION_KEY="a long random string - generate with: node -e \"console.log(require('crypto').randomBytes(32).toString('hex'))\""

**How to get MongoDB Atlas URI:**
1. MongoDB Atlas → Database → Connect → Drivers
2. Copy `mongodb+srv://...` connection string
3. Replace `<password>` with your actual password
4. Add `/keyvora` before the `?` to specify database name
5. Example: `mongodb+srv://user:pass@cluster.mongodb.net/keyvora?retryWrites=true&w=majority`

Edit `frontend/.env` (frontend):
- VITE_API_URL="http://localhost:3000" (will update to Render URL later)

## 2) Deploy backend to Render

Option A: Use render.yaml (recommended)
1. Push to GitHub.
2. In Render, New → Blueprint → pick your repo.
3. Confirm service "keyvora-api".
4. Set env vars/secrets after first deploy:
   - MONGODB_URI → your MongoDB Atlas URI (mongodb+srv://...)
   - ENCRYPTION_KEY → strong secret (64-char hex recommended)
   - FRONTEND_ORIGIN → your Vercel domain(s), comma-separated (e.g. https://your-app.vercel.app)
5. Trigger redeploy.

Option B: Create Web Service from dashboard
- Build command: `npm install`
- Start command: `npm start`
- Health check path: `/health`
- Set the same environment variables as above.

Note Render URL (e.g., https://keyvora-api.onrender.com). This is your API base.

## 3) Deploy frontend to Vercel
1. In Vercel, New Project → import the `frontend` folder of this repo.
2. Framework Preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`
5. Environment variable:
   - VITE_API_URL → your Render API base (e.g., https://keyvora-api.onrender.com)
6. Deploy. Visit the Vercel URL and test.

## 4) Update CORS whitelist
Back in Render, set `FRONTEND_ORIGIN` to include your Vercel domain. Multiple domains supported, comma-separated, for example:

```
FRONTEND_ORIGIN=https://your-app.vercel.app,https://preview-your-app.vercel.app
```

Redeploy the backend.

## 5) Verify
- Open frontend URL.
- Create/edit pads and upload attachments.
- Check network calls point to your Render API and succeed.

## Notes and limits
- Large payloads (base64 attachments) are allowed by the backend (50 MB). Some serverless platforms have smaller body limits; Render/Cloud Run/Fly.io are good fits.
- If you use a custom domain on Vercel, add it to `FRONTEND_ORIGIN` as well.
- Healthcheck endpoint: `/health` returns JSON.

## Alternative platforms
- Backend: Railway, Fly.io, Google Cloud Run, Azure App Service, DigitalOcean App Platform.
- Frontend: Netlify, Cloudflare Pages, GitHub Pages (static only).

## Docker (optional)
You can run the API locally via Docker:

```bash
# Build
docker build -t keyvora-api .
# Run
docker run --rm -p 3000:3000 --env-file .env keyvora-api
```

Then set `frontend/.env` → `VITE_API_URL=http://localhost:3000` and `npm run dev` in `frontend`.
