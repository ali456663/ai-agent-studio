# NordicAgent Studio – Fullstack AI-agentbyrå

Fullstack-projekt på **D:-disken** (`D:\aliwa\Projects\ai-agent-studio`) med **Java + Spring Boot + Spring Security + PostgreSQL** (port **8087**) och **React + TypeScript + CSS/HTML + WebGL / Three.js** (redo för **Blender `.glb`** & **Spline**).

---

## Projektstruktur i IntelliJ IDEA

```text
ai-agent-studio/
├── backend/                                        # Java + Spring Boot + Spring Security + PostgreSQL (port 8087)
│   ├── pom.xml                                     # ← Högerklicka "Add as Maven Project" i IntelliJ IDEA
│   ├── Dockerfile
│   └── src/main/
│       ├── java/se/nordicagent/studio/
│       │   ├── NordicAgentApplication.java         # ← Starta Spring Boot här!
│       │   ├── config/SecurityConfig.java          # Spring Security, CORS, BCrypt, Least Privilege
│       │   ├── controller/                         # /api/health, /api/demo/**, /api/leads, /api/admin/leads
│       │   ├── dto/                                # Validerade request/response-objekt
│       │   ├── model/Lead.java                     # JPA-entitet -> PostgreSQL-tabell "leads"
│       │   ├── repository/LeadRepository.java
│       │   └── service/
│       └── resources/application.yml               # Port 8087 + PostgreSQL env vars
│
├── frontend/                                       # React + TypeScript + Vite + WebGL/Three.js (Blender & Spline)
│   ├── package.json
│   ├── vite.config.ts                              # Proxar /api -> http://localhost:8087
│   ├── vercel.json                                 # Säkerhetsheaders (CSP, HSTS m.m.) för Vercel
│   ├── public/models/README.md                     # Guide för Blender (.glb) & Spline
│   └── src/
│       ├── App.tsx
│       ├── styles.css
│       ├── api/client.ts                           # Typad REST-klient mot Spring Boot (8087)
│       └── components/
│           ├── Hero3DCanvas.tsx                    # Interaktiv WebGL/Three.js + Blender GLTFLoader + Spline
│           ├── DemoSection.tsx                     # Kalender-API + AI-chatt
│           ├── ContactForm.tsx                     # POST /api/leads -> PostgreSQL
│           └── LegalModal.tsx                      # GDPR & Säkerhet/NIS2
│
├── docker-compose.yml                              # PostgreSQL 16 + Backend (8087) + Frontend (3000)
├── .env.example                                    # Kopiera till .env lokalt
└── .github/workflows/ci.yml                        # GitHub Actions (Java/Maven + TypeScript/Vite + Security)
```

---

## 1. Öppna i IntelliJ IDEA
1. Öppna `D:\aliwa\Projects\ai-agent-studio` i **IntelliJ IDEA**.
2. Högerklicka på `backend/pom.xml` → **Add as Maven Project** (så laddar IntelliJ ned Spring Boot, Spring Security och PostgreSQL-drivrutinen automatiskt).
3. Starta `NordicAgentApplication.java` (kör på **port `8087`**).

## 2. Kör Frontend (React + TypeScript + Three.js)
Öppna terminalen i IntelliJ IDEA:
```powershell
cd D:\aliwa\Projects\ai-agent-studio\frontend
npm.cmd install
npm.cmd run dev
```
Öppna `http://localhost:5173` (alla `/api`-anrop skickas automatiskt till Spring Boot på `http://localhost:8087`).

## 3. Kör hela stacken med Docker (PostgreSQL + Backend 8087 + Frontend 3000)
När Docker Desktop är igång:
```powershell
copy .env.example .env
docker compose up --build
```
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:8087/api/health`
- PostgreSQL: `localhost:5432`

## 4. Publicera på GitHub + GitHub Actions + Vercel
1. Pusha till GitHub:
   ```powershell
   git add .
   git commit -m "Fullstack: Spring Boot (8087) + PostgreSQL + React/TS/Three.js"
   git branch -M main
   git push -u origin main
   ```
2. På **Vercel**: Importera GitHub-repot, sätt **Root Directory** till `frontend` och klicka **Deploy**.
   *(När du senare driftar Spring Boot + PostgreSQL publikt, lägg till miljövariabeln `VITE_API_BASE_URL` i Vercel.)*
