import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  BarChart3,
  Bell,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  FileText,
  Home,
  Info,
  ListChecks,
  Megaphone,
  Menu,
  MoreVertical,
  RefreshCw,
  Search,
  Settings,
  TrendingUp,
  UserPlus,
  Users,
  WalletCards,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Painel — LeadPro" },
      { name: "description", content: "Visão geral de receitas, clientes, tarefas e atividades da LeadPro." },
      { property: "og:title", content: "Painel — LeadPro" },
      { property: "og:description", content: "Visão geral de receitas, clientes, tarefas e atividades da LeadPro." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

const navItems = [
  { label: "Painel", icon: Home, active: true },
  { label: "CRM", icon: RefreshCw, badge: "Em breve" },
  { label: "Clientes", icon: UserPlus },
  { label: "Onboarding", icon: FileText },
  { label: "Equipe", icon: Users, badge: "Em breve" },
  { label: "Marketing", icon: Megaphone },
  { label: "Financeiro", icon: CircleDollarSign },
  { label: "Relatórios", icon: BarChart3, badge: "Em breve" },
];

const months = [
  { month: "Abr", revenue: 42, expenses: 23 },
  { month: "Mai", revenue: 58, expenses: 25 },
  { month: "Jun", revenue: 66, expenses: 30 },
  { month: "Jul", revenue: 76, expenses: 40 },
  { month: "Ago", revenue: 82, expenses: 41 },
  { month: "Set", revenue: 92, expenses: 45 },
];

function Logo() {
  return (
    <div className="flex items-center gap-2.5 text-xl font-extrabold text-foreground">
      <span className="relative grid size-7 place-items-center" aria-hidden="true">
        <span className="absolute bottom-1 left-0 h-2.5 w-5 rotate-[-9deg] rounded-sm bg-primary" />
        <span className="absolute right-0 top-0 h-6 w-2.5 rotate-[-27deg] rounded-sm bg-brand-soft" />
        <span className="absolute left-2.5 top-0 h-6 w-2.5 rotate-[25deg] rounded-sm bg-primary" />
      </span>
      <span>LEADPRO</span>
    </div>
  );
}

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-overlay lg:hidden" onClick={onClose} aria-hidden="true" />}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-52 flex-col border-r border-border bg-sidebar px-4 py-5 transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="mb-7 flex items-center justify-between px-1">
          <Logo />
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={onClose} aria-label="Fechar menu"><X className="size-5" /></Button>
        </div>
        <nav className="space-y-1" aria-label="Navegação principal">
          {navItems.map((item) => (
            <Button key={item.label} variant={item.active ? "soft" : "ghost"} className={`w-full justify-start gap-3 px-2.5 ${item.active ? "text-primary" : "text-sidebar-foreground"}`}>
              <item.icon className="size-[18px] shrink-0" strokeWidth={1.9} />
              <span className="text-sm">{item.label}</span>
              {item.badge && <span className="ml-auto rounded-sm bg-badge px-2 py-0.5 text-[10px] text-badge-foreground">{item.badge}</span>}
            </Button>
          ))}
        </nav>
        <div className="mt-auto space-y-3">
          <Button variant="ghost" className="w-full justify-start gap-3 px-2.5 text-sidebar-foreground"><Settings className="size-[18px]" /> <span className="text-sm">Configurações</span></Button>
          <div className="border-t border-border pt-3">
            <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 px-1">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-avatar text-xs font-bold text-primary-foreground">CM</span>
              <div className="min-w-0"><p className="truncate text-xs font-semibold">Carol Mascarenhas</p><p className="text-[11px] text-muted-foreground">Administradora</p></div>
              <Button variant="ghost" size="icon" aria-label="Opções da conta"><MoreVertical className="size-4" /></Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

function MetricCard({ icon, label, value, note, positive }: { icon: ReactNode; label: string; value: string; note: ReactNode; positive?: boolean }) {
  return (
    <article className="flex min-h-24 items-center gap-3 rounded-md border border-border bg-card px-4 py-3 shadow-card">
      <div className="grid size-10 shrink-0 place-items-center rounded-md bg-icon text-primary">{icon}</div>
      <div className="min-w-0"><p className="text-[13px] text-muted-foreground">{label}</p><strong className="mt-0.5 block truncate text-[22px] font-semibold leading-none text-foreground">{value}</strong><div className={`mt-2 flex items-center gap-1 text-[11px] ${positive ? "font-medium text-success" : "text-muted-foreground"}`}>{note}</div></div>
    </article>
  );
}

function Chart() {
  return (
    <section className="rounded-md border border-border bg-card p-4 shadow-card lg:col-span-7">
      <div className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
        <h2 className="truncate text-[15px] font-semibold">Receitas x Despesas</h2>
        <div className="flex gap-4 text-xs"><span className="flex items-center gap-1.5"><i className="size-2.5 rounded-full bg-primary" />Receitas</span><span className="flex items-center gap-1.5"><i className="size-2.5 rounded-full bg-brand-soft" />Despesas</span></div>
      </div>
      <div className="grid h-44 grid-cols-[50px_1fr] gap-2 sm:h-48">
        <div className="flex flex-col justify-between pb-5 text-right text-[10px] text-muted-foreground"><span>R$ 40 mil</span><span>R$ 30 mil</span><span>R$ 20 mil</span><span>R$ 10 mil</span><span>R$ 0</span></div>
        <div className="relative grid grid-cols-6 border-b border-l border-border bg-chart-lines px-2">
          {months.map((item) => <div key={item.month} className="flex min-w-0 flex-col items-center justify-end"><div className="flex h-full items-end gap-1"><span className="w-4 rounded-t-sm bg-primary sm:w-6" style={{ height: `${item.revenue}%` }} /><span className="w-4 rounded-t-sm bg-brand-soft sm:w-6" style={{ height: `${item.expenses}%` }} /></div><span className="mt-1.5 text-[11px] font-medium">{item.month}</span></div>)}
        </div>
      </div>
    </section>
  );
}

function Summary() {
  return <section className="rounded-md border border-border bg-card p-4 shadow-card lg:col-span-3"><div className="flex items-center justify-between"><h2 className="text-[15px] font-semibold">Resumo do período</h2><Info className="size-4 text-muted-foreground" /></div><p className="mt-3 text-[22px] font-semibold text-success">+ R$ 12.450</p><p className="text-xs text-muted-foreground">resultado no período</p><div className="my-4 border-t border-border" />{[["Receitas realizadas","R$ 21.400"],["Despesas realizadas","R$ 8.950"],["Resultado","+ R$ 12.450"],["Variação vs. período anterior","↑ 18%"]].map(([a,b],i)=><div key={a} className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 border-b border-border py-2 last:border-0"><span className="text-xs text-muted-foreground">{a}</span><strong className={`text-xs font-medium ${i>1?"text-success":""}`}>{b}</strong></div>)}</section>;
}

const shortcuts = [[UserPlus,"+ Novo cliente"],[FileText,"+ Novo lançamento"],[BarChart3,"Registrar faturamento"],[TrendingUp,"Iniciar onboarding"]] as const;
function QuickAccess() { return <section className="rounded-md border border-border bg-card p-4 shadow-card lg:col-span-3"><h2 className="mb-3 text-[15px] font-semibold">Acesso rápido</h2><div className="space-y-1">{shortcuts.map(([Icon,label])=><Button key={label} variant="soft" className="h-9 w-full justify-start gap-3 px-3 text-[13px]"><Icon className="size-[18px] text-primary" /><span>{label}</span><ChevronRight className="ml-auto size-4 text-muted-foreground" /></Button>)}</div></section>; }

function WorkCard() { return <section className="rounded-md border border-border bg-card p-4 shadow-card lg:col-span-4"><div className="flex items-center justify-between"><h2 className="text-base font-bold">Meu trabalho</h2><span className="rounded-sm bg-badge px-2 py-0.5 text-[10px] text-badge-foreground">Em breve</span></div><div className="flex h-44 flex-col items-center justify-center text-center"><div className="mb-4 grid size-16 place-items-center rounded-full bg-icon"><ListChecks className="size-8 text-brand-soft-foreground" /></div><strong className="text-sm">Seu espaço de trabalho está chegando.</strong><p className="mt-1 max-w-72 text-xs leading-5 text-muted-foreground">Aqui você acompanhará tarefas e ações atribuídas a você.</p></div></section>; }

const activities = [
  [ArrowUp,"success","Mensalidade recebida — Marcelo Nunes","R$ 697 · hoje, 14:32"],
  [ArrowDown,"destructive","F30 paga — Claude","R$ 120 · ontem, 15 set."],
  [FileText,"primary","Faturamento registrado — Ana Beatriz","R$ 15.000 · 15 set. 2026"],
  [Users,"primary","Cliente ativado — Gran Reserva","Status alterado para Ativo · 14 set. 2026"],
  [RefreshCw,"info","Onboarding atualizado — Luminaê","Etapa 2/5 · 13 set. 2026"],
] as const;
function Activities() { return <section className="rounded-md border border-border bg-card p-4 shadow-card lg:col-span-4"><div className="flex items-center justify-between"><h2 className="text-base font-bold">Atividades recentes</h2><Button variant="ghost" className="h-auto gap-1 p-0 text-xs text-link">Ver todas <ArrowRight className="size-3" /></Button></div><div className="mt-2 space-y-2">{activities.map(([Icon,tone,title,sub])=><div key={title} className="grid grid-cols-[32px_minmax(0,1fr)] items-center gap-2"><span className={`grid size-8 place-items-center rounded-full bg-${tone}-soft text-${tone}`}><Icon className="size-4" /></span><div className="min-w-0"><p className="truncate text-xs font-medium">{title}</p><p className="truncate text-[11px] text-muted-foreground">{sub}</p></div></div>)}</div></section>; }

const clients = [["L","Luminaê","R$ 2.840 · 126 leads","Alta relevância","success"],["H","Horizonte Empreendimentos","R$ 2.100 · 98 leads","1 pendência","warning"],["G","Gran Reserva","R$ 1.900 · 145 leads","Alto volume de leads","info"]] as const;
function PriorityClients() { return <section className="rounded-md border border-border bg-card p-4 shadow-card lg:col-span-4"><div className="flex items-center justify-between"><h2 className="text-base font-bold">Clientes prioritários</h2><Button variant="ghost" className="h-auto gap-1 p-0 text-xs text-link">Ver carteira <ArrowRight className="size-3" /></Button></div><div className="mt-4 space-y-3">{clients.map(([letter,name,value,badge,tone])=><div key={name} className="grid grid-cols-[42px_minmax(0,1fr)_auto] items-center gap-3"><span className="grid size-10 place-items-center rounded-full bg-avatar text-sm font-semibold text-primary-foreground">{letter}</span><div className="min-w-0"><p className="truncate text-xs font-semibold">{name}</p><p className="truncate text-[11px] text-muted-foreground">{value}</p></div><span className={`rounded-full bg-${tone}-soft px-2.5 py-1 text-[10px] text-${tone}`}>{badge}</span></div>)}</div></section>; }

function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="lg:pl-52">
        <header className="sticky top-0 z-20 grid h-[62px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-header/95 px-4 backdrop-blur sm:px-5">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMenuOpen(true)} aria-label="Abrir menu"><Menu className="size-5" /></Button>
          <label className="flex h-10 max-w-[500px] items-center gap-3 rounded-md border border-border bg-search px-3 text-muted-foreground"><Search className="size-5 shrink-0 text-primary" /><input aria-label="Buscar no sistema" placeholder="Buscar no sistema..." className="min-w-0 flex-1 bg-transparent text-sm outline-hidden placeholder:text-muted-foreground" /><kbd className="hidden rounded-sm bg-badge px-2 py-0.5 text-[11px] sm:inline">⌘ K</kbd></label>
          <div className="flex items-center gap-3 sm:gap-5"><Button variant="ghost" size="icon" className="relative" aria-label="Notificações"><Bell className="size-5 text-primary" /><i className="absolute right-1.5 top-1.5 size-2 rounded-full bg-destructive" /></Button><span className="hidden h-7 w-px bg-border sm:block" /><span className="hidden text-xs font-medium md:block">Terça-feira, 16 de setembro de 2026</span></div>
        </header>
        <main className="mx-auto max-w-[1180px] p-4 sm:p-5">
          <div className="mb-5 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4"><div className="min-w-0"><h1 className="truncate text-[28px] font-semibold">Bom dia, Carol!</h1><p className="mt-1 text-sm text-muted-foreground">Aqui está o resumo da LeadPro.</p></div><Button variant="outline" className="gap-3 px-3 text-xs sm:px-4"><CalendarDays className="size-4 text-primary" /><span className="hidden sm:inline">Setembro 2026</span><ChevronDown className="size-4" /></Button></div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard icon={<BarChart3 className="size-5" />} label="Receitas realizadas" value="R$ 21.400" positive note={<><ArrowUp className="size-3.5" /> 12% <span className="font-normal text-muted-foreground">vs. mês anterior</span></>} />
            <MetricCard icon={<TrendingUp className="size-5" />} label="Despesas realizadas" value="R$ 8.950" positive note={<><ArrowDown className="size-3.5" /> 5% <span className="font-normal text-muted-foreground">vs. mês anterior</span></>} />
            <MetricCard icon={<Users className="size-5" />} label="Clientes ativos" value="12" note="+2 no período" />
            <MetricCard icon={<Clock3 className="size-5" />} label="Pendências" value="3" note="2 financeiras · 1 onboarding" />
          </div>
          <div className="mt-3 grid gap-3 lg:grid-cols-13"><Chart /><Summary /><QuickAccess /></div>
          <div className="mt-3 grid gap-3 lg:grid-cols-12"><WorkCard /><Activities /><PriorityClients /></div>
        </main>
      </div>
    </div>
  );
}
