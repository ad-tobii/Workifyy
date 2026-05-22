# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## What This Is

Workifyy is a location-based freelance marketplace — clients post jobs (plumbing, electrical, handywork, etc.), nearby professionals place bids, negotiate, and complete the work. The platform uses H3 hexagonal geospatial indexing to match jobs with professionals in real time over Socket.io.

The repo is a monorepo with two independent apps:
- `backend/` — Express 5 + MongoDB + Socket.io + Redis API
- `frontend/` — React 18 + Vite + Zustand + Tailwind SPA

---

## Commands

### Backend
```bash
cd backend
npm run dev        # nodemon server.js (ES modules)
```

### Frontend
```bash
cd frontend
npm run dev        # Vite dev server
npm run build      # production build
npm run lint       # ESLint (max-warnings 0)
npm run preview    # preview production build
```

### Environment
- **Backend:** copy `.env.example` to `.env` — needs `MONGO_URL`, `REDIS_URL`, `JWT_SECRET`, `CLOUDINARY_*`, `RESEND_API_KEY`, `PORT`, `NODE_ENV`
- **Frontend:** `VITE_API_URL` (e.g. `http://localhost:3000/api/v1` for local dev; production points to Render)

---

## Backend Architecture

**Entry:** `server.js` → mounts middleware → registers routes → attaches Socket.io → connects DB + Redis

**All API routes are prefixed `/api/v1/`:**

| Mount | Router file | Purpose |
|-------|-------------|---------|
| `/auth` | `routes/auth.routes.js` | signup, login, logout, OTP verification, session check, onboarding |
| `/job` | `routes/job.routes.js` | post job, list open jobs, fetch ongoing, submit/accept work, redo, cancel |
| `/bid` | `routes/bid.routes.js` | place, accept, counter, reject bids; fetch by pro or client |
| `/dashboard` | `routes/dashboard.routes.js` | per-role analytics/stats |
| `/notification` | `routes/notification.routes.js` | fetch, mark read, mark-all-read, delete |

**Auth middleware:** `middleware/protectRoutes.middleware.js` — validates JWT from the `token` httpOnly cookie, attaches `req.user` to every protected request.

**Socket setup:** `utils/socket.utils.js`
- Authenticates via JWT in handshake cookie
- On connect: user joins room `${role}:${userId}` (e.g. `professional:abc123`)
- Professionals also join H3 hex rooms on `update-location` events
- `io` instance is attached to `app` (`app.get('io')`) and passed into controllers that need to emit

**Geospatial layer:** `utils/spatial.utils.js`
- H3 resolution 7 hex cells
- `latLngToHex(lat, lng)` converts coordinates to a hex ID
- `gridDisk(hex, 9)` produces the coverage area (the hex + 9 rings of neighbors)
- Professional current hex is cached in Redis: key `prof:location:${userId}`, TTL 300s
- On `createJob`, backend iterates hex coverage rooms via `io.in(hexRoom).allSockets()` to find connected professionals and fires `newNotification` to each

**Notification helper:** `controllers/notification.controllers.js` exports `createNotification({ userId, type, message, meta }, io)` — persists to MongoDB then emits `newNotification` to `professional:${userId}` and `client:${userId}` rooms.

**Key models** (`models/`):
- `User` — auth fields, role (`professional` | `client`), `isVerified`, `isOnboarded`
- `ProfessionalProfile` — location (GeoJSON), expertise, reviews array (ratings averaged in-app)
- `Job` — `hexId`, `status` (`open` | `ongoing` | `awaiting_review` | `completed`), `submission`, `redoRequest`, `chosenProfessional`
- `Bid` — `currentAmount`, `awaitingResponseFrom` (`client` | `professional`), `negotiationHistory[]`
- `Notification` — `user`, `type`, `message`, `meta`, `read`

**File uploads:** `utils/multer.utils.js` → Cloudinary via `utils/cloudinary.js`. Used in onboarding (profile photo, portfolio) and job posting (job images).

---

## Frontend Architecture

**Entry:** `main.jsx` → `App.jsx` (React Router v6 nested routes)

**Route guards:**
- `SessionGate` — wraps the whole app; calls `useUserStore.initSession()` on load to restore session from cookie before rendering anything
- `ProtectRoute` — checks `user` exists, optionally checks `role` and `isOnboarded`; redirects unauthenticated users to `/auth/signin`
- `GuestRoute` — redirects already-authenticated users away from auth pages
- Both **dashboard wrapper components** (`ProfessionalDasboardWrapper`, `ClientDashboardWrapper`) do an early `if (!user || user.role !== '...') return <Outlet />` before any `useEffect` fires — this is intentional so geolocation and socket init don't trigger before auth is confirmed

**Zustand stores** (`src/store/`):

| Store | Responsibility |
|-------|---------------|
| `useUserStore` | Auth state, session init, login/signup/logout, onboarding |
| `useSocketStore` | Socket lifecycle; `initializeSocket(location)` for pros, `initializeClientSocket()` for clients; all real-time event listeners live here |
| `useJobStore` | Jobs list, single job, CRUD actions; `setJobs()` replaces the list, `upsertJob()` adds/merges one — **order matters**: always `setJobs` before `upsertJob` to avoid race conditions |
| `useBidStore` | Bids list, bid actions |
| `useNotificationStore` | Notifications; optimistic updates for markAsRead and delete |
| `useProStore` / `useClientStore` | UI tab state (`mainTab`, `jobTab`) for their respective dashboards |
| `useDashboardStore` | Dashboard analytics data |

**HTTP client:** `src/api/axios.api.js` — single Axios instance with `baseURL: VITE_API_URL` and `withCredentials: true`. All API calls go through this; all backend responses follow `{ success, data, message }`.

**Socket client:** `src/utils/socket.utils.js` — creates and exports a single socket.io-client instance (not connected on import). `useSocketStore` calls `.connect()` / `.disconnect()` and registers/removes all listeners.

**Geolocation:** `src/utils/geoLocation.utils.js`
- `getBrowserLocation()` — one-shot; tries high-accuracy first, falls back to low-accuracy
- `watchLocation()` — continuous; emits `update-location` to socket every meaningful move (500m filter)

**Dashboard tab navigation:** Both dashboards are single-page tab layouts. `mainTab` controls which section renders (`home`, `jobs`, `bids`, `notifications`). `jobTab` controls sub-tabs within the Jobs section. Quick action buttons set these tabs directly via their store.

**Styling:** Tailwind with custom breakpoints — `xsMobile`, `mobile`, `tablet`, `laptop`, `largeDesktop`. Path alias `@/` → `src/`.

---

## Key Workflows

**Job lifecycle:** Client posts job (with location → hex) → socket broadcasts `newJob` to pros in that hex ring → pro places `Bid` → client accepts/counters/rejects → accepted bid sets job `ongoing` + blocks other bids → pro submits work → client accepts (adds review to pro profile, status `completed`) or requests redo (status back to `ongoing`)

**Bid negotiation:** Each accept/counter/reject flips `awaitingResponseFrom` between `client` and `professional`. `negotiationHistory` appends every offer. The pro can only counter if `awaitingResponseFrom === 'professional'`; the client if `=== 'client'`.

**Real-time flow:** Backend emits socket events after DB mutations inside controllers. Relevant Zustand store listener handles it (e.g., `newBid` → `useBidStore.addBid()`). Components reactively re-render via Zustand subscriptions. `newNotification` events additionally call `useNotificationStore.addNotification()` in both socket init functions.

**Notification persistence:** `createNotification` always saves to MongoDB first, then emits the socket event. On page load, `fetchNotifications()` hits `GET /api/v1/notification` to hydrate the store from DB. This means notifications survive page refreshes.

---

## Deployment

- **Backend:** Render.com — `https://workifyy-cf1c.onrender.com`
- **Frontend:** Vercel — `https://workifyy-beta.vercel.app`
- CORS origins are hardcoded in `server.js` (localhost:5173 + Vercel URL)
- Socket.io origin is set to the same list in `utils/socket.utils.js`

When adding a new frontend origin, update both places in the backend.

## Frontend design
Always refere to the frontend design Skill.md