import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  CircleAlert,
  Clock3,
  Wallet,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/financeiro")({
  head: () => ({
    meta: [
      { title: "Financeiro — LeadPro" },
      { name: "description", content: "Acompanhe a saúde financeira da LeadPro: saldo, entradas, saídas e contas a pagar e receber." },
      { property: "og:title", content: "Financeiro — LeadPro" },
      { property: "og:description", content: "Acompanhe a saúde financeira da LeadPro: saldo, entradas, saídas e contas a pagar e receber." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Financeiro,
});

const tabs = ["Painel", "Lançamentos", "Fluxo de Caixa", "A Pagar / A Receber", "Orçamento", "Entradas"];

const metrics = [
  { icon: Wallet, label: "Saldo atual", tag: "Hoje", value: "R$ 18.530", note: "Disponível em conta e aplicações", tone: "" },
  { icon: ArrowUp, label: "Entradas realizadas", tag: "Este mês", value: "R$ 21.400", note: "↑ 12% vs. mês anterior", tone: "text-success" },
  { icon: ArrowDown, label: "Saídas realizadas", tag: "Este mês", value: "R$ 8.950", note: "↓ 5% vs. mês anterior", tone: "text-destructive" },
  { icon: Clock3, label: "Resultado do período", tag: "Este mês", value: "+ R$ 12.450", note: "Receitas - Despesas · ↑ 18% vs. mês anterior", tone: "text-success" },
];

const balance = [
  { month: "Abr", value: 6 },
  { month: "Mai", value: 9 },
  { month: "Jun", value: 12 },
  { month: "Jul", value: 13 },
  { month: "Ago", value: 16 },
  { month: "Set", value: 21 },
];

const flow = [
  { month: "Abr", in: 42, out: 23 },
  { month: "Mai", in: 58, out: 25 },
  { month: "Jun", in: 66, out: 30 },
  { month: "Jul", in: 76, out: 40 },
  { month: "Ago", in: 82, out: 41 },
  { month: "Set", in: 92, out: 45 },
];

const distribution = [
  { label: "Tráfego pago", pct: 38, color: "var(--primary)" },
  { label: "Ferramentas e software", pct: 22, color: "oklch(0.62 0.09 250)" },
  { label: "Contabilidade", pct: 15, color: "oklch(0.72 0.07 245)" },
  { label: "Inteligência Artificial", pct: 10, color: "oklch(0.8 0.05 240)" },
  { label: "Outros", pct: 18, color: "oklch(0.88 0.02 240)" },
];

const payables = [
  { desc: "Contabilidade", cat: "Serviços contábeis", value: "R$ 350", due: "20/09" },
  { desc: "Ferramentas e software", cat: "Ferramentas", value: "R$ 189", due: "22/09" },
  { desc: "Domínio e hospedagem", cat: "Infraestrutura", value: "R$ 60", due: "25/09" },
  { desc: "Impostos (DAS)", cat: "Impostos", value: "R$ 70", due: "28/09" },
];

const receivables = [
  { client: "Marcelo Nunes", desc: "Mensalidade", value: "R$ 697", due: "20/09" },
  { client: "Ana Beatriz", desc: "Setup", value: "R$ 1.500", due: "23/09" },
  { client: "Horizonte Empreend.", desc: "Fee performance", value: "R$ 600", due: "28/09" },
  { client: "Vila Prime", desc: "Mensalidade", value: "R$ 697", due: "30/09" },
];

const alerts = [
  { title: "2 recebíveis vencidos", sub: "Marcelo Nunes · R$ 697 | 12/09" },
  { title: "1 conta vence hoje", sub: "Ferramentas · R$ 189" },
  { title: "3 recorrências sendo geradas", sub: "Contabilidade, Ferramentas, Domínio" },
];

function Card({ title, total, action, children, className = "" }: { title: string; total?: string; action?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-md border border-border bg-card p-4 shadow-card ${className}`}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-baseline gap-2">
          <h2 className="truncate text-[15px] font-semibold">{title}</h2>
          {total && <span className="text-xs font-medium text-muted-foreground">{total}</span>}
        </div>
        {action && (
          <Button variant="ghost" className="h-auto gap-1 p-0 text-xs text-link">
            {action} <ArrowRight className="size-3" />
          </Button>
        )}
      </div>
      {children}
    </section>
  );
}

function BalanceChart() {
  const points = balance.map((b, i) => `${(i / (balance.length - 1)) * 100},${100 - (b.value / 24) * 100}`);
  const line = points.map((p) => p.split(",").map(Number));
  return (
    <Card title="Evolução do saldo" action="Realizado" className="lg:col-span-4">
      <div className="grid h-44 grid-cols-[44px_1fr] gap-2">
        <div className="flex flex-col justify-between pb-5 text-right text-[10px] text-muted-foreground">
          <span>R$ 30 mil</span><span>R$ 20 mil</span><span>R$ 10 mil</span><span>R$ 0</span>
        </div>
        <div className="relative border-b border-l border-border bg-chart-lines">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-[calc(100%-20px)] w-full">
            <polygon points={`0,100 ${points.join(" ")} 100,100`} fill="var(--primary)" opacity="0.08" />
            <polyline points={points.join(" ")} fill="none" stroke="var(--primary)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          </svg>
          <div className="absolute inset-x-0 bottom-0 flex justify-between px-1 pb-1">
            {balance.map((b) => <span key={b.month} className="text-[10px] text-muted-foreground">{b.month}</span>)}
          </div>
          {line.map(([x, y], i) => (
            <span key={i} className="absolute size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" style={{ left: `${x}%`, top: `${(y ?? 0) * 0.88}%` }} />
          ))}
        </div>
      </div>
    </Card>
  );
}

function FlowChart() {
  return (
    <Card title="Entradas x Saídas" action="Realizado" className="lg:col-span-4">
      <div className="grid h-44 grid-cols-[44px_1fr] gap-2">
        <div className="flex flex-col justify-between pb-5 text-right text-[10px] text-muted-foreground">
          <span>R$ 30 mil</span><span>R$ 20 mil</span><span>R$ 10 mil</span><span>R$ 0</span>
        </div>
        <div className="relative grid grid-cols-6 border-b border-l border-border bg-chart-lines px-2">
          {flow.map((item) => (
            <div key={item.month} className="flex min-w-0 flex-col items-center justify-end">
              <div className="flex h-full items-end gap-1">
                <span className="w-3 rounded-t-sm bg-primary sm:w-4" style={{ height: `${item.in}%` }} />
                <span className="w-3 rounded-t-sm bg-brand-soft sm:w-4" style={{ height: `${item.out}%` }} />
              </div>
              <span className="mt-1.5 text-[11px] font-medium">{item.month}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex justify-center gap-4 text-xs">
        <span className="flex items-center gap-1.5"><i className="size-2.5 rounded-full bg-primary" />Entradas</span>
        <span className="flex items-center gap-1.5"><i className="size-2.5 rounded-full bg-brand-soft" />Saídas</span>
      </div>
    </Card>
  );
}

function Distribution() {
  const total = distribution.reduce((s, d) => s + d.pct, 0);
  let acc = 0;
  const gradient = distribution
    .map((d) => {
      const start = (acc / total) * 360;
      acc += d.pct;
      return `${d.color} ${start}deg ${(acc / total) * 360}deg`;
    })
    .join(", ");
  return (
    <Card title="Distribuição das saídas" action="Saídas" className="lg:col-span-4">
      <div className="flex items-center gap-5">
        <div className="relative size-28 shrink-0 rounded-full" style={{ background: `conic-gradient(${gradient})` }}>
          <div className="absolute inset-3 grid place-items-center rounded-full bg-card text-center">
            <div><p className="text-sm font-semibold">R$ 8.950</p><p className="text-[10px] text-muted-foreground">total</p></div>
          </div>
        </div>
        <ul className="min-w-0 flex-1 space-y-1.5">
          {distribution.map((d) => (
            <li key={d.label} className="flex items-center gap-2 text-xs">
              <i className="size-2.5 shrink-0 rounded-full" style={{ background: d.color }} />
              <span className="min-w-0 flex-1 truncate text-muted-foreground">{d.label}</span>
              <strong className="font-medium">{d.pct}%</strong>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

function MoneyTable({ rows, type }: { rows: readonly { desc: string; cat: string; value: string; due: string }[] | readonly { client: string; desc: string; value: string; due: string }[]; type: "pagar" | "receber" }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-border text-left text-[11px] text-muted-foreground">
            <th className="pb-2 pr-3 font-medium">{type === "pagar" ? "Descrição" : "Cliente"}</th>
            <th className="pb-2 pr-3 font-medium">{type === "pagar" ? "Categoria" : "Descrição"}</th>
            <th className="pb-2 pr-3 font-medium">Valor</th>
            <th className="pb-2 pr-3 font-medium whitespace-nowrap">Vencimento</th>
            <th className="hidden pb-2 font-medium xl:table-cell">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            const first = "client" in r ? r.client : r.desc;
            const second = "client" in r ? r.desc : r.cat;
            return (
              <tr key={first} className="border-b border-border last:border-0">
                <td className="max-w-32 truncate py-2.5 pr-3 font-medium">{first}</td>
                <td className="max-w-28 truncate py-2.5 pr-3 text-muted-foreground">{second}</td>
                <td className="py-2.5 pr-3 font-medium whitespace-nowrap">{r.value}</td>
                <td className="py-2.5 pr-3 text-muted-foreground whitespace-nowrap">{r.due}</td>
                <td className="hidden py-2.5 xl:table-cell"><span className="rounded-full bg-info-soft px-2 py-0.5 text-[10px] text-info">Em aberto</span></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Financeiro() {
  return (
    <AppShell>
    <main className="mx-auto max-w-[1180px] p-4 sm:p-5">
      <div className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
        <div className="min-w-0">
          <h1 className="truncate text-[28px] font-semibold">Financeiro</h1>
          <p className="mt-1 text-sm text-muted-foreground">Acompanhe a saúde financeira da LeadPro.</p>
        </div>
        <Button variant="outline" className="gap-3 px-3 text-xs sm:px-4">
          <CalendarDays className="size-4 text-primary" />
          <span className="hidden sm:inline">Setembro 2026</span>
          <ChevronDown className="size-4" />
        </Button>
      </div>

      <nav className="mb-4 flex gap-1 overflow-x-auto border-b border-border" aria-label="Seções do financeiro">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            className={`whitespace-nowrap border-b-2 px-3 pb-2 text-[13px] transition-colors ${i === 0 ? "border-primary font-medium text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
          >
            {tab}
          </button>
        ))}
      </nav>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((m) => (
          <article key={m.label} className="rounded-md border border-border bg-card px-4 py-3 shadow-card">
            <div className="flex items-center justify-between">
              <span className="grid size-8 place-items-center rounded-md bg-icon text-primary"><m.icon className="size-4" /></span>
              <span className="rounded-sm bg-badge px-2 py-0.5 text-[10px] text-badge-foreground">{m.tag}</span>
            </div>
            <p className="mt-3 text-[13px] text-muted-foreground">{m.label}</p>
            <strong className={`mt-0.5 block text-[22px] font-semibold leading-none ${m.tone || "text-foreground"}`}>{m.value}</strong>
            <p className={`mt-2 text-[11px] ${m.tone || "text-muted-foreground"}`}>{m.note}</p>
          </article>
        ))}
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-12">
        <BalanceChart />
        <FlowChart />
        <Distribution />
      </div>

      <div className="mt-3 grid gap-3 lg:grid-cols-12">
        <Card title="A pagar" total="R$ 2.480 em aberto" action="Ver todas" className="lg:col-span-4">
          <MoneyTable rows={payables} type="pagar" />
        </Card>
        <Card title="A receber" total="R$ 4.394 em aberto" action="Ver todas" className="lg:col-span-4">
          <MoneyTable rows={receivables} type="receber" />
        </Card>
        <Card title="Atenção" action="Ver todas" className="lg:col-span-4">
          <div className="space-y-1">
            {alerts.map((a) => (
              <button key={a.title} className="flex w-full items-center gap-3 rounded-md px-2 py-2.5 text-left transition-colors hover:bg-muted">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-destructive-soft text-destructive"><CircleAlert className="size-4" /></span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-xs font-medium">{a.title}</span>
                  <span className="block truncate text-[11px] text-muted-foreground">{a.sub}</span>
                </span>
                <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
              </button>
            ))}
          </div>
        </Card>
      </div>
    </main>
    </AppShell>
  );
}
