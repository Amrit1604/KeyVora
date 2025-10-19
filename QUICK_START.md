# 🚀 Quick Start Guide - CodedPad Pro Migration

## Step-by-Step Execution Plan

Follow these steps in order to successfully migrate and fix the project.

---

## Prerequisites

- Node.js v16+ installed
- npm or yarn installed
- Git installed
- Code editor (VS Code recommended)

---

## Phase 1: Initial Cleanup (START HERE)

### 1.1 Backup Current Project
```bash
cd c:\Users\amrit\OneDrive\Desktop\KeyVora\codedpad-pro
git init
git add .
git commit -m "Backup before migration"
```

### 1.2 Install Dependencies & Test Current State
```bash
npm install
npm start
```
*Note any errors - we'll fix them next*

### 1.3 Fix ESLint Errors (Backend)
Run:
```bash
npx eslint src --fix
```

---

## Phase 2: React Setup

### 2.1 Create Frontend Directory
```bash
# From project root
npm create vite@latest frontend -- --template react
cd frontend
```

### 2.2 Install Frontend Dependencies
```bash
npm install
npm install react-router-dom axios framer-motion react-icons lucide-react
npm install @monaco-editor/react react-markdown clsx date-fns nanoid
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 2.3 Setup TailwindCSS
Edit `frontend/tailwind.config.js`:
```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00ff41',
        secondary: '#0ff',
        accent: '#ff006e',
        background: '#0a0e27',
        surface: '#1a1f3a',
      },
      fontFamily: {
        heading: ['Orbitron', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}
```

---

## Phase 3: Restructure Project

### 3.1 Create Backend Directory
```bash
# From project root
mkdir backend
```

### 3.2 Move Backend Files
Move the following to `backend/`:
- `src/` → `backend/src/`
- `data/` → `backend/data/`
- `package.json` → `backend/package.json`
- Create new `backend/package.json` (cleaned up)

### 3.3 Update Backend Package.json
Create `backend/package.json`:
```json
{
  "name": "codedpad-backend",
  "version": "2.0.0",
  "type": "module",
  "main": "src/server.js",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "fs-extra": "^11.1.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "eslint": "^8.50.0"
  }
}
```

### 3.4 Install Backend Dependencies
```bash
cd backend
npm install
```

---

## Phase 4: Update Backend Code

### 4.1 Update `backend/src/app.js`
- Remove EJS
- Add CORS
- Remove view-related middleware
- Keep only API routes

### 4.2 Update `backend/src/routes/api.js`
- Clean REST API only
- Return JSON responses
- Proper error handling

### 4.3 Create `.env` File
Create `backend/.env`:
```env
NODE_ENV=development
PORT=4000
FRONTEND_URL=http://localhost:5173
```

### 4.4 Test Backend
```bash
cd backend
npm run dev
```
Visit `http://localhost:4000/api/pads` - should return JSON

---

## Phase 5: Build React Frontend

### 5.1 Create Folder Structure
```bash
cd frontend/src
mkdir components pages hooks contexts services utils assets
mkdir components/common components/layout components/pads
```

### 5.2 Update `frontend/src/index.css`
Add TailwindCSS directives + custom styles

### 5.3 Create Components (in order)
1. Common components (Button, Card, Input, Modal, etc.)
2. Layout components (Layout, Navbar, Footer)
3. Pad components (PadList, PadCard, PadEditor, etc.)
4. Pages (Home, Pads, EditPad, ViewPad)

### 5.4 Setup Routing
Create `frontend/src/App.jsx` with React Router

### 5.5 Create API Service
Create `frontend/src/services/api.js` for backend communication

---

## Phase 6: Implement Encryption

### 6.1 Create Encryption Service
Create `frontend/src/services/encryptionService.js`:
- Use Web Crypto API
- PBKDF2 + AES-GCM
- Proper key derivation

### 6.2 Create Encryption Hook
Create `frontend/src/hooks/useEncryption.js`

### 6.3 Integrate with Pad Editor
Add encryption toggle and password dialog

---

## Phase 7: Add Features & Polish

### 7.1 Add Search & Filter
### 7.2 Add Tags System
### 7.3 Add Export/Import
### 7.4 Add Animations (Framer Motion)
### 7.5 Add Keyboard Shortcuts

---

## Phase 8: Testing & Deployment

### 8.1 Test All Features
- Create/Edit/Delete pads
- Encryption/Decryption
- Search & Filter
- Responsive design
- Browser compatibility

### 8.2 Build for Production
```bash
cd frontend
npm run build
```

### 8.3 Update Root Package.json
Create `package.json` in root:
```json
{
  "name": "codedpad-pro",
  "version": "2.0.0",
  "scripts": {
    "dev": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\"",
    "dev:backend": "cd backend && npm run dev",
    "dev:frontend": "cd frontend && npm run dev",
    "build": "cd frontend && npm run build",
    "start": "cd backend && npm start"
  },
  "devDependencies": {
    "concurrently": "^8.2.1"
  }
}
```

Install concurrently:
```bash
npm install
```

### 8.4 Run Both Servers
```bash
npm run dev
```

---

## Files to Delete After Migration

Once React app is working, delete:
- `views/` (all EJS templates)
- `public/css/` (old CSS)
- `public/js/` (old JS)
- `scripts/dev.sh`
- `src/middleware/auth.js`
- `src/controllers/userController.js`
- `src/models/`
- `test/` (will create new tests later)

---

## Verification Checklist

- [ ] Backend runs on port 4000
- [ ] Frontend runs on port 5173
- [ ] Can create new pad
- [ ] Can edit pad
- [ ] Can delete pad
- [ ] Can view pad
- [ ] Encryption works
- [ ] Decryption works
- [ ] Search works
- [ ] Responsive on mobile
- [ ] No console errors
- [ ] Animations smooth
- [ ] UI looks modern

---

## Common Issues & Solutions

### Issue: CORS Error
**Solution**: Add CORS middleware in backend:
```javascript
app.use(cors({ origin: 'http://localhost:5173' }));
```

### Issue: API Not Found
**Solution**: Check Vite proxy configuration in `vite.config.js`

### Issue: Encryption Fails
**Solution**: Verify Web Crypto API is available (requires HTTPS or localhost)

### Issue: Build Fails
**Solution**: Check all imports and dependencies are installed

---

## Next Steps After Completion

1. Add database (MongoDB/PostgreSQL) instead of JSON files
2. Add user authentication
3. Add real-time collaboration
4. Add mobile app (React Native)
5. Add PWA support
6. Deploy to cloud (Vercel/Netlify + Railway/Render)

---

## Need Help?

Refer to:
- `MIGRATION_PLAN.md` - Detailed plan
- `docs/ARCHITECTURE.md` - Architecture overview
- `docs/API.md` - API documentation

---

**Ready? Let's start with Phase 1! 🚀**
