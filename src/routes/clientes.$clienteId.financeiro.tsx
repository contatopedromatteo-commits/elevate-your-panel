import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowUp,
  Banknote,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  CircleAlert,
  Clock3,
  MoreHorizontal,
  Pencil,
  Percent,
  Plus,
  ReceiptText,
  TrendingUp,
} from "lucide-react";
import type { ReactNode } from "react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { getClient } from "@/data/clients";

export const Route = createFileRoute("/clientes/$clienteId/financeiro")({
  loader: ({ params }) => {
    const client = getClient(params.clienteId);
    if (!client) throw notFound();
    return { client };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.client.name ?? "Cliente";
    const title = `Financeiro de ${name} — LeadPro`;
    const description = `Recebimentos, faturamento e condição comercial de ${name}.`;
    return { meta: [
      { title }, { name: "description", content: description },
      { property: "og:title", content: title }, { property: "og:description", content: description },
      { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
    ] };
  },
  component: ClientFinancePage,
});

const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const chartMonths = [
  { month: "Abr/26", monthly: 697, setup: 497, fee: 0 },
  { month: "Mai/26", monthly: 697, setup: 497, fee: 0 },
  { month: "Jun/26", monthly: 697, setup: 497, fee: 800 },
  { month: "Jul/26", monthly: 697, setup: 497, fee: 1200 },
  { month: "Ago/26", monthly: 697, setup: 497, fee: 1500 },
  { month: "Set/26", monthly: 697, setup: 0, fee: 850 },
];

function Panel({ title, action, children, className = "" }: { title: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return <section className={`rounded-md border border-border bg-card p-4 shadow-card ${className}`}><div className="flex items-center justify-between gap-3"><h2 className="text-[13px] font-semibold">{title}</h2>{action}</div>{children}</section>;
}

function Summary({ icon, label, value, note, tone = "primary" }: { icon: ReactNode; label: string; value: string; note: ReactNode; tone?: "primary" | "success" | "info" }) {
  const tones = { primary: "bg-primary-soft text-primary", success: "bg-success-soft text-success", info: "bg-info-soft text-info" };
  return <article className="flex min-h-[88px] items-center gap-3 rounded-md border border-border bg-card px-3 py-3 shadow-card"><span className={`grid size-9 shrink-0 place-items-center rounded-md ${tones[tone]} [&>svg]:size-[18px]`}>{icon}</span><div className="min-w-0"><p className="text-[10px] text-muted-foreground">{label}</p><strong className="mt-0.5 block truncate text-lg font-semibold leading-none">{value}</strong><div className="mt-2 truncate text-[9px] text-muted-foreground">{note}</div></div></article>;
}

function ClientFinancePage() {
  const { client } = Route.useLoaderData();
  const statusTone = client.status === "Ativo" ? "bg-success-soft text-success" : client.status === "Onboarding" ? "bg-info-soft text-info" : "bg-muted text-muted-foreground";
  const monthly = client.id === "gran-reserva" ? 697 : Math.max(497, Math.round(client.revenue * 0.45));
  const total = client.id === "gran-reserva" ? 19394 : monthly * 6 + 5900;

  return (
    <AppShell>
      <main className="mx-auto max-w-[1180px] p-4 sm:p-5">
        <Link to="/clientes/carteira" className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"><ChevronLeft className="size-3.5" />Voltar para a carteira</Link>
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid size-14 shrink-0 place-items-center rounded-md bg-avatar text-sm font-semibold text-primary-foreground">{client.initials}</span>
            <div className="min-w-0"><h1 className="truncate text-[24px] font-semibold">{client.name}</h1><p className="truncate text-xs text-muted-foreground">{client.company}</p><div className="mt-2 flex flex-wrap items-center gap-1.5"><span className={`rounded-sm px-2 py-1 text-[10px] font-medium ${statusTone}`}>{client.status}</span><span className="rounded-sm bg-info-soft px-2 py-1 text-[10px] font-medium text-info">{client.profile}</span><span className="text-[10px] text-muted-foreground">Responsável: {client.owner}</span></div></div>
          </div>
          <div className="flex gap-2"><Button variant="outline" className="h-8 gap-2 px-3 text-xs"><Pencil className="size-3.5" />Editar cliente</Button><Button variant="ghost" size="icon-sm" aria-label="Mais ações"><MoreHorizontal className="size-4" /></Button></div>
        </header>

        <nav className="mt-5 flex gap-1 overflow-x-auto border-b border-border" aria-label="Seções do cliente">
          <Link to="/clientes/$clienteId" params={{ clienteId: client.id }} className="-mb-px shrink-0 border-b-2 border-transparent px-3 pb-2 text-[12px] font-medium text-muted-foreground transition-colors hover:text-foreground">Visão Geral</Link>
          <Link to="/clientes/$clienteId/cadastro" params={{ clienteId: client.id }} className="-mb-px shrink-0 border-b-2 border-transparent px-3 pb-2 text-[12px] font-medium text-muted-foreground transition-colors hover:text-foreground">Cadastro e Condição</Link>
          <Link to="/clientes/$clienteId/acompanhamento" params={{ clienteId: client.id }} className="-mb-px shrink-0 border-b-2 border-transparent px-3 pb-2 text-[12px] font-medium text-muted-foreground transition-colors hover:text-foreground">Acompanhamento</Link>
          <Link to="/clientes/$clienteId/arquivos" params={{ clienteId: client.id }} className="-mb-px shrink-0 border-b-2 border-transparent px-3 pb-2 text-[12px] font-medium text-muted-foreground transition-colors hover:text-foreground">Arquivos</Link>
          <Link to="/clientes/$clienteId/financeiro" params={{ clienteId: client.id }} className="-mb-px shrink-0 border-b-2 border-primary px-3 pb-2 text-[12px] font-medium text-primary">Financeiro</Link>
        </nav>

        <div className="mt-4 flex justify-end"><Button variant="outline" className="h-8 justify-between gap-3 px-3 text-[11px]"><CalendarDays className="size-3.5" />Setembro 2026<ChevronDown className="size-3.5" /></Button></div>

        <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
          <Summary icon={<Banknote />} label="Total recebido" value={money.format(total)} note={<span className="text-success">↑ 28% <span className="text-muted-foreground">vs. período anterior</span></span>} tone="success" />
          <Summary icon={<Clock3 />} label="A receber" value={money.format(monthly * 2)} note="2 parcelas" tone="info" />
          <Summary icon={<TrendingUp />} label="Receita média mensal" value={money.format(client.id === "gran-reserva" ? 2766 : Math.round(total / 7))} note={<span className="text-success">↑ 12% <span className="text-muted-foreground">vs. período anterior</span></span>} />
          <Summary icon={<Percent />} label="Fee de performance" value={money.format(2500)} note="Total recebido" tone="info" />
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-[1.25fr_.85fr]">
          <Panel title="Evolução da receita da LeadPro" action={<Button variant="ghost" className="h-auto gap-1 p-0 text-[10px] text-muted-foreground">Últimos 6 meses<ChevronDown className="size-3" /></Button>}>
            <div className="mt-4 grid h-[190px] grid-cols-6 items-end gap-3 border-b border-border px-2 sm:gap-5">
              {chartMonths.map((item) => {
                const max = 2694;
                return <div key={item.month} className="flex h-full flex-col justify-end gap-2 text-center"><div className="mx-auto flex h-[145px] w-full max-w-9 flex-col justify-end overflow-hidden rounded-t-sm bg-muted"><span className="bg-info" style={{ height: `${(item.fee / max) * 100}%` }} /><span className="bg-brand-soft" style={{ height: `${(item.setup / max) * 100}%` }} /><span className="bg-primary" style={{ height: `${(item.monthly / max) * 100}%` }} /></div><span className="text-[9px] text-muted-foreground">{item.month}</span></div>;
              })}
            </div>
            <div className="mt-3 flex flex-wrap justify-center gap-4 text-[9px] text-muted-foreground"><LegendDot tone="primary" label="Mensalidade" /><LegendDot tone="brand" label="Setup" /><LegendDot tone="info" label="Fee de performance" /></div>
          </Panel>

          <Panel title="Situação financeira" action={<Button variant="ghost" className="h-auto p-0 text-[10px] text-link">Ver todas →</Button>}>
            <dl className="mt-3 divide-y divide-border text-[10px]">
              <Situation icon={<CircleAlert />} label="1 parcela vencida" value={money.format(monthly)} note="Vencida em 05/09/2026" tone="danger" />
              <Situation icon={<CalendarDays />} label="Próximo recebimento" value={money.format(monthly)} note="Vencimento em 05/10/2026" />
              <Situation icon={<ReceiptText />} label="Condição comercial" value={`Mensalidade: ${money.format(monthly)}`} note="Setup: R$ 497,00 · Fee de performance: 10% sobre vendas" />
            </dl>
          </Panel>
        </div>

        <div className="mt-3 grid gap-3 xl:grid-cols-2">
          <Panel title="Recebíveis do cliente (LeadPro)" action={<Button className="h-7 gap-1.5 px-2 text-[10px]"><Plus className="size-3" />Registrar recebimento</Button>}>
            <div className="mt-3 overflow-x-auto"><table className="w-full min-w-[570px] text-left text-[9px]"><thead className="border-b border-border text-muted-foreground"><tr><th className="pb-2 font-medium">Competência</th><th className="pb-2 font-medium">Descrição</th><th className="pb-2 font-medium">Vencimento</th><th className="pb-2 font-medium">Valor</th><th className="pb-2 font-medium">Status</th><th className="pb-2 font-medium">Realização</th><th /></tr></thead><tbody className="divide-y divide-border"><ReceivableRow period="Setembro/2026" due="05/09/2026" value={monthly} status="Vencido" realization="—" /><ReceivableRow period="Agosto/2026" due="05/08/2026" value={monthly} realization="04/08/2026" /><ReceivableRow period="Julho/2026" due="05/07/2026" value={monthly} realization="03/07/2026" /><ReceivableRow period="Julho/2026" description="Setup" due="05/07/2026" value={497} realization="03/07/2026" /><ReceivableRow period="Junho/2026" description="Fee de performance" due="30/06/2026" value={1200} realization="28/06/2026" /><ReceivableRow period="Junho/2026" due="05/06/2026" value={monthly} realization="04/06/2026" /></tbody></table></div>
          </Panel>

          <Panel title="Faturamento do cliente (base de comissão)" action={<Button variant="outline" className="h-7 gap-1.5 px-2 text-[10px]"><Plus className="size-3" />Registrar faturamento</Button>}>
            <div className="mt-3 overflow-x-auto"><table className="w-full min-w-[510px] text-left text-[9px]"><thead className="border-b border-border text-muted-foreground"><tr><th className="pb-2 font-medium">Período</th><th className="pb-2 font-medium">Vendas</th><th className="pb-2 font-medium">Faturamento</th><th className="pb-2 font-medium">Fee (10%)</th><th className="pb-2 font-medium">Status</th><th /></tr></thead><tbody className="divide-y divide-border"><BillingRow period="Agosto/2026" sales={2} revenue={150000} fee={15000} status="Pago" /><BillingRow period="Julho/2026" sales={1} revenue={80000} fee={8000} status="Pago" /><BillingRow period="Junho/2026" sales={2} revenue={120000} fee={12000} status="Pago" /><BillingRow period="Maio/2026" sales={1} revenue={70000} fee={7000} status="Pago" /><BillingRow period="Abril/2026" sales={0} revenue={0} fee={0} status="—" /></tbody></table></div>
            <div className="mt-3 flex items-start gap-2 rounded-md bg-info-soft px-3 py-2 text-[9px] leading-relaxed text-muted-foreground"><CircleAlert className="mt-0.5 size-3.5 shrink-0 text-info" />O faturamento registrado aqui é a base para cálculo do fee de performance. Ele não representa a receita da LeadPro, apenas o desempenho comercial do cliente.</div>
          </Panel>
        </div>
      </main>
    </AppShell>
  );
}

function LegendDot({ tone, label }: { tone: "primary" | "brand" | "info"; label: string }) {
  const colors = { primary: "bg-primary", brand: "bg-brand-soft", info: "bg-info" };
  return <span className="flex items-center gap-1.5"><i className={`size-2 rounded-full ${colors[tone]}`} />{label}</span>;
}

function Situation({ icon, label, value, note, tone = "info" }: { icon: ReactNode; label: string; value: string; note: string; tone?: "info" | "danger" }) {
  return <div className="grid grid-cols-[28px_minmax(0,1fr)] gap-2 py-3 first:pt-0 last:pb-0"><span className={`grid size-7 place-items-center rounded-md ${tone === "danger" ? "bg-destructive-soft text-destructive" : "bg-primary-soft text-primary"} [&>svg]:size-3.5`}>{icon}</span><div className="grid gap-1 sm:grid-cols-[minmax(0,1fr)_auto]"><dt className={tone === "danger" ? "text-destructive" : "text-muted-foreground"}>{label}</dt><dd className="font-semibold">{value}</dd><p className="col-span-full text-[9px] text-muted-foreground">{note}</p></div></div>;
}

function ReceivableRow({ period, description = "Mensalidade", due, value, status = "Pago", realization }: { period: string; description?: string; due: string; value: number; status?: "Pago" | "Vencido"; realization: string }) {
  return <tr><td className="py-2">{period}</td><td>{description}</td><td>{due}</td><td className="font-medium">{money.format(value)}</td><td><span className={`rounded-sm px-1.5 py-0.5 ${status === "Pago" ? "bg-success-soft text-success" : "bg-destructive-soft text-destructive"}`}>{status}</span></td><td>{realization}</td><td className="text-right"><Button variant="ghost" size="icon-sm" aria-label={`Mais ações de ${period}`}><MoreHorizontal className="size-3.5" /></Button></td></tr>;
}

function BillingRow({ period, sales, revenue, fee, status }: { period: string; sales: number; revenue: number; fee: number; status: "Pago" | "—" }) {
  return <tr><td className="py-2">{period}</td><td>{sales}</td><td>{money.format(revenue)}</td><td>{money.format(fee)}</td><td>{status === "Pago" ? <span className="rounded-sm bg-success-soft px-1.5 py-0.5 text-success">Pago</span> : "—"}</td><td className="text-right"><Button variant="ghost" size="icon-sm" aria-label={`Mais ações do faturamento de ${period}`}><MoreHorizontal className="size-3.5" /></Button></td></tr>;
}