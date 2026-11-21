# NordicAgent Studio

En fullstack-plattform och demomiljö för skräddarsydda AI-agenter riktade mot både små och medelstora företag (kliniker, salonger, bilverkstäder) och större industriverksamheter – byggd med **Säkerhet först** i varje steg.

---

## Funktioner i plattformen

- **Säkerhet är första steget:** Riskbaserad strategi (*Identifiera → Bedöma → Åtgärda → Verifiera*), GDPR-dataminimering med samtyckesversionering, NIS2-anpassat tänk, härdade containers, rate limiting och incidentberedskap.
- **Interaktiv Orderagent:** Visar hur en AI-agent läser inkommande beställningar, jämför mot offert, skapar orderutkast och flaggar prisavvikelser för mänskligt godkännande.
- **Live-kalender & AI-assistent:** Exempelkalender för flera branscher (lediga tider, upptagna tider och sista minuten -50 %) samt en interaktiv AI-assistent där besökare kan dela sin verksamhetsidé live.
- **Verkliga företagsflöden:** Konkreta exempel för bl.a. bilverkstad (däckhotell, arbetsorder, godkännande av extraarbete, morgonsammanställning) samt inköps-, order-, service-, dokument-, kvalitets- och offertagenter.

---

## Teknikstack

- **Backend & Säkerhet:** Java 21, Spring Boot, Spring Security, JPA / Hibernate, PostgreSQL (med H2-läge för snabb lokal utveckling)
- **Frontend & 3D:** React, TypeScript, Vite, tillgänglig UI/UX (WCAG, fokusfälla, `prefers-reduced-motion`), WebGL / Three.js (förberett för Blender `.glb` & Spline)
- **DevOps & CI/CD:** Docker (non-root containers), GitHub Actions (Maven + TypeScript + secret-skanning) & Vercel (CSP, HSTS och säkerhetsheaders)

---

## Projektstruktur

```text
ai-agent-studio/
├── backend/                    # Java + Spring Boot + Spring Security + PostgreSQL
│   ├── pom.xml
│   ├── Dockerfile
│   └── src/main/
├── frontend/                   # React + TypeScript + Vite + Three.js / WebGL
│   ├── package.json
│   ├── vercel.json
│   └── src/
├── docker-compose.yml          # Lokal fullstack-miljö (PostgreSQL + Backend + Frontend)
├── .env.example                # Mall för lokala miljövariabler
└── .github/workflows/ci.yml    # Automatiserad CI-pipeline
```

---

## Kom igång lokalt

### 1. Klona repot & konfigurera miljövariabler
```bash
git clone https://github.com/ali456663/ai-agent-studio.git
cd ai-agent-studio
cp .env.example .env
```
*(Fyll i egna starka lösenord i `.env`. Committa aldrig `.env` till Git.)*

### 2. Starta med Docker
```bash
docker compose up --build
```

### 3. Eller kör manuellt
- **Backend:** Öppna `backend/pom.xml` som Maven-projekt och kör `NordicAgentApplication`.
- **Frontend:**
  ```bash
  cd frontend
  npm install
  npm run dev
  ```

---

## Säkerhet
Alla känsliga värden (databasuppgifter, CORS-ursprung och admin-inloggning) hanteras uteslutande via miljövariabler och lagras aldrig i källkoden.
