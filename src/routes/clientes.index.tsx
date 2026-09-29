import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CircleDollarSign,
  Clock3,
  Plus,
  Ticket,
  UserPlus,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/clientes/")({
  head: () => ({
    meta: [
      { title: "Clientes — LeadPro" },
      { name: "description", content: "Visão geral da carteira de clientes da LeadPro: status, perfil econômico e movimentações." },
      { property: "og:title", content: "Clientes — LeadPro" },
      { property: "og:description", content: "Visão geral da carteira de clientes da LeadPro: status, perfil econômico e movimentações." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ClientesPage,
});

function MetricCard({ icon, label, value, note }: { icon: ReactNode; label: string; value: string; note: ReactNode }) {
  return (
    <article className="flex min-h-24 items-center gap-3 rounded-md border border-border bg-card px-4 py-3 shadow-card">
      <div className="grid size-10 shrink-0 place-items-center rounded-md bg-icon text-primary">{icon}</div>
      <div className="min-w-0">
        <p className="text-[13px] text-muted-foreground">{label}</p>
        <strong className="mt-0.5 block truncate text-[22px] font-semibold leading-none text-foreground">{value}</strong>
        <div className="mt-2 flex items-center gap-1 text-[11px] font-medium text-success">{note}</div>
      </div>
    </article>
  );
}

function Donut({ segments, centerLabel, centerValue }: { segments: { color: string; value: number }[]; centerLabel: string; centerValue: string }) {
  const total = segments.reduce((acc, s) => acc + s.value, 0);
  let acc = 0;
  const gradient = segments
    .map((s) => {
      const start = (acc / total) * 360;
      acc += s.value;
      const end = (acc / total) * 360;
      return `${s.color} ${start}deg ${end}deg`;
    })
    .join(", ");
  return (
    <div className="relative grid size-32 shrink-0 place-items-center rounded-full" style={{ background: `conic-gradient(${gradient})` }}>
      <div className="grid size-20 place-items-center rounded-full bg-card text-center">
        <div>
          <p className="text-lg font-bold leading-none">{centerValue}</p>
          <p className="mt-0.5 text-[10px] text-muted-foreground">{centerLabel}</p>
        </div>
      </div>
    </div>
  );
}

const statusSegments = [
  { label: "Ativos", value: 6, pct: "67%", color: "var(--primary)" },
  { label: "Onboarding", value: 2, pct: "17%", color: "var(--brand-soft)" },
  { label: "Pausados", value: 1, pct: "9%", color: "var(--warning)" },
  { label: "Encerrados", value: 1, pct: "8%", color: "var(--border)" },
];

const perfilSegments = [
  { label: "High", value: 4, pct: "33%", color: "var(--primary)" },
  { label: "Medium", value: 5, pct: "42%", color: "var(--brand-soft)" },
  { label: "Low", value: 3, pct: "25%", color: "var(--border)" },
];

const atuacao = [
  { label: "Apartamentos", value: 6 },
  { label: "Loteamentos", value: 4 },
  { label: "Casas", value: 3 },
  { label: "Comerciais", value: 2 },
  { label: "Outros", value: 1 },
];

const priorityClients = [
  { letter: "L", name: "Luminaê", info: "R$ 2.840,00 · 126 leads", badge: "Alta relevância", tone: "info" },
  { letter: "H", name: "Horizonte", info: "R$ 2.100,00 · 98 leads", badge: "1 pendência", tone: "warning" },
  { letter: "G", name: "Gran Reserva", info: "R$ 1.900,00 · 145 leads", badge: "Em expansão", tone: "info" },
  { letter: "A", name: "Ana Beatriz", info: "R$ 1.500,00 · 62 leads", badge: "Potencial", tone: "info" },
  { letter: "M", name: "Marcelo Nunes", info: "R$ 1.200,00 · 52 leads", badge: "Atenção", tone: "warning" },
] as const;

const movimentacao: { icon: LucideIcon; tone: string; value: string; label: string; sub: string }[] = [
  { icon: Plus, tone: "success", value: "2", label: "novos clientes", sub: "vs. 0 no período anterior" },
  { icon: Clock3, tone: "info", value: "1", label: "entrou em onboarding", sub: "vs. 0 no período anterior" },
  { icon: ArrowUp, tone: "success", value: "2", label: "foram ativados", sub: "vs. 1 no período anterior" },
  { icon: X, tone: "destructive", value: "0", label: "encerrados", sub: "vs. 0 no período anterior" },
];

const recentClients = [
  { letter: "G", name: "Gran Reserva", info: "Adicionado em 12/09/2026", badge: "Onboarding", tone: "info" },
  { letter: "A", name: "Ana Beatriz", info: "Adicionado em 05/09/2026", badge: "Ativo", tone: "success" },
  { letter: "M", name: "Marcelo Nunes", info: "Adicionado em 22/08/2026", badge: "Ativo", tone: "success" },
  { letter: "H", name: "Horizonte", info: "Adicionado em 14/08/2026", badge: "Ativo", tone: "success" },
  { letter: "L", name: "Luminaê", info: "Adicionado em 17/08/2026", badge: "Ativo", tone: "success" },
] as const;

function Badge({ tone, children }: { tone: string; children: ReactNode }) {
  return <span className={`rounded-full bg-${tone}-soft px-2.5 py-1 text-[10px] text-${tone}`}>{children}</span>;
}

function ClientesPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-[1180px] p-4 sm:p-5">
        <div className="mb-5 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
          <div className="min-w-0">
            <h1 className="truncate text-[28px] font-semibold">Clientes</h1>
            <p className="mt-1 text-sm text-muted-foreground">Acompanhe sua carteira e a situação dos clientes da LeadPro.</p>
          </div>
          <Button className="gap-2 px-3 text-xs sm:px-4"><Plus className="size-4" />Novo cliente</Button>
        </div>

        <div className="mb-4 flex gap-1 border-b border-border">
          <Link to="/clientes" activeOptions={{ exact: true }} className="-mb-px border-b-2 border-primary px-3 pb-2 text-[13px] font-medium text-primary">Visão Geral</Link>
          <Link to="/clientes/carteira" className="-mb-px border-b-2 border-transparent px-3 pb-2 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground">Carteira</Link>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard icon={<Users className="size-5" />} label="Clientes ativos" value="8" note={<><ArrowUp className="size-3.5" /> +2 <span className="font-normal text-muted-foreground">vs. mês anterior</span></>} />
          <MetricCard icon={<Clock3 className="size-5" />} label="Em onboarding" value="2" note={<><ArrowUp className="size-3.5" /> +1 <span className="font-normal text-muted-foreground">vs. mês anterior</span></>} />
          <MetricCard icon={<CircleDollarSign className="size-5" />} label="Receita da carteira" value="R$ 6.348,00" note={<><ArrowUp className="size-3.5" /> 18% <span className="font-normal text-muted-foreground">vs. mês anterior</span></>} />
          <MetricCard icon={<Ticket className="size-5" />} label="Ticket médio" value="R$ 793,00" note={<><ArrowUp className="size-3.5" /> 12% <span className="font-normal text-muted-foreground">vs. mês anterior</span></>} />
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-3">
          <section className="rounded-md border border-border bg-card p-4 shadow-card">
            <h2 className="text-[15px] font-semibold">Clientes por status</h2>
            <div className="mt-4 flex items-center gap-5">
              <Donut segments={statusSegments} centerValue="12" centerLabel="clientes" />
              <ul className="min-w-0 flex-1 space-y-2">
                {statusSegments.map((s) => (
                  <li key={s.label} className="flex items-center gap-2 text-xs">
                    <i className="size-2.5 shrink-0 rounded-full" style={{ background: s.color }} />
                    <span className="text-muted-foreground">{s.label}</span>
                    <span className="ml-auto font-medium">{s.value} ({s.pct})</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="rounded-md border border-border bg-card p-4 shadow-card">
            <h2 className="text-[15px] font-semibold">Perfil econômico da carteira</h2>
            <div className="mt-4 flex items-center gap-5">
              <Donut segments={perfilSegments} centerValue="12" centerLabel="clientes" />
              <ul className="min-w-0 flex-1 space-y-2">
                {perfilSegments.map((s) => (
                  <li key={s.label} className="flex items-center gap-2 text-xs">
                    <i className="size-2.5 shrink-0 rounded-full" style={{ background: s.color }} />
                    <span className="text-muted-foreground">{s.label}</span>
                    <span className="ml-auto font-medium">{s.value} ({s.pct})</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="rounded-md border border-border bg-card p-4 shadow-card">
            <h2 className="text-[15px] font-semibold">Atuação da carteira</h2>
            <ul className="mt-4 space-y-3">
              {atuacao.map((a) => (
                <li key={a.label} className="grid grid-cols-[92px_minmax(0,1fr)_auto] items-center gap-2 text-xs">
                  <span className="truncate text-muted-foreground">{a.label}</span>
                  <span className="h-2 overflow-hidden rounded-full bg-muted">
                    <span className="block h-full rounded-full bg-brand-soft" style={{ width: `${(a.value / 6) * 100}%` }} />
                  </span>
                  <span className="w-4 text-right font-medium">{a.value}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-3">
          <section className="rounded-md border border-border bg-card p-4 shadow-card">
            <div className="flex items-center justify-between">
              <h2 className="text-[15px] font-semibold">Clientes prioritários</h2>
              <Button variant="ghost" className="h-auto gap-1 p-0 text-xs text-link">Ver todos <ArrowRight className="size-3" /></Button>
            </div>
            <div className="mt-4 space-y-3">
              {priorityClients.map((c) => (
                <div key={c.name} className="grid grid-cols-[36px_minmax(0,1fr)_auto] items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-full bg-avatar text-xs font-semibold text-primary-foreground">{c.letter}</span>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold">{c.name}</p>
                    <p className="truncate text-[11px] text-muted-foreground">{c.info}</p>
                  </div>
                  <Badge tone={c.tone}>{c.badge}</Badge>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-md border border-border bg-card p-4 shadow-card">
            <div className="flex items-center justify-between">
              <h2 className="text-[15px] font-semibold">Movimentação da carteira</h2>
              <Button variant="outline" className="h-7 gap-1 px-2 text-[11px]">Últimos 30 dias <ArrowDown className="size-3" /></Button>
            </div>
            <div className="mt-4 space-y-3">
              {movimentacao.map((m) => (
                <div key={m.label} className="grid grid-cols-[32px_auto_minmax(0,1fr)] items-center gap-2">
                  <span className={`grid size-8 place-items-center rounded-full bg-${m.tone}-soft text-${m.tone}`}><m.icon className="size-4" /></span>
                  <strong className="text-sm font-semibold">{m.value}</strong>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium">{m.label}</p>
                    <p className="truncate text-[11px] text-muted-foreground">{m.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-md border border-border bg-card p-4 shadow-card">
            <div className="flex items-center justify-between">
              <h2 className="text-[15px] font-semibold">Clientes recentes</h2>
              <Button variant="ghost" className="h-auto gap-1 p-0 text-xs text-link">Ver todos <ArrowRight className="size-3" /></Button>
            </div>
            <div className="mt-4 space-y-3">
              {recentClients.map((c) => (
                <div key={c.name} className="grid grid-cols-[36px_minmax(0,1fr)_auto] items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-full bg-avatar text-xs font-semibold text-primary-foreground">{c.letter}</span>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold">{c.name}</p>
                    <p className="truncate text-[11px] text-muted-foreground">{c.info}</p>
                  </div>
                  <Badge tone={c.tone}>{c.badge}</Badge>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </AppShell>
  );
}
