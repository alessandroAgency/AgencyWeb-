# AgencyOS — Marketing Platform

Piattaforma all-in-one per agenzie di marketing con 15 moduli integrati.

## 🚀 Deploy su Vercel (consigliato)

### Metodo 1 — Drag & Drop (più semplice)
1. Vai su [vercel.com](https://vercel.com) e crea un account gratuito
2. Estrai questa cartella sul tuo computer
3. Trascina la cartella `agency-platform` direttamente nel dashboard Vercel
4. Vercel rileva automaticamente Vite/React e fa il deploy
5. Ricevi un URL pubblico tipo `https://agency-platform-xxx.vercel.app`

### Metodo 2 — Via GitHub
1. Crea un repository GitHub e carica questa cartella
2. Su Vercel, clicca "New Project" → "Import Git Repository"
3. Seleziona il repository → clicca "Deploy"
4. Ogni push su GitHub aggiorna automaticamente il sito

## 💻 Sviluppo locale

Assicurati di avere **Node.js 18+** installato ([nodejs.org](https://nodejs.org)).

```bash
# 1. Installa dipendenze
npm install

# 2. Avvia in modalità sviluppo
npm run dev

# 3. Apri nel browser
# http://localhost:5173
```

## 🏗️ Build per produzione

```bash
# Crea la build ottimizzata
npm run build

# Testa la build in locale
npm run preview
```

La cartella `dist/` contiene i file pronti per qualsiasi server web.

## 📦 Deploy su Netlify

1. Vai su [netlify.com](https://netlify.com)
2. Clicca "Add new site" → "Deploy manually"
3. Esegui `npm run build` in locale
4. Trascina la cartella `dist/` su Netlify
5. Il sito è online in 30 secondi

## 🔧 Struttura progetto

```
agency-platform/
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx          ← Tutti i 15 moduli della piattaforma
│   ├── main.jsx         ← Entry point React
│   └── index.css        ← Stili globali + Tailwind
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 📋 Moduli inclusi

| Modulo | Descrizione |
|--------|-------------|
| CRM | Gestione clienti e pipeline vendita |
| Client Portal | Area riservata clienti |
| Project Tracker | Kanban campagne e task |
| KPI Dashboard | Analytics aggregata |
| Report Generator | Report PDF automatici |
| Social Analytics | Performance per canale |
| Copy Generator AI | Testi ads/email/social |
| Content Calendar | Pianificazione editoriale |
| A/B Test Manager | Confronto varianti |
| Email Builder | Campagne email |
| Lead Scoring | Punteggio contatti |
| Chatbot Builder | Widget lead generation |
| ROI Calculator | Calcolo ritorno investimento |
| SEO Audit | Analisi sito web |
| Preventivatore | Configuratore servizi |
