# Lead-Management-App

A minimal Lead Management application — **Node/Express** backend (MongoDB + Mongoose) and **Next.js** frontend.
Add and list leads with status using a small, usable UI. Frontend uses `axios` for API calls and `lucide-react` for icons.

---

## Demo (local)

* Backend: `http://localhost:4000`
* Frontend: `http://localhost:3000`

---

## Features

* REST API: `GET /leads`, `POST /leads`
* Lead fields: `name`, `email` (unique), `status`, `createdAt`
* Next.js frontend using `axios` and `lucide-react` icons
* Client-side validation and error handling (alerts for API errors)
* New leads appear at the top (most recent first)

---

## Getting started (local)

### 1. Clone

```bash
git clone https://github.com/Imanuelchibuzor/Lead-App.git
cd Lead-App
```

### 2. Backend

1. Enter backend folder:

```bash
cd backend
```

2. Create `.env`:

```env
MONGO_URI=<mongo_connection_string>

```

3. Install & run:

```bash
npm install
npm run dev
```

Backend should be available at `http://localhost:4000`.

### 3. Frontend

1. In a new terminal, enter frontend folder:

```bash
cd frontend
```

2. Install & run:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

---

## API

### GET /leads

* Description: Fetch all leads (most recent first)
* Response:

```json
{
  "success": true,
  "data": [
    {
      "name": "Jane Doe",
      "email": "jane@example.com",
      "status": "New",
      "date": "2025-09-19, 13:05"
    }
  ]
}
```

### POST /leads

* Description: Create a new lead
* Request body:

```json
{ "name": "Jane Doe", "email": "jane@example.com", "status": "New" }
```

* Success: `201` with created lead
* Duplicate email: `409` with JSON `{ "success": false, "message": "Email already exists" }`

---

## Scripts

**Backend `backend/package.json`**

```json
{
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  }
}
```

**Frontend `frontend/package.json`**

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build --turbopack",
    "start": "next start",
    "lint": "eslint"
  }
}
```

## Deployment

* Frontend: Vercel
* Backend: Render (set `MONGO_URI` in environment variables)
* Ensure CORS on backend allows your frontend origin in production.
