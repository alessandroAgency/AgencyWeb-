import { useState, useMemo } from "react"
import {
  Users, FolderKanban, LayoutDashboard, FileBarChart2, Share2,
  Wand2, CalendarDays, FlaskConical, Mail, Star, Bot, Calculator,
  Search, Receipt, ChevronDown, ChevronRight, Plus, X, Check,
  TrendingUp, TrendingDown, Eye, Edit2, Trash2, Send, BarChart3,
  PieChart, Target, Zap, Clock, AlertCircle, CheckCircle2, Circle,
  ArrowRight, Globe, RefreshCw, Download, Filter, Bell, Settings,
  LogOut, Menu, ExternalLink, Copy, Layers, MessageSquare, Tag
} from "lucide-react"
import {
  LineChart, Line, BarChart, Bar, PieChart as RePieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area
} from "recharts"


const CLIENTS = [
  { id: 1, name: "Sportiva Milano", contact: "Luca Ferrari", email: "luca@sportivami.it", phone: "+39 02 1234567", stage: "Cliente attivo", budget: 4500, tags: ["ecommerce","social"], score: 88 },
  { id: 2, name: "Wellness360", contact: "Anna Ricci", email: "anna@wellness360.it", phone: "+39 03 9876543", stage: "Proposta inviata", budget: 2800, tags: ["lead gen","SEO"], score: 72 },
  { id: 3, name: "TechnoStart SRL", contact: "Marco Bianchi", email: "m.bianchi@technostart.it", phone: "+39 02 5554433", stage: "Qualificato", budget: 7200, tags: ["B2B","ads"], score: 61 },
  { id: 4, name: "Casa Dolce Casa", contact: "Sofia Mancini", email: "sofia@casadolce.it", phone: "+39 06 2223344", stage: "Lead", budget: 1200, tags: ["social","content"], score: 34 },
  { id: 5, name: "GourmetPro", contact: "Roberto Esposito", email: "r.esposito@gourmetpro.it", phone: "+39 081 9988776", stage: "Cliente attivo", budget: 5800, tags: ["ads","email"], score: 91 },
  { id: 6, name: "AutoFleet Italia", contact: "Chiara Russo", email: "chiara@autofleet.it", phone: "+39 011 7766554", stage: "Vinto", budget: 9500, tags: ["B2B","ads","SEO"], score: 95 },
]

const PROJECTS = [
  { id: 1, clientId: 1, name: "Campagna Estate 2026", status: "In corso", deadline: "2026-06-30", budget: 3200, progress: 65, tasks: [
    { id: 1, text: "Brief creativo", done: true, assignee: "Sara" },
    { id: 2, text: "Realizzazione grafiche", done: true, assignee: "Marco" },
    { id: 3, text: "Setup campagna Meta", done: false, assignee: "Giulia" },
    { id: 4, text: "Approvazione cliente", done: false, assignee: "Sara" },
  ]},
  { id: 2, clientId: 5, name: "Email Marketing Q2", status: "In corso", deadline: "2026-05-15", budget: 1500, progress: 30, tasks: [
    { id: 1, text: "Segmentazione lista", done: true, assignee: "Marco" },
    { id: 2, text: "Template design", done: false, assignee: "Giulia" },
    { id: 3, text: "Copywriting email", done: false, assignee: "Sara" },
  ]},
  { id: 3, clientId: 6, name: "SEO & Content Plan", status: "Completato", deadline: "2026-03-10", budget: 4800, progress: 100, tasks: [
    { id: 1, text: "Audit SEO", done: true, assignee: "Marco" },
    { id: 2, text: "Keyword research", done: true, assignee: "Sara" },
    { id: 3, text: "Piano editoriale", done: true, assignee: "Giulia" },
  ]},
  { id: 4, clientId: 2, name: "Lead Gen Landing Page", status: "In attesa", deadline: "2026-04-20", budget: 950, progress: 10, tasks: [
    { id: 1, text: "Wireframe", done: true, assignee: "Marco" },
    { id: 2, text: "Sviluppo pagina", done: false, assignee: "Dev" },
    { id: 3, text: "Integrazione CRM", done: false, assignee: "Marco" },
  ]},
]

const KPI_MONTHLY = [
  { month: "Ott", impression: 142000, click: 8200, lead: 320, conversioni: 48, spesa: 3200 },
  { month: "Nov", impression: 168000, click: 9400, lead: 380, conversioni: 57, spesa: 3800 },
  { month: "Dic", impression: 195000, click: 11200, lead: 290, conversioni: 43, spesa: 2900 },
  { month: "Gen", impression: 178000, click: 10300, lead: 420, conversioni: 63, spesa: 4100 },
  { month: "Feb", impression: 210000, click: 12800, lead: 510, conversioni: 78, spesa: 4700 },
  { month: "Mar", impression: 245000, click: 15100, lead: 590, conversioni: 92, spesa: 5200 },
]

const SOCIAL_DATA = [
  { channel: "Meta Ads", reach: 98000, engagement: 4.2, lead: 210, cpl: 12.4, color: "#1877f2" },
  { channel: "Google Ads", reach: 72000, engagement: 2.8, lead: 185, cpl: 15.1, color: "#ea4335" },
  { channel: "LinkedIn", reach: 28000, engagement: 3.6, lead: 88, cpl: 28.7, color: "#0a66c2" },
  { channel: "TikTok", reach: 54000, engagement: 6.9, lead: 62, cpl: 9.8, color: "#010101" },
  { channel: "Email", reach: 12400, engagement: 22.1, lead: 45, cpl: 4.2, color: "#f59e0b" },
]

const CONTENT_POSTS = [
  { id: 1, day: 3, month: 2, title: "Post Instagram - Primavera promo", channel: "Instagram", status: "Approvato", client: "Sportiva Milano" },
  { id: 2, day: 7, month: 2, title: "Articolo blog SEO", channel: "Blog", status: "In revisione", client: "AutoFleet Italia" },
  { id: 3, day: 10, month: 2, title: "Story prodotto", channel: "Instagram", status: "Bozza", client: "GourmetPro" },
  { id: 4, day: 14, month: 2, title: "Post LinkedIn B2B", channel: "LinkedIn", status: "Approvato", client: "TechnoStart SRL" },
  { id: 5, day: 18, month: 2, title: "Reel promozionale", channel: "TikTok", status: "Bozza", client: "Wellness360" },
  { id: 6, day: 21, month: 2, title: "Newsletter mensile", channel: "Email", status: "Schedulato", client: "GourmetPro" },
  { id: 7, day: 25, month: 2, title: "Carosello Instagram", channel: "Instagram", status: "In revisione", client: "Sportiva Milano" },
  { id: 8, day: 28, month: 2, title: "Post Facebook offerta", channel: "Facebook", status: "Approvato", client: "Casa Dolce Casa" },
]

const AB_TESTS = [
  { id: 1, name: "Headline Ads - Sportiva", variantA: "Allenati Meglio con Noi", variantB: "Il Tuo Sport, Il Tuo Ritmo", metricA: 3.4, metricB: 4.8, status: "Vincitore: B", impressioni: 12400 },
  { id: 2, name: "CTA Email - GourmetPro", variantA: "Scopri il Menù", variantB: "Ordina Ora", metricA: 18.2, metricB: 22.7, status: "In corso", impressioni: 5800 },
  { id: 3, name: "Landing Page CTA", variantA: "Richiedi Info", variantB: "Inizia Gratis", metricA: 2.1, metricB: 3.9, status: "Vincitore: B", impressioni: 8900 },
  { id: 4, name: "Subject Email - Wellness", variantA: "La tua salute inizia qui", variantB: "30 giorni per stare meglio", metricA: 24.5, metricB: 19.8, status: "Vincitore: A", impressioni: 3200 },
]

const LEADS = [
  { id: 1, name: "Fabio Conti", email: "f.conti@email.it", score: 87, source: "Landing Page", actions: ["Aperto email x3", "Visitato pricing", "Download PDF"], stage: "Caldo" },
  { id: 2, name: "Laura Neri", email: "laura.neri@company.it", score: 62, source: "LinkedIn Ads", actions: ["Aperto email x1", "Visitato homepage"], stage: "Tiepido" },
  { id: 3, name: "Giovanni Ferri", email: "g.ferri@outlook.it", score: 31, source: "Google Ads", actions: ["Clic ads"], stage: "Freddo" },
  { id: 4, name: "Valentina Costa", email: "v.costa@studio.it", score: 94, source: "Referral", actions: ["Demo richiesta", "Aperto email x5", "Visitato pricing x3"], stage: "Caldo" },
  { id: 5, name: "Matteo Serra", email: "m.serra@azienda.it", score: 45, source: "Meta Ads", actions: ["Aperto email x2", "Visitato blog"], stage: "Tiepido" },
]

// ─────────────────────────────────────────────
// SHARED COMPONENTS
// ─────────────────────────────────────────────
const Badge = ({ text, color = "blue" }) => {
  const colors = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    red: "bg-red-100 text-red-700",
    purple: "bg-purple-100 text-purple-700",
    gray: "bg-gray-100 text-gray-600",
  }
  return <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${colors[color]}`}>{text}</span>
}

const stageColor = (s) => {
  if (s === "Cliente attivo" || s === "Vinto") return "green"
  if (s === "Proposta inviata") return "blue"
  if (s === "Qualificato") return "purple"
  if (s === "Lead") return "yellow"
  return "gray"
}

const statusColor = (s) => {
  if (s === "Completato" || s === "Approvato" || s === "Schedulato") return "green"
  if (s === "In corso") return "blue"
  if (s === "In attesa" || s === "In revisione") return "yellow"
  if (s === "Bozza") return "gray"
  return "gray"
}

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-100 p-5 ${className}`}>{children}</div>
)

const StatCard = ({ label, value, sub, icon: Icon, trend, color = "blue" }) => {
  const bg = { blue: "bg-blue-50 text-blue-600", green: "bg-green-50 text-green-600", purple: "bg-purple-50 text-purple-600", amber: "bg-amber-50 text-amber-600" }
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
          {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
        </div>
        <div className={`p-2 rounded-lg ${bg[color]}`}><Icon size={20} /></div>
      </div>
      {trend !== undefined && (
        <div className={`flex items-center gap-1 mt-3 text-xs font-medium ${trend >= 0 ? "text-green-600" : "text-red-500"}`}>
          {trend >= 0 ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
          {Math.abs(trend)}% vs mese scorso
        </div>
      )}
    </Card>
  )
}

const SectionHeader = ({ title, subtitle, action }) => (
  <div className="flex items-start justify-between mb-6">
    <div>
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
    </div>
    {action}
  </div>
)

// ─────────────────────────────────────────────
// 1. CRM
// ─────────────────────────────────────────────
const CRM = () => {
  const [clients, setClients] = useState(CLIENTS)
  const [search, setSearch] = useState("")
  const [filter, setFilterStage] = useState("Tutti")
  const [showForm, setShowForm] = useState(false)
  const [selected, setSelected] = useState(null)
  const [form, setForm] = useState({ name: "", contact: "", email: "", phone: "", stage: "Lead", budget: "" })

  const stages = ["Tutti", "Lead", "Qualificato", "Proposta inviata", "Cliente attivo", "Vinto"]
  const filtered = clients.filter(c =>
    (filter === "Tutti" || c.stage === filter) &&
    (c.name.toLowerCase().includes(search.toLowerCase()) || c.contact.toLowerCase().includes(search.toLowerCase()))
  )

  const save = () => {
    if (!form.name) return
    if (selected) {
      setClients(cs => cs.map(c => c.id === selected.id ? { ...c, ...form, budget: Number(form.budget) } : c))
    } else {
      setClients(cs => [...cs, { ...form, id: Date.now(), budget: Number(form.budget), tags: [], score: Math.floor(Math.random() * 40) + 20 }])
    }
    setShowForm(false); setSelected(null); setForm({ name: "", contact: "", email: "", phone: "", stage: "Lead", budget: "" })
  }

  const del = (id) => setClients(cs => cs.filter(c => c.id !== id))
  const edit = (c) => { setSelected(c); setForm({ name: c.name, contact: c.contact, email: c.email, phone: c.phone, stage: c.stage, budget: c.budget }); setShowForm(true) }

  return (
    <div>
      <SectionHeader title="CRM — Gestione Clienti" subtitle={`${clients.length} contatti totali`} action={
        <button onClick={() => { setSelected(null); setForm({ name: "", contact: "", email: "", phone: "", stage: "Lead", budget: "" }); setShowForm(true) }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
          <Plus size={15} /> Nuovo Cliente
        </button>
      } />

      {showForm && (
        <Card className="mb-6 border-blue-200">
          <h3 className="font-semibold text-gray-700 mb-4">{selected ? "Modifica Cliente" : "Nuovo Cliente"}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[["Azienda", "name"], ["Referente", "contact"], ["Email", "email"], ["Telefono", "phone"]].map(([label, key]) => (
              <div key={key}>
                <label className="text-xs text-gray-500 mb-1 block">{label}</label>
                <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={form[key]}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} />
              </div>
            ))}
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Fase</label>
              <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={form.stage}
                onChange={e => setForm(f => ({ ...f, stage: e.target.value }))}>
                {stages.slice(1).map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Budget mensile (€)</label>
              <input type="number" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={form.budget}
                onChange={e => setForm(f => ({ ...f, budget: e.target.value }))} />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button onClick={save} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-1"><Check size={14} /> Salva</button>
            <button onClick={() => setShowForm(false)} className="border border-gray-200 px-4 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50">Annulla</button>
          </div>
        </Card>
      )}

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-2.5 text-gray-400" />
          <input placeholder="Cerca cliente o referente…" className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm"
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-1 flex-wrap">
          {stages.map(s => (
            <button key={s} onClick={() => setFilterStage(s)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${filter === s ? "bg-blue-600 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr className="text-left border-b border-gray-100">
              {["Azienda", "Referente", "Fase", "Budget/mese", "Score", "Tag", ""].map(h => (
                <th key={h} className="pb-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="py-3 font-medium text-gray-800">{c.name}</td>
                <td className="py-3 text-gray-600">
                  <div>{c.contact}</div>
                  <div className="text-xs text-gray-400">{c.email}</div>
                </td>
                <td className="py-3"><Badge text={c.stage} color={stageColor(c.stage)} /></td>
                <td className="py-3 font-medium">€{c.budget.toLocaleString()}</td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${c.score >= 80 ? "bg-green-500" : c.score >= 50 ? "bg-yellow-500" : "bg-red-400"}`}
                        style={{ width: `${c.score}%` }} />
                    </div>
                    <span className="text-xs text-gray-500">{c.score}</span>
                  </div>
                </td>
                <td className="py-3"><div className="flex gap-1 flex-wrap">{c.tags.map(t => <Badge key={t} text={t} color="gray" />)}</div></td>
                <td className="py-3">
                  <div className="flex gap-2">
                    <button onClick={() => edit(c)} className="text-gray-400 hover:text-blue-600"><Edit2 size={14} /></button>
                    <button onClick={() => del(c.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </Card>
    </div>
  )
}

// ─────────────────────────────────────────────
// 2. CLIENT PORTAL
// ─────────────────────────────────────────────
const ClientPortal = () => {
  const [activeClient, setActiveClient] = useState(CLIENTS[0])
  const [tab, setTab] = useState("overview")
  const clientProjects = PROJECTS.filter(p => p.clientId === activeClient.id)

  return (
    <div>
      <SectionHeader title="Client Portal" subtitle="Area riservata clienti — visualizza come il cliente" />
      <div className="flex gap-3 mb-6 overflow-x-auto pb-1">
        {CLIENTS.filter(c => c.stage === "Cliente attivo" || c.stage === "Vinto").map(c => (
          <button key={c.id} onClick={() => setActiveClient(c)}
            className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${activeClient.id === c.id ? "bg-blue-600 text-white border-blue-600" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
            {c.name}
          </button>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-5 text-white mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm">Benvenuto nel tuo portale</p>
            <h3 className="text-xl font-bold mt-0.5">{activeClient.name}</h3>
            <p className="text-blue-200 text-sm mt-1">Referente: {activeClient.contact}</p>
          </div>
          <div className="text-right">
            <p className="text-blue-100 text-xs">Budget mensile</p>
            <p className="text-2xl font-bold">€{activeClient.budget.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-1 mb-5 border-b border-gray-200">
        {[["overview","Overview"],["projects","Progetti"],["reports","Report"],["messages","Messaggi"]].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${tab === key ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
            {label}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="grid grid-cols-3 gap-4">
          <StatCard label="Progetti attivi" value={clientProjects.filter(p=>p.status==="In corso").length} icon={FolderKanban} color="blue" />
          <StatCard label="Budget mensile" value={`€${activeClient.budget.toLocaleString()}`} icon={Target} color="green" />
          <StatCard label="Lead score" value={activeClient.score} sub="su 100" icon={Star} color="purple" />
          {clientProjects.length === 0 && <Card className="col-span-3"><p className="text-gray-400 text-sm text-center py-4">Nessun progetto attivo per questo cliente</p></Card>}
          {clientProjects.map(p => (
            <Card key={p.id} className="col-span-3">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-gray-800">{p.name}</span>
                <Badge text={p.status} color={statusColor(p.status)} />
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${p.progress}%` }} />
                </div>
                <span className="text-sm font-medium text-gray-600">{p.progress}%</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4">
                {p.tasks.map(t => (
                  <div key={t.id} className="flex items-center gap-2 text-sm">
                    {t.done ? <CheckCircle2 size={14} className="text-green-500" /> : <Circle size={14} className="text-gray-300" />}
                    <span className={t.done ? "line-through text-gray-400" : "text-gray-700"}>{t.text}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === "projects" && (
        <div className="space-y-4">
          {clientProjects.length === 0 ? <Card><p className="text-center text-gray-400 py-6">Nessun progetto trovato</p></Card> :
            clientProjects.map(p => (
              <Card key={p.id}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-800">{p.name}</h4>
                    <p className="text-sm text-gray-500 mt-1">Scadenza: {new Date(p.deadline).toLocaleDateString("it-IT")}</p>
                  </div>
                  <Badge text={p.status} color={statusColor(p.status)} />
                </div>
                <div className="mt-4 space-y-2">
                  {p.tasks.map(t => (
                    <div key={t.id} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
                      {t.done ? <CheckCircle2 size={15} className="text-green-500" /> : <Circle size={15} className="text-gray-300" />}
                      <span className={`text-sm flex-1 ${t.done ? "line-through text-gray-400" : "text-gray-700"}`}>{t.text}</span>
                      <span className="text-xs text-gray-400">@{t.assignee}</span>
                    </div>
                  ))}
                </div>
              </Card>
            ))
          }
        </div>
      )}

      {tab === "reports" && (
        <div className="space-y-3">
          {["Report Marzo 2026", "Report Febbraio 2026", "Report Gennaio 2026"].map((r, i) => (
            <Card key={i}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg"><FileBarChart2 size={18} className="text-blue-600" /></div>
                  <div>
                    <p className="font-medium text-gray-800">{r}</p>
                    <p className="text-xs text-gray-400">PDF · Generato automaticamente</p>
                  </div>
                </div>
                <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700">
                  <Download size={14} /> Scarica
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {tab === "messages" && (
        <Card>
          <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
            {[
              { from: "Team Agency", msg: "Abbiamo caricato le bozze grafiche per la campagna estiva. Attendo il tuo feedback!", time: "oggi, 11:32", mine: false },
              { from: activeClient.contact, msg: "Perfetto, le guardo entro domani.", time: "oggi, 12:05", mine: true },
              { from: "Team Agency", msg: "Aggiornamento: la campagna è live da questa mattina.", time: "ieri, 09:15", mine: false },
            ].map((m, i) => (
              <div key={i} className={`flex ${m.mine ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-xs rounded-xl px-4 py-2.5 text-sm ${m.mine ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"}`}>
                  {!m.mine && <p className="text-xs font-semibold mb-1 text-blue-600">{m.from}</p>}
                  <p>{m.msg}</p>
                  <p className={`text-xs mt-1 ${m.mine ? "text-blue-200" : "text-gray-400"}`}>{m.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 border-t border-gray-100 pt-4">
            <input placeholder="Scrivi un messaggio…" className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm" />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg"><Send size={15} /></button>
          </div>
        </Card>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────
// 3. PROJECT TRACKER
// ─────────────────────────────────────────────
const ProjectTracker = () => {
  const [projects, setProjects] = useState(PROJECTS)
  const [selected, setSelected] = useState(null)

  const toggleTask = (pId, tId) => {
    setProjects(ps => ps.map(p => p.id === pId
      ? { ...p, tasks: p.tasks.map(t => t.id === tId ? { ...t, done: !t.done } : t) }
      : p))
  }

  const columns = ["In attesa", "In corso", "Completato"]
  const colColor = { "In attesa": "yellow", "In corso": "blue", "Completato": "green" }

  return (
    <div>
      <SectionHeader title="Project Tracker" subtitle="Gestione campagne e task" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard label="Progetti totali" value={projects.length} icon={FolderKanban} color="blue" />
        <StatCard label="In corso" value={projects.filter(p => p.status === "In corso").length} icon={Clock} color="purple" />
        <StatCard label="Completati" value={projects.filter(p => p.status === "Completato").length} icon={CheckCircle2} color="green" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map(col => (
          <div key={col}>
            <div className="flex items-center gap-2 mb-3">
              <Badge text={col} color={colColor[col]} />
              <span className="text-xs text-gray-400">{projects.filter(p => p.status === col).length}</span>
            </div>
            <div className="space-y-3">
              {projects.filter(p => p.status === col).map(p => {
                const client = CLIENTS.find(c => c.id === p.clientId)
                const done = p.tasks.filter(t => t.done).length
                return (
                  <div key={p.id} onClick={() => setSelected(selected?.id === p.id ? null : p)}
                    className="bg-white rounded-xl border border-gray-100 p-4 cursor-pointer hover:shadow-sm transition-shadow">
                    <p className="font-medium text-gray-800 text-sm">{p.name}</p>
                    <p className="text-xs text-gray-400 mt-1">{client?.name}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                        <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${p.progress}%` }} />
                      </div>
                      <span className="text-xs text-gray-500">{p.progress}%</span>
                    </div>
                    <div className="flex justify-between mt-3 text-xs text-gray-400">
                      <span>✓ {done}/{p.tasks.length} task</span>
                      <span>📅 {new Date(p.deadline).toLocaleDateString("it-IT", { day: "numeric", month: "short" })}</span>
                    </div>
                    {selected?.id === p.id && (
                      <div className="mt-3 pt-3 border-t border-gray-100 space-y-2" onClick={e => e.stopPropagation()}>
                        {p.tasks.map(t => (
                          <div key={t.id} className="flex items-center gap-2 cursor-pointer" onClick={() => toggleTask(p.id, t.id)}>
                            {t.done ? <CheckCircle2 size={14} className="text-green-500 flex-shrink-0" /> : <Circle size={14} className="text-gray-300 flex-shrink-0" />}
                            <span className={`text-xs flex-1 ${t.done ? "line-through text-gray-400" : "text-gray-700"}`}>{t.text}</span>
                            <span className="text-xs text-gray-400">@{t.assignee}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// 4. KPI DASHBOARD
// ─────────────────────────────────────────────
const KPIDashboard = () => {
  const last = KPI_MONTHLY[KPI_MONTHLY.length - 1]
  const prev = KPI_MONTHLY[KPI_MONTHLY.length - 2]
  const pct = (a, b) => Math.round(((a - b) / b) * 100)

  return (
    <div>
      <SectionHeader title="Dashboard KPI" subtitle="Performance aggregata — ultimi 6 mesi" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Impressioni" value={`${(last.impression / 1000).toFixed(0)}k`} icon={Eye} trend={pct(last.impression, prev.impression)} color="blue" />
        <StatCard label="Click totali" value={`${(last.click / 1000).toFixed(1)}k`} icon={Target} trend={pct(last.click, prev.click)} color="purple" />
        <StatCard label="Lead generati" value={last.lead} icon={Users} trend={pct(last.lead, prev.lead)} color="green" />
        <StatCard label="Conversioni" value={last.conversioni} icon={CheckCircle2} trend={pct(last.conversioni, prev.conversioni)} color="amber" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Card>
          <h3 className="font-semibold text-gray-700 mb-4">Impressioni & Click</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={KPI_MONTHLY}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Area type="monotone" dataKey="impression" stroke="#3b82f6" fill="#dbeafe" name="Impressioni" />
              <Area type="monotone" dataKey="click" stroke="#8b5cf6" fill="#ede9fe" name="Click" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <h3 className="font-semibold text-gray-700 mb-4">Lead & Conversioni</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={KPI_MONTHLY}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="lead" fill="#10b981" name="Lead" radius={[3,3,0,0]} />
              <Bar dataKey="conversioni" fill="#f59e0b" name="Conversioni" radius={[3,3,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card>
        <h3 className="font-semibold text-gray-700 mb-4">Spesa pubblicitaria mensile (€)</h3>
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={KPI_MONTHLY}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip formatter={v => `€${v.toLocaleString()}`} />
            <Line type="monotone" dataKey="spesa" stroke="#6366f1" strokeWidth={2} dot={{ r: 4 }} name="Spesa €" />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}

// ─────────────────────────────────────────────
// 5. REPORT GENERATOR
// ─────────────────────────────────────────────
const ReportGenerator = () => {
  const [form, setForm] = useState({ client: CLIENTS[0].id, period: "Marzo 2026", include: { kpi: true, social: true, projects: true, recommendations: true } })
  const [generated, setGenerated] = useState(false)

  const client = CLIENTS.find(c => c.id === Number(form.client))

  return (
    <div>
      <SectionHeader title="Report Generator" subtitle="Crea report automatici brandizzati da inviare ai clienti" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Card>
            <h3 className="font-semibold text-gray-700 mb-4">Configurazione Report</h3>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Cliente</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                  value={form.client} onChange={e => setForm(f => ({ ...f, client: e.target.value }))}>
                  {CLIENTS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Periodo</label>
                <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                  value={form.period} onChange={e => setForm(f => ({ ...f, period: e.target.value }))} />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-2 block">Sezioni da includere</label>
                {[["kpi", "Riepilogo KPI"], ["social", "Performance Social"], ["projects", "Stato Progetti"], ["recommendations", "Raccomandazioni AI"]].map(([key, label]) => (
                  <label key={key} className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input type="checkbox" checked={form.include[key]}
                      onChange={e => setForm(f => ({ ...f, include: { ...f.include, [key]: e.target.checked } }))}
                      className="rounded" />
                    <span className="text-sm text-gray-700">{label}</span>
                  </label>
                ))}
              </div>
              <button onClick={() => setGenerated(true)}
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center justify-center gap-2">
                <Zap size={15} /> Genera Report
              </button>
            </div>
          </Card>
        </div>

        <Card>
          {!generated ? (
            <div className="h-full flex items-center justify-center text-center">
              <div>
                <FileBarChart2 size={48} className="text-gray-200 mx-auto mb-3" />
                <p className="text-gray-400 text-sm">Configura e genera il report</p>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Anteprima Report</h3>
                <div className="flex gap-2">
                  <button className="flex items-center gap-1 text-xs border border-gray-200 px-3 py-1.5 rounded-lg text-gray-600 hover:bg-gray-50"><Download size={13} /> PDF</button>
                  <button className="flex items-center gap-1 text-xs border border-gray-200 px-3 py-1.5 rounded-lg text-gray-600 hover:bg-gray-50"><Send size={13} /> Invia</button>
                </div>
              </div>
              <div className="border border-gray-200 rounded-xl p-4 space-y-4 text-sm">
                <div className="bg-blue-600 text-white rounded-lg p-4">
                  <p className="text-xs text-blue-200 uppercase tracking-wide">Report Mensile</p>
                  <p className="font-bold text-lg mt-1">{client?.name}</p>
                  <p className="text-blue-200 text-sm">{form.period}</p>
                </div>
                {form.include.kpi && (
                  <div>
                    <p className="font-semibold text-gray-700 mb-2 flex items-center gap-1"><BarChart3 size={14} /> KPI del mese</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[["Impressioni", "245.000"], ["Click", "15.100"], ["Lead", "590"], ["Conversioni", "92"]].map(([k, v]) => (
                        <div key={k} className="bg-gray-50 rounded-lg p-2"><p className="text-xs text-gray-400">{k}</p><p className="font-bold text-gray-800">{v}</p></div>
                      ))}
                    </div>
                  </div>
                )}
                {form.include.recommendations && (
                  <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
                    <p className="font-semibold text-amber-800 text-xs mb-1">💡 Raccomandazioni</p>
                    <p className="text-xs text-amber-700">Aumentare il budget Meta del 15% per sfruttare la stagione primaverile. Il CTR delle campagne Google mostra opportunità di ottimizzazione sulle keyword long-tail.</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// 6. SOCIAL MEDIA ANALYTICS
// ─────────────────────────────────────────────
const SocialAnalytics = () => (
  <div>
    <SectionHeader title="Social Media Analytics" subtitle="Performance comparata tra canali" />
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-6">
      {SOCIAL_DATA.map(s => (
        <Card key={s.channel} className="text-center">
          <div className="w-8 h-8 rounded-full mx-auto mb-2" style={{ backgroundColor: s.color + "20" }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: s.color + "30" }}>
              <Share2 size={14} style={{ color: s.color }} />
            </div>
          </div>
          <p className="text-xs font-semibold text-gray-700">{s.channel}</p>
          <p className="text-lg font-bold text-gray-800 mt-1">{(s.reach / 1000).toFixed(0)}k</p>
          <p className="text-xs text-gray-400">reach</p>
          <p className="text-sm font-semibold mt-1 text-green-600">{s.engagement}%</p>
          <p className="text-xs text-gray-400">engagement</p>
        </Card>
      ))}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <h3 className="font-semibold text-gray-700 mb-4">Lead per canale</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={SOCIAL_DATA} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis type="number" tick={{ fontSize: 11 }} />
            <YAxis dataKey="channel" type="category" tick={{ fontSize: 11 }} width={80} />
            <Tooltip />
            <Bar dataKey="lead" fill="#3b82f6" name="Lead" radius={[0,4,4,0]}>
              {SOCIAL_DATA.map((s, i) => <Cell key={i} fill={s.color} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
      <Card>
        <h3 className="font-semibold text-gray-700 mb-4">Costo per Lead (€)</h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={SOCIAL_DATA}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="channel" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip formatter={v => `€${v}`} />
            <Bar dataKey="cpl" name="CPL €" radius={[4,4,0,0]}>
              {SOCIAL_DATA.map((s, i) => <Cell key={i} fill={s.color} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  </div>
)

// ─────────────────────────────────────────────
// 7. COPY GENERATOR
// ─────────────────────────────────────────────
const CopyGenerator = () => {
  const [form, setForm] = useState({ client: "", type: "Meta Ads", tone: "Professionale", brief: "" })
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const templates = {
    "Meta Ads": [
      "🚀 {brand} — {benefit}. Scopri come possiamo trasformare il tuo business oggi stesso. Clicca e inizia!",
      "Stanco di {problema}? {brand} ha la soluzione. Risultati garantiti o rimborso. Inizia ora →",
      "⭐ +500 clienti soddisfatti. {brand} è la scelta giusta per {obiettivo}. Prova gratis per 7 giorni.",
    ],
    "Email": [
      "Oggetto: La soluzione che cercavi per {obiettivo}\n\nCiao [Nome],\n\nHo pensato a te mentre lavoravamo su {brief}. {brand} può aiutarti a raggiungere i tuoi obiettivi in modo semplice ed efficace...",
      "Oggetto: {brand} × [Nome] — una proposta esclusiva\n\nEsiste un modo più intelligente per {obiettivo}. Lasciati raccontare come {brand} ha già aiutato centinaia di professionisti...",
    ],
    "Post Social": [
      "✨ {benefit} è più facile di quanto pensi.\n\n{brand} ti accompagna passo dopo passo verso il tuo {obiettivo}.\n\n📌 Salva questo post!\n\n#marketing #crescita #business",
      "Sai qual è il segreto delle aziende di successo? {benefit}.\n\nNoi di {brand} lo sappiamo bene — e vogliamo condividerlo con te 🎯\n\n➡️ Scopri di più nel link in bio",
    ],
  }

  const generate = () => {
    setLoading(true)
    setTimeout(() => {
      const tpls = templates[form.type] || templates["Meta Ads"]
      const r = tpls.map(t => t.replace(/\{brand\}/g, form.client || "Brand").replace(/\{benefit\}/g, "risultati concreti").replace(/\{obiettivo\}/g, form.brief || "crescere online").replace(/\{problema\}/g, "campagne poco efficaci"))
      setResults(r)
      setLoading(false)
    }, 1200)
  }

  return (
    <div>
      <SectionHeader title="Generatore di Copy AI" subtitle="Testi per ads, email e social basati sul brief cliente" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-semibold text-gray-700 mb-4">Brief</h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Nome Brand / Cliente</label>
              <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" placeholder="es. Sportiva Milano"
                value={form.client} onChange={e => setForm(f => ({ ...f, client: e.target.value }))} />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Tipo di contenuto</label>
              <div className="flex gap-2 flex-wrap">
                {["Meta Ads", "Google Ads", "Email", "Post Social", "Landing Page"].map(t => (
                  <button key={t} onClick={() => setForm(f => ({ ...f, type: t }))}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${form.type === t ? "bg-blue-600 text-white border-blue-600" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Tono di voce</label>
              <div className="flex gap-2 flex-wrap">
                {["Professionale", "Amichevole", "Urgente", "Inspirazionale"].map(t => (
                  <button key={t} onClick={() => setForm(f => ({ ...f, tone: t }))}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${form.tone === t ? "bg-purple-600 text-white border-purple-600" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Brief (obiettivo, prodotto, target)</label>
              <textarea rows={4} placeholder="es. Promuovere abbonamento palestra a Milano, target 25-40 anni, focus sul benessere..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none"
                value={form.brief} onChange={e => setForm(f => ({ ...f, brief: e.target.value }))} />
            </div>
            <button onClick={generate} disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 rounded-lg text-sm font-medium hover:opacity-90 flex items-center justify-center gap-2">
              {loading ? <RefreshCw size={15} className="animate-spin" /> : <Wand2 size={15} />}
              {loading ? "Generando…" : "Genera Copy"}
            </button>
          </div>
        </Card>
        <div className="space-y-3">
          {results.length === 0 ? (
            <Card className="h-full flex items-center justify-center text-center">
              <div><Wand2 size={40} className="text-gray-200 mx-auto mb-2" /><p className="text-gray-400 text-sm">I testi generati appariranno qui</p></div>
            </Card>
          ) : results.map((r, i) => (
            <Card key={i}>
              <div className="flex items-start justify-between mb-2">
                <Badge text={`Variante ${i + 1}`} color={["blue", "purple", "green"][i] || "gray"} />
                <button className="text-gray-400 hover:text-blue-600" onClick={() => navigator.clipboard?.writeText(r)}><Copy size={14} /></button>
              </div>
              <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{r}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// 8. CONTENT CALENDAR
// ─────────────────────────────────────────────
const ContentCalendar = () => {
  const [posts, setPosts] = useState(CONTENT_POSTS)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ day: "", title: "", channel: "Instagram", status: "Bozza", client: "" })

  const days = Array.from({ length: 28 }, (_, i) => i + 1)
  const channelColors = { Instagram: "bg-pink-100 text-pink-700", Facebook: "bg-blue-100 text-blue-700", LinkedIn: "bg-blue-100 text-blue-800", TikTok: "bg-gray-100 text-gray-800", Blog: "bg-green-100 text-green-700", Email: "bg-amber-100 text-amber-700" }

  const save = () => {
    if (!form.day || !form.title) return
    setPosts(ps => [...ps, { ...form, id: Date.now(), day: Number(form.day), month: 2 }])
    setShowForm(false); setForm({ day: "", title: "", channel: "Instagram", status: "Bozza", client: "" })
  }

  return (
    <div>
      <SectionHeader title="Content Calendar" subtitle="Pianificazione editoriale — Marzo 2026" action={
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
          <Plus size={15} /> Nuovo Post
        </button>
      } />

      {showForm && (
        <Card className="mb-4 border-blue-200">
          <div className="grid grid-cols-3 gap-3">
            <div><label className="text-xs text-gray-500 mb-1 block">Giorno</label><input type="number" min="1" max="31" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={form.day} onChange={e => setForm(f => ({ ...f, day: e.target.value }))} /></div>
            <div className="col-span-2"><label className="text-xs text-gray-500 mb-1 block">Titolo</label><input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
            <div><label className="text-xs text-gray-500 mb-1 block">Canale</label><select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={form.channel} onChange={e => setForm(f => ({ ...f, channel: e.target.value }))}>{["Instagram","Facebook","LinkedIn","TikTok","Blog","Email"].map(c => <option key={c}>{c}</option>)}</select></div>
            <div><label className="text-xs text-gray-500 mb-1 block">Cliente</label><input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={form.client} onChange={e => setForm(f => ({ ...f, client: e.target.value }))} /></div>
            <div className="flex items-end gap-2"><button onClick={save} className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium">Aggiungi</button><button onClick={() => setShowForm(false)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm">✕</button></div>
          </div>
        </Card>
      )}

      <Card>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["Lun","Mar","Mer","Gio","Ven","Sab","Dom"].map(d => <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1">{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {[...Array(5)].map((_, i) => <div key={`blank-${i}`} />)}
          {days.map(day => {
            const dayPosts = posts.filter(p => p.day === day)
            return (
              <div key={day} className="min-h-16 rounded-lg border border-gray-100 p-1 hover:border-gray-200 transition-colors">
                <p className="text-xs font-medium text-gray-400 mb-1">{day}</p>
                <div className="space-y-0.5">
                  {dayPosts.map(p => (
                    <div key={p.id} className={`text-xs rounded px-1 py-0.5 truncate ${channelColors[p.channel] || "bg-gray-100 text-gray-700"}`} title={p.title}>
                      {p.title}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}

// ─────────────────────────────────────────────
// 9. A/B TEST MANAGER
// ─────────────────────────────────────────────
const ABTestManager = () => {
  const [tests, setTests] = useState(AB_TESTS)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: "", variantA: "", variantB: "", metricA: "", metricB: "", status: "In corso", impressioni: "" })

  const save = () => {
    if (!form.name) return
    setTests(ts => [...ts, { ...form, id: Date.now(), metricA: Number(form.metricA), metricB: Number(form.metricB), impressioni: Number(form.impressioni) }])
    setShowForm(false); setForm({ name: "", variantA: "", variantB: "", metricA: "", metricB: "", status: "In corso", impressioni: "" })
  }

  return (
    <div>
      <SectionHeader title="A/B Test Manager" subtitle="Confronta varianti di copy, creatività e landing page" action={
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"><Plus size={15} /> Nuovo Test</button>
      } />

      {showForm && (
        <Card className="mb-4 border-blue-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="col-span-2"><label className="text-xs text-gray-500 mb-1 block">Nome test</label><input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
            <div><label className="text-xs text-gray-500 mb-1 block">Variante A</label><input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={form.variantA} onChange={e => setForm(f => ({ ...f, variantA: e.target.value }))} /></div>
            <div><label className="text-xs text-gray-500 mb-1 block">Variante B</label><input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={form.variantB} onChange={e => setForm(f => ({ ...f, variantB: e.target.value }))} /></div>
            <div><label className="text-xs text-gray-500 mb-1 block">CTR/Conv. A (%)</label><input type="number" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={form.metricA} onChange={e => setForm(f => ({ ...f, metricA: e.target.value }))} /></div>
            <div><label className="text-xs text-gray-500 mb-1 block">CTR/Conv. B (%)</label><input type="number" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={form.metricB} onChange={e => setForm(f => ({ ...f, metricB: e.target.value }))} /></div>
            <div className="col-span-2 flex gap-2"><button onClick={save} className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-sm font-medium">Aggiungi</button><button onClick={() => setShowForm(false)} className="px-4 border border-gray-200 rounded-lg text-sm">Annulla</button></div>
          </div>
        </Card>
      )}

      <div className="space-y-4">
        {tests.map(t => {
          const winner = t.metricB > t.metricA ? "B" : "A"
          const diff = Math.abs(t.metricB - t.metricA).toFixed(1)
          const running = t.status === "In corso"
          return (
            <Card key={t.id}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-gray-800">{t.name}</h4>
                  <p className="text-xs text-gray-400 mt-0.5">{t.impressioni.toLocaleString()} impressioni</p>
                </div>
                <Badge text={t.status} color={t.status.includes("Vincitore") ? "green" : "blue"} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[["A", t.variantA, t.metricA], ["B", t.variantB, t.metricB]].map(([label, text, metric]) => {
                  const isWinner = !running && label === winner
                  return (
                    <div key={label} className={`rounded-xl p-3 border-2 ${isWinner ? "border-green-400 bg-green-50" : "border-gray-100 bg-gray-50"}`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${isWinner ? "bg-green-500 text-white" : "bg-gray-300 text-gray-700"}`}>VAR {label}</span>
                        {isWinner && <span className="text-xs text-green-600 font-semibold">🏆 +{diff}%</span>}
                      </div>
                      <p className="text-sm text-gray-700 my-2">"{text}"</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-white rounded-full h-2 border border-gray-200">
                          <div className={`h-2 rounded-full ${isWinner ? "bg-green-500" : "bg-blue-400"}`} style={{ width: `${Math.min(metric * 5, 100)}%` }} />
                        </div>
                        <span className="text-sm font-bold text-gray-700">{metric}%</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// 10. EMAIL CAMPAIGN BUILDER
// ─────────────────────────────────────────────
const EmailBuilder = () => {
  const [tab, setTab] = useState("editor")
  const [subject, setSubject] = useState("🚀 La nostra offerta esclusiva per te")
  const [body, setBody] = useState("Ciao {{nome}},\n\nSiamo entusiasti di condividere con te le ultime novità...\n\nA presto,\nIl Team")
  const [segment, setSegment] = useState("tutti")
  const [scheduled, setScheduled] = useState("")
  const [sent, setSent] = useState(false)

  const segmentCounts = { tutti: 1240, hot: 186, warm: 412, cold: 642 }

  return (
    <div>
      <SectionHeader title="Email Campaign Builder" subtitle="Editor drag-and-drop, segmentazione e invio schedulato" />
      <div className="flex gap-1 mb-5 border-b border-gray-200">
        {[["editor","Editor"],["segmentation","Segmentazione"],["schedule","Schedulazione"],["stats","Statistiche"]].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${tab === key ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
            {label}
          </button>
        ))}
      </div>

      {tab === "editor" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-3">
            <div><label className="text-xs text-gray-500 mb-1 block">Oggetto email</label>
              <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={subject} onChange={e => setSubject(e.target.value)} /></div>
            <div><label className="text-xs text-gray-500 mb-1 block">Corpo email (usa {"{{nome}}"} per personalizzare)</label>
              <textarea rows={10} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm font-mono resize-none" value={body} onChange={e => setBody(e.target.value)} /></div>
            <div className="flex gap-2">
              {["Newsletter", "Promo", "Follow-up", "Onboarding"].map(t => (
                <button key={t} onClick={() => setBody(`Template: ${t}\n\nCiao {{nome}},\n\n[Inserisci contenuto ${t.toLowerCase()} qui...]\n\nA presto!`)}
                  className="flex-1 text-xs border border-gray-200 rounded-lg py-2 text-gray-600 hover:bg-gray-50">{t}</button>
              ))}
            </div>
          </div>
          <Card className="bg-gray-50">
            <p className="text-xs font-semibold text-gray-400 uppercase mb-3">Anteprima</p>
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <div className="border-b border-gray-100 pb-2 mb-3">
                <p className="text-xs text-gray-400">Da: agency@tuodominio.it</p>
                <p className="text-sm font-semibold text-gray-800">Oggetto: {subject}</p>
              </div>
              <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">{body.replace("{{nome}}", "Mario")}</p>
            </div>
          </Card>
        </div>
      )}

      {tab === "segmentation" && (
        <div className="space-y-3">
          {[["tutti","Tutti i contatti","Invia a tutta la lista"], ["hot","Lead caldi (score > 80)","Alta propensione all'acquisto"], ["warm","Lead tiepidi (score 50-80)","Necessitano nurturing"], ["cold","Lead freddi (score < 50)","Prima fase di engagement"]].map(([key, label, desc]) => (
            <div key={key} onClick={() => setSegment(key)}
              className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-colors ${segment === key ? "border-blue-500 bg-blue-50" : "border-gray-100 bg-white hover:border-gray-200"}`}>
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${segment === key ? "border-blue-500 bg-blue-500" : "border-gray-300"}`}>
                  {segment === key && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <div><p className="font-medium text-gray-800 text-sm">{label}</p><p className="text-xs text-gray-400">{desc}</p></div>
              </div>
              <div className="text-right"><p className="text-lg font-bold text-gray-800">{segmentCounts[key].toLocaleString()}</p><p className="text-xs text-gray-400">contatti</p></div>
            </div>
          ))}
        </div>
      )}

      {tab === "schedule" && (
        <Card className="max-w-md">
          <h3 className="font-semibold text-gray-700 mb-4">Schedulazione invio</h3>
          <div className="space-y-3">
            <div><label className="text-xs text-gray-500 mb-1 block">Data e ora invio</label>
              <input type="datetime-local" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" value={scheduled} onChange={e => setScheduled(e.target.value)} /></div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800 font-medium">Riepilogo invio</p>
              <p className="text-xs text-blue-600 mt-1">Segmento: {segment === "tutti" ? "Tutti" : segment} · {segmentCounts[segment]} destinatari</p>
              {scheduled && <p className="text-xs text-blue-600">Orario: {new Date(scheduled).toLocaleString("it-IT")}</p>}
            </div>
            {!sent ? (
              <button onClick={() => setSent(true)}
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center justify-center gap-2">
                <Send size={15} /> {scheduled ? "Schedula invio" : "Invia ora"}
              </button>
            ) : (
              <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                <CheckCircle2 size={18} className="text-green-500" />
                <p className="text-sm text-green-700 font-medium">Campagna {scheduled ? "schedulata" : "inviata"} con successo!</p>
              </div>
            )}
          </div>
        </Card>
      )}

      {tab === "stats" && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[["Inviati", "1.240", "blue"], ["Aperti", "31.4%", "green"], ["Clic", "8.7%", "purple"], ["Disiscritti", "0.3%", "red"]].map(([l, v, c]) => (
            <StatCard key={l} label={l} value={v} icon={Mail} color={c} />
          ))}
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────
// 11. LEAD SCORING
// ─────────────────────────────────────────────
const LeadScoring = () => {
  const stageColors = { "Caldo": "red", "Tiepido": "yellow", "Freddo": "blue" }
  return (
    <div>
      <SectionHeader title="Lead Scoring" subtitle="Punteggi e comportamento dei contatti" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard label="Lead caldi" value={LEADS.filter(l=>l.stage==="Caldo").length} sub="score > 80" icon={Star} color="amber" />
        <StatCard label="Lead tiepidi" value={LEADS.filter(l=>l.stage==="Tiepido").length} sub="score 50–80" icon={TrendingUp} color="blue" />
        <StatCard label="Lead freddi" value={LEADS.filter(l=>l.stage==="Freddo").length} sub="score < 50" icon={TrendingDown} color="purple" />
      </div>
      <div className="space-y-3">
        {[...LEADS].sort((a,b) => b.score - a.score).map(l => (
          <Card key={l.id}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${l.score >= 80 ? "bg-red-500" : l.score >= 50 ? "bg-yellow-500" : "bg-blue-400"}`}>
                  {l.score}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{l.name}</p>
                  <p className="text-xs text-gray-400">{l.email} · Fonte: {l.source}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <Badge text={l.stage} color={stageColors[l.stage]} />
                </div>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1">
              {l.actions.map((a, i) => <Badge key={i} text={a} color="gray" />)}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex-1 bg-gray-100 rounded-full h-2">
                <div className={`h-2 rounded-full ${l.score >= 80 ? "bg-red-500" : l.score >= 50 ? "bg-yellow-500" : "bg-blue-400"}`} style={{ width: `${l.score}%` }} />
              </div>
              <span className="text-xs text-gray-500 w-8">{l.score}/100</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// 12. CHATBOT BUILDER
// ─────────────────────────────────────────────
const ChatbotBuilder = () => {
  const [nodes, setNodes] = useState([
    { id: 1, type: "start", text: "Ciao! Come possiamo aiutarti oggi?", options: ["Voglio un preventivo", "Ho bisogno di supporto", "Voglio saperne di più"] },
    { id: 2, type: "message", text: "Perfetto! Dimmi il tuo nome e email per procedere con il preventivo.", options: [] },
    { id: 3, type: "capture", text: "Raccogli nome e email →", options: [] },
    { id: 4, type: "end", text: "Grazie! Ti contatteremo entro 24 ore. 🚀", options: [] },
  ])
  const [preview, setPreview] = useState(false)
  const [chatStep, setChatStep] = useState(0)
  const [chatMsgs, setChatMsgs] = useState([{ from: "bot", text: nodes[0].text }])
  const [input, setInput] = useState("")

  const handleOption = (opt) => {
    const next = Math.min(chatStep + 1, nodes.length - 1)
    setChatMsgs(m => [...m, { from: "user", text: opt }, { from: "bot", text: nodes[next].text }])
    setChatStep(next)
  }

  const typeColors = { start: "bg-green-100 border-green-300 text-green-800", message: "bg-blue-100 border-blue-300 text-blue-800", capture: "bg-purple-100 border-purple-300 text-purple-800", end: "bg-gray-100 border-gray-300 text-gray-700" }

  return (
    <div>
      <SectionHeader title="Chatbot Builder" subtitle="Widget di lead generation da installare sui siti clienti" action={
        <button onClick={() => { setPreview(!preview); setChatStep(0); setChatMsgs([{ from: "bot", text: nodes[0].text }]) }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
          <Eye size={15} /> {preview ? "Modifica" : "Anteprima"}
        </button>
      } />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold text-gray-700 mb-3 text-sm">Flusso conversazione</h3>
          <div className="space-y-2">
            {nodes.map((node, i) => (
              <div key={node.id} className="relative">
                <div className={`rounded-xl border-2 p-3 ${typeColors[node.type]}`}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold uppercase">{node.type}</span>
                    <span className="text-xs opacity-60">Step {i + 1}</span>
                  </div>
                  <p className="text-sm">{node.text}</p>
                  {node.options.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {node.options.map((o, j) => <span key={j} className="text-xs bg-white bg-opacity-60 px-2 py-0.5 rounded-full border">{o}</span>)}
                    </div>
                  )}
                </div>
                {i < nodes.length - 1 && <div className="flex justify-center my-1"><ArrowRight size={14} className="text-gray-400 rotate-90" /></div>}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-gray-700 mb-3 text-sm">{preview ? "Anteprima widget" : "Codice embed"}</h3>
          {preview ? (
            <div className="border border-gray-200 rounded-xl overflow-hidden shadow-lg max-w-sm">
              <div className="bg-blue-600 px-4 py-3 flex items-center gap-2">
                <Bot size={18} className="text-white" />
                <span className="text-white font-semibold text-sm">Assistente Virtuale</span>
                <div className="ml-auto w-2 h-2 bg-green-400 rounded-full" />
              </div>
              <div className="h-64 overflow-y-auto p-3 bg-gray-50 space-y-2">
                {chatMsgs.map((m, i) => (
                  <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-xs rounded-xl px-3 py-2 text-sm ${m.from === "user" ? "bg-blue-600 text-white" : "bg-white border border-gray-200 text-gray-800"}`}>{m.text}</div>
                  </div>
                ))}
                {chatStep < nodes.length - 1 && nodes[chatStep].options.length > 0 && (
                  <div className="flex flex-wrap gap-1 justify-start">
                    {nodes[chatStep].options.map((o, i) => (
                      <button key={i} onClick={() => handleOption(o)}
                        className="text-xs bg-blue-50 border border-blue-200 text-blue-700 px-3 py-1.5 rounded-full hover:bg-blue-100">{o}</button>
                    ))}
                  </div>
                )}
              </div>
              <div className="p-2 border-t border-gray-200 flex gap-2 bg-white">
                <input placeholder="Scrivi…" className="flex-1 text-xs border border-gray-200 rounded-lg px-2 py-1.5" value={input} onChange={e => setInput(e.target.value)} />
                <button onClick={() => { if (input) { handleOption(input); setInput("") } }} className="bg-blue-600 text-white px-3 rounded-lg"><Send size={12} /></button>
              </div>
            </div>
          ) : (
            <Card className="bg-gray-900">
              <p className="text-xs text-gray-400 mb-2">// Incolla nel &lt;head&gt; del sito cliente</p>
              <pre className="text-xs text-green-400 whitespace-pre-wrap font-mono leading-relaxed">{`<script>
  window.AgencyChatbot = {
    apiKey: "YOUR_API_KEY",
    color: "#2563eb",
    greeting: "${nodes[0].text}",
    flow: "lead_gen_default",
    position: "bottom-right"
  }
</script>
<script src="https://cdn.agency.it/chatbot.min.js"></script>`}</pre>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// 13. ROI CALCULATOR
// ─────────────────────────────────────────────
const ROICalculator = () => {
  const [form, setForm] = useState({ budget: 3000, cpc: 0.8, convRate: 3.2, orderValue: 85, period: 30 })
  const f = form
  const clicks = Math.round((f.budget / f.cpc))
  const conversioni = Math.round(clicks * (f.convRate / 100))
  const revenue = conversioni * f.orderValue
  const profit = revenue - f.budget
  const roi = ((profit / f.budget) * 100).toFixed(0)
  const roas = (revenue / f.budget).toFixed(2)

  return (
    <div>
      <SectionHeader title="ROI Calculator" subtitle="Calcola il ritorno sull'investimento pubblicitario" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-semibold text-gray-700 mb-4">Parametri campagna</h3>
          <div className="space-y-4">
            {[
              ["Budget pubblicitario (€)", "budget", 100, 50000, 100],
              ["CPC medio (€)", "cpc", 0.1, 20, 0.1],
              ["Tasso di conversione (%)", "convRate", 0.1, 20, 0.1],
              ["Valore medio ordine (€)", "orderValue", 1, 5000, 1],
            ].map(([label, key, min, max, step]) => (
              <div key={key}>
                <div className="flex justify-between mb-1">
                  <label className="text-xs text-gray-500">{label}</label>
                  <span className="text-xs font-semibold text-gray-700">{key === "cpc" || key === "orderValue" ? `€${f[key]}` : key === "convRate" ? `${f[key]}%` : `€${f[key].toLocaleString()}`}</span>
                </div>
                <input type="range" min={min} max={max} step={step} value={f[key]}
                  onChange={e => setForm(prev => ({ ...prev, [key]: Number(e.target.value) }))}
                  className="w-full accent-blue-600" />
              </div>
            ))}
          </div>
        </Card>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Card className="text-center"><p className="text-xs text-gray-400 mb-1">Click stimati</p><p className="text-2xl font-bold text-gray-800">{clicks.toLocaleString()}</p></Card>
            <Card className="text-center"><p className="text-xs text-gray-400 mb-1">Conversioni</p><p className="text-2xl font-bold text-blue-600">{conversioni.toLocaleString()}</p></Card>
            <Card className="text-center"><p className="text-xs text-gray-400 mb-1">Revenue stimata</p><p className="text-2xl font-bold text-green-600">€{revenue.toLocaleString()}</p></Card>
            <Card className="text-center"><p className="text-xs text-gray-400 mb-1">ROAS</p><p className="text-2xl font-bold text-purple-600">{roas}x</p></Card>
          </div>
          <div className={`rounded-xl p-5 text-center ${profit >= 0 ? "bg-green-50 border-2 border-green-200" : "bg-red-50 border-2 border-red-200"}`}>
            <p className="text-sm font-medium text-gray-600 mb-1">ROI Stimato</p>
            <p className={`text-5xl font-bold ${profit >= 0 ? "text-green-600" : "text-red-500"}`}>{roi}%</p>
            <p className={`text-sm mt-2 font-semibold ${profit >= 0 ? "text-green-700" : "text-red-600"}`}>
              {profit >= 0 ? `+€${profit.toLocaleString()} di profitto` : `−€${Math.abs(profit).toLocaleString()} di perdita`}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// 14. SEO / ADS AUDIT
// ─────────────────────────────────────────────
const SEOAudit = () => {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const runAudit = () => {
    if (!url) return
    setLoading(true)
    setTimeout(() => {
      setResult({
        score: 67,
        url: url,
        checks: [
          { name: "Meta Title", status: "ok", detail: "Titolo presente e ottimizzato (58 caratteri)" },
          { name: "Meta Description", status: "warning", detail: "Descrizione troppo corta (80 caratteri, min 120)" },
          { name: "Velocità pagina (mobile)", status: "error", detail: "Score 42/100 — immagini non ottimizzate" },
          { name: "SSL / HTTPS", status: "ok", detail: "Certificato valido fino al 2027" },
          { name: "Sitemap XML", status: "ok", detail: "Trovata: /sitemap.xml" },
          { name: "Robots.txt", status: "ok", detail: "File presente e configurato correttamente" },
          { name: "Heading structure (H1)", status: "warning", detail: "2 H1 trovati — deve essere uno solo" },
          { name: "Immagini con alt text", status: "error", detail: "14/23 immagini mancano di alt text" },
          { name: "Link broken", status: "ok", detail: "Nessun link rotto trovato" },
          { name: "Schema Markup", status: "warning", detail: "Schema non trovato — consigliato per SEO" },
        ],
        opportunities: ["Comprimere immagini WebP (-40% peso)", "Implementare lazy loading", "Aggiungere schema FAQ per snippet SERP", "Migliorare Core Web Vitals: LCP 4.2s → target <2.5s"]
      })
      setLoading(false)
    }, 2000)
  }

  const statusIcon = { ok: <CheckCircle2 size={16} className="text-green-500" />, warning: <AlertCircle size={16} className="text-yellow-500" />, error: <X size={16} className="text-red-500" /> }
  const statusBg = { ok: "bg-green-50", warning: "bg-yellow-50", error: "bg-red-50" }

  return (
    <div>
      <SectionHeader title="Audit SEO / Ads" subtitle="Analizza un sito e genera un report di opportunità" />
      <Card className="mb-5">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Globe size={15} className="absolute left-3 top-3 text-gray-400" />
            <input placeholder="https://www.esempio.it" className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm"
              value={url} onChange={e => setUrl(e.target.value)} onKeyDown={e => e.key === "Enter" && runAudit()} />
          </div>
          <button onClick={runAudit} disabled={loading || !url}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2">
            {loading ? <RefreshCw size={15} className="animate-spin" /> : <Search size={15} />}
            {loading ? "Analizzando…" : "Avvia Audit"}
          </button>
        </div>
      </Card>

      {result && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="md:col-span-2 space-y-2">
            {result.checks.map((c, i) => (
              <div key={i} className={`flex items-start gap-3 p-3 rounded-xl ${statusBg[c.status]}`}>
                <div className="mt-0.5">{statusIcon[c.status]}</div>
                <div>
                  <p className="font-medium text-gray-800 text-sm">{c.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{c.detail}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <Card className="text-center">
              <p className="text-xs text-gray-400 mb-2">SEO Score</p>
              <div className="relative w-24 h-24 mx-auto">
                <svg viewBox="0 0 36 36" className="transform -rotate-90 w-24 h-24">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f3f4f6" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke={result.score >= 80 ? "#10b981" : result.score >= 50 ? "#f59e0b" : "#ef4444"} strokeWidth="3"
                    strokeDasharray={`${result.score} 100`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-800">{result.score}</span>
                </div>
              </div>
              <div className="flex justify-center gap-3 mt-2 text-xs">
                <span className="text-green-600">✓ {result.checks.filter(c=>c.status==="ok").length} ok</span>
                <span className="text-yellow-600">⚠ {result.checks.filter(c=>c.status==="warning").length}</span>
                <span className="text-red-500">✗ {result.checks.filter(c=>c.status==="error").length}</span>
              </div>
            </Card>
            <Card>
              <h4 className="font-semibold text-gray-700 text-sm mb-3">Opportunità principali</h4>
              <div className="space-y-2">
                {result.opportunities.map((o, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">{i+1}</div>
                    <p className="text-xs text-gray-700">{o}</p>
                  </div>
                ))}
              </div>
            </Card>
            <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center justify-center gap-2">
              <Download size={14} /> Scarica Report PDF
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────
// 15. PREVENTIVATORE
// ─────────────────────────────────────────────
const QuoteBuilder = () => {
  const services = [
    { id: 1, name: "Social Media Management", desc: "Gestione profili + 12 post/mese", price: 450, category: "Social" },
    { id: 2, name: "Social Media Avanzato", desc: "Gestione profili + 24 post + stories + reels", price: 850, category: "Social" },
    { id: 3, name: "Google Ads", desc: "Setup + gestione campagne Search & Display", price: 380, category: "Ads" },
    { id: 4, name: "Meta Ads", desc: "Campagne Facebook & Instagram", price: 350, category: "Ads" },
    { id: 5, name: "SEO Base", desc: "Ottimizzazione on-page + 2 articoli/mese", price: 320, category: "SEO" },
    { id: 6, name: "SEO Avanzata", desc: "Link building + content + reporting", price: 680, category: "SEO" },
    { id: 7, name: "Email Marketing", desc: "2 newsletter/mese + automazioni", price: 220, category: "Email" },
    { id: 8, name: "Creazione Sito Web", desc: "Landing page ottimizzata per conversioni", price: 1200, category: "Web", oneoff: true },
    { id: 9, name: "Report mensile", desc: "Report PDF brandizzato con KPI", price: 80, category: "Extra" },
    { id: 10, name: "Consulenza strategica", desc: "2h/mese di consulenza dedicata", price: 150, category: "Extra" },
  ]

  const [selected, setSelected] = useState([])
  const [discount, setDiscount] = useState(0)
  const [clientName, setClientName] = useState("")
  const [generated, setGenerated] = useState(false)

  const toggle = (id) => setSelected(s => s.includes(id) ? s.filter(i => i !== id) : [...s, id])
  const total = services.filter(s => selected.includes(s.id)).reduce((sum, s) => sum + s.price, 0)
  const discounted = Math.round(total * (1 - discount / 100))
  const categories = [...new Set(services.map(s => s.category))]

  return (
    <div>
      <SectionHeader title="Preventivatore Online" subtitle="Configura un pacchetto di servizi e genera il preventivo" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="md:col-span-2">
          {categories.map(cat => (
            <div key={cat} className="mb-5">
              <h3 className="font-semibold text-gray-600 text-sm uppercase tracking-wide mb-2">{cat}</h3>
              <div className="space-y-2">
                {services.filter(s => s.category === cat).map(s => (
                  <div key={s.id} onClick={() => toggle(s.id)}
                    className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all ${selected.includes(s.id) ? "border-blue-500 bg-blue-50" : "border-gray-100 bg-white hover:border-gray-200"}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${selected.includes(s.id) ? "bg-blue-500 border-blue-500" : "border-gray-300"}`}>
                        {selected.includes(s.id) && <Check size={12} className="text-white" />}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-sm">{s.name} {s.oneoff && <Badge text="Una tantum" color="purple" />}</p>
                        <p className="text-xs text-gray-400">{s.desc}</p>
                      </div>
                    </div>
                    <p className="font-bold text-gray-800 text-sm flex-shrink-0 ml-3">€{s.price}{!s.oneoff ? "/mese" : ""}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          <Card>
            <h3 className="font-semibold text-gray-700 mb-3">Riepilogo preventivo</h3>
            <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
              {selected.length === 0 ? <p className="text-xs text-gray-400 text-center py-4">Seleziona i servizi</p> :
                services.filter(s => selected.includes(s.id)).map(s => (
                  <div key={s.id} className="flex justify-between text-sm">
                    <span className="text-gray-600 flex-1">{s.name}</span>
                    <span className="font-medium text-gray-800 flex-shrink-0">€{s.price}</span>
                  </div>
                ))
              }
            </div>
            {selected.length > 0 && (
              <>
                <div className="border-t border-gray-100 pt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotale mensile</span>
                    <span className="font-medium">€{total}</span>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Sconto (%)</label>
                    <input type="number" min="0" max="50" className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-sm" value={discount} onChange={e => setDiscount(Number(e.target.value))} />
                  </div>
                  {discount > 0 && <div className="flex justify-between text-sm text-green-600"><span>Sconto {discount}%</span><span>-€{total - discounted}</span></div>}
                  <div className="flex justify-between font-bold text-gray-800 border-t border-gray-200 pt-2">
                    <span>Totale/mese</span><span className="text-blue-600 text-lg">€{discounted}</span>
                  </div>
                </div>
                <div className="mt-3">
                  <label className="text-xs text-gray-500 mb-1 block">Nome cliente</label>
                  <input className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm" placeholder="es. Sportiva Milano" value={clientName} onChange={e => setClientName(e.target.value)} />
                </div>
                {!generated ? (
                  <button onClick={() => setGenerated(true)}
                    className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 mt-3 flex items-center justify-center gap-2">
                    <Receipt size={15} /> Genera Preventivo
                  </button>
                ) : (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
                      <CheckCircle2 size={16} className="text-green-500" />
                      <p className="text-sm text-green-700 font-medium">Preventivo generato!</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 border border-gray-200 text-gray-600 py-2 rounded-lg text-xs hover:bg-gray-50 flex items-center justify-center gap-1"><Download size={12} /> PDF</button>
                      <button className="flex-1 border border-gray-200 text-gray-600 py-2 rounded-lg text-xs hover:bg-gray-50 flex items-center justify-center gap-1"><Send size={12} /> Invia</button>
                    </div>
                  </div>
                )}
              </>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// SIDEBAR & NAV
// ─────────────────────────────────────────────
const NAV = [
  { id: "crm", label: "CRM", icon: Users, group: "Clienti & Progetti" },
  { id: "portal", label: "Client Portal", icon: Globe, group: "Clienti & Progetti" },
  { id: "projects", label: "Project Tracker", icon: FolderKanban, group: "Clienti & Progetti" },
  { id: "kpi", label: "KPI Dashboard", icon: LayoutDashboard, group: "Analytics" },
  { id: "reports", label: "Report Generator", icon: FileBarChart2, group: "Analytics" },
  { id: "social", label: "Social Analytics", icon: Share2, group: "Analytics" },
  { id: "copy", label: "Copy Generator AI", icon: Wand2, group: "Contenuti" },
  { id: "calendar", label: "Content Calendar", icon: CalendarDays, group: "Contenuti" },
  { id: "abtest", label: "A/B Test Manager", icon: FlaskConical, group: "Contenuti" },
  { id: "email", label: "Email Builder", icon: Mail, group: "Automazione" },
  { id: "scoring", label: "Lead Scoring", icon: Star, group: "Automazione" },
  { id: "chatbot", label: "Chatbot Builder", icon: Bot, group: "Automazione" },
  { id: "roi", label: "ROI Calculator", icon: Calculator, group: "Strumenti" },
  { id: "seo", label: "SEO Audit", icon: Search, group: "Strumenti" },
  { id: "quote", label: "Preventivatore", icon: Receipt, group: "Strumenti" },
]

const GROUPS = ["Clienti & Progetti", "Analytics", "Contenuti", "Automazione", "Strumenti"]

const Sidebar = ({ active, setActive, mobileOpen, setMobileOpen }) => {
  const [collapsed, setCollapsed] = useState({})
  const toggle = (g) => setCollapsed(c => ({ ...c, [g]: !c[g] }))

  const handleNav = (id) => { setActive(id); setMobileOpen(false) }

  const SidebarContent = () => (
    <div className="bg-gray-900 text-white flex flex-col h-full">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-500 rounded-lg flex items-center justify-center"><Zap size={14} className="text-white" /></div>
            <div><p className="font-bold text-sm">AgencyOS</p><p className="text-xs text-gray-400">Marketing Platform</p></div>
          </div>
          <button onClick={() => setMobileOpen(false)} className="md:hidden text-gray-400 hover:text-white p-1"><X size={18} /></button>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {GROUPS.map(group => (
          <div key={group} className="mb-1">
            <button onClick={() => toggle(group)} className="w-full flex items-center justify-between px-2 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-gray-300">
              {group}
              {collapsed[group] ? <ChevronRight size={12} /> : <ChevronDown size={12} />}
            </button>
            {!collapsed[group] && NAV.filter(n => n.group === group).map(item => (
              <button key={item.id} onClick={() => handleNav(item.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm mb-0.5 transition-colors ${active === item.id ? "bg-blue-600 text-white" : "text-gray-400 hover:bg-gray-800 hover:text-white"}`}>
                <item.icon size={15} />
                {item.label}
              </button>
            ))}
          </div>
        ))}
      </nav>
      <div className="p-3 border-t border-gray-800">
        <div className="flex items-center gap-2 px-2 py-1.5">
          <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold">A</div>
          <div className="flex-1 min-w-0"><p className="text-xs font-medium text-white truncate">Agency Admin</p><p className="text-xs text-gray-400">admin@agency.it</p></div>
          <Settings size={13} className="text-gray-500" />
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:flex w-56 flex-shrink-0 h-screen flex-col">
        <SidebarContent />
      </div>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setMobileOpen(false)} />
          <div className="relative w-64 h-full z-50 flex flex-col">
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  )
}

// ─────────────────────────────────────────────
// APP ROOT
// ─────────────────────────────────────────────
const VIEWS = {
  crm: CRM, portal: ClientPortal, projects: ProjectTracker,
  kpi: KPIDashboard, reports: ReportGenerator, social: SocialAnalytics,
  copy: CopyGenerator, calendar: ContentCalendar, abtest: ABTestManager,
  email: EmailBuilder, scoring: LeadScoring, chatbot: ChatbotBuilder,
  roi: ROICalculator, seo: SEOAudit, quote: QuoteBuilder,
}

export default function App() {
  const [active, setActive] = useState("crm")
  const [mobileOpen, setMobileOpen] = useState(false)
  const View = VIEWS[active] || CRM
  const currentNav = NAV.find(n => n.id === active)

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      <Sidebar active={active} setActive={setActive} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile top bar */}
        <div className="md:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-200 flex-shrink-0">
          <button onClick={() => setMobileOpen(true)} className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100">
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-500 rounded-md flex items-center justify-center"><Zap size={12} className="text-white" /></div>
            <span className="font-bold text-sm text-gray-800">AgencyOS</span>
          </div>
          {currentNav && <span className="ml-auto text-sm text-gray-500 font-medium">{currentNav.label}</span>}
        </div>
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto p-3 md:p-7">
            <View />
          </div>
        </main>
      </div>
    </div>
  )
}
