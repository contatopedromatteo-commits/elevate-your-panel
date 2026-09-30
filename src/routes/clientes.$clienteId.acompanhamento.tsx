import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  CircleAlert,
  Download,
  Gauge,
  MoreHorizontal,
  Pencil,
  Plus,
  Target,
  UserCheck,
  Users,
  WalletCards,
} from "lucide-react";
import type { ReactNode } from "react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { getClient } from "@/data/clients";

export const Route = createFileRoute("/clientes/$clienteId/acompanhamento")({
  loader: ({ params }) => {
    const client = getClient(params.clienteId);
    if (!client) throw notFound();
    return { client };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.client.name ?? "Cliente";
    const title = `Acompanhamento de ${name} — LeadPro`;
    const description = `Funil, performance e histórico de resultados de ${name}.`;
    return { meta: [
      { title }, { name: "description", content: description },
      { property: "og:title", content: title }, { property: "og:description", content: description },
      { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
    ] };
  },
  component: ClientTrackingPage,
});

const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

function Panel({ title, action, children, className = "" }: { title: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return <section className={`rounded-md border border-border bg-card p-4 shadow-card ${className}`}><div className="flex items-center justify-between gap-3"><h2 className="text-[14px] font-semibold">{title}</h2>{action}</div>{children}</section>;
}

function FunnelMetric({ icon, label, value, note, tone = "primary" }: { icon: ReactNode; label: string; value: string; note: string; tone?: "primary" | "success" | "info" }) {
  const tones = { primary: "bg-primary-soft text-primary", success: "bg-success-soft text-success", info: "bg-info-soft text-info" };
  return <article className="flex min-h-[82px] items-center gap-3 rounded-md border border-border bg-card px-3 py-3 shadow-card"><span className={`grid size-9 shrink-0 place-items-center rounded-md ${tones[tone]} [&>svg]:size-[18px]`}>{icon}</span><div className="min-w-0"><p className="text-[10px] text-muted-foreground">{label}</p><strong className="mt-0.5 block truncate text-lg font-semibold leading-none">{value}</strong><p className="mt-1.5 truncate text-[9px] text-muted-foreground">{note}</p></div></article>;
}

const months = ["Abr/26", "Mai/26", "Jun/26", "Jul/26", "Ago/26", "Set/26"];
const leadPoints = "18,104 82,91 146,77 210,67 274,58 338,42";
const qualifiedPoints = "18,118 82,110 146,101 210,91 274,82 338,68";

function ClientTrackingPage() {
  const { client } = Route.useLoaderData();
  const statusTone = client.status === "Ativo" ? "bg-success-soft text-success" : client.status === "Onboarding" ? "bg-info-soft text-info" : "bg-muted text-muted-foreground";
  const leads = client.id === "gran-reserva" ? 145 : 84 + client.name.length * 4;
  const qualified = Math.round(leads * 0.262);
  const opportunities = Math.round(qualified * 0.21);
  const sales = Math.max(1, Math.round(opportunities * 0.375));

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
          <Link to="/clientes/$clienteId/acompanhamento" params={{ clienteId: client.id }} className="-mb-px shrink-0 border-b-2 border-primary px-3 pb-2 text-[12px] font-medium text-primary">Acompanhamento</Link>
          {['Arquivos', 'Financeiro'].map((tab) => <span key={tab} className="-mb-px shrink-0 border-b-2 border-transparent px-3 pb-2 text-[12px] font-medium text-muted-foreground">{tab}</span>)}
        </nav>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-[14px] font-semibold">Funil de vendas</h2><p className="mt-0.5 text-[10px] text-muted-foreground">Resultados consolidados do período</p></div><Button variant="outline" className="h-8 justify-between gap-3 px-3 text-[11px]"><CalendarDays className="size-3.5" />Setembro 2026<ChevronDown className="size-3.5" /></Button></div>

        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <FunnelMetric icon={<Users />} label="Leads" value={String(leads)} note="↑ 20% no período" />
          <FunnelMetric icon={<UserCheck />} label="Qualificados" value={String(qualified)} note="26,2% dos leads" tone="info" />
          <FunnelMetric icon={<Target />} label="Oportunidades" value={String(opportunities)} note="21% dos qualificados" tone="info" />
          <FunnelMetric icon={<CheckCircle2 />} label="Vendas" value={String(sales)} note="37,5% de conversão" tone="success" />
          <FunnelMetric icon={<Gauge />} label="CPL" value="R$ 20,69" note="R$ 3.000 investidos" />
          <FunnelMetric icon={<WalletCards />} label="Faturamento do cliente" value={money.format(150000)} note="↑ 61% vs. mês anterior" tone="success" />
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-[1.4fr_.8fr]">
          <Panel title="Evolução da performance" action={<Button variant="ghost" className="h-auto gap-1 p-0 text-[10px] text-muted-foreground">Leads<ChevronDown className="size-3" /></Button>}>
            <div className="mt-4 h-[184px]">
              <svg viewBox="0 0 356 145" className="h-[150px] w-full" role="img" aria-label="Evolução de leads e qualificados entre abril e setembro">
                {[25, 55, 85, 115].map((y) => <line key={y} x1="18" x2="338" y1={y} y2={y} className="stroke-border" strokeWidth="1" />)}
                <polyline points={qualifiedPoints} fill="none" className="stroke-brand-soft" strokeWidth="2" />
                <polyline points={leadPoints} fill="none" className="stroke-primary" strokeWidth="2.5" />
                {leadPoints.split(" ").map((point) => { const [cx, cy] = point.split(","); return <circle key={point} cx={cx} cy={cy} r="3" className="fill-card stroke-primary" strokeWidth="2" />; })}
                {months.map((month, index) => <text key={month} x={18 + index * 64} y="139" textAnchor="middle" className="fill-muted-foreground text-[7px]">{month}</text>)}
                <g><rect x="316" y="24" width="35" height="16" rx="3" className="fill-primary" /><text x="333.5" y="35" textAnchor="middle" className="fill-primary-foreground text-[7px] font-semibold">{leads}</text></g>
              </svg>
              <div className="flex justify-center gap-5 text-[10px] text-muted-foreground"><span className="flex items-center gap-1.5"><i className="size-2 rounded-full bg-primary" />Leads</span><span className="flex items-center gap-1.5"><i className="size-2 rounded-full bg-brand-soft" />Qualificados</span></div>
            </div>
          </Panel>

          <Panel title="Qualidade dos leads">
            <div className="mt-4 grid grid-cols-[130px_1fr] items-center gap-3">
              <div className="relative mx-auto size-28"><svg viewBox="0 0 42 42" className="size-full -rotate-90" role="img" aria-label="Distribuição da qualidade dos leads"><circle cx="21" cy="21" r="15.9" fill="none" className="stroke-muted" strokeWidth="5" /><circle cx="21" cy="21" r="15.9" fill="none" className="stroke-success" strokeWidth="5" strokeDasharray="26.2 73.8" /><circle cx="21" cy="21" r="15.9" fill="none" className="stroke-info" strokeWidth="5" strokeDasharray="41 59" strokeDashoffset="-26.2" /><circle cx="21" cy="21" r="15.9" fill="none" className="stroke-warning" strokeWidth="5" strokeDasharray="27.3 72.7" strokeDashoffset="-67.2" /></svg><div className="absolute inset-0 grid place-content-center text-center"><strong className="text-lg font-semibold">{leads}</strong><span className="text-[9px] text-muted-foreground">leads</span></div></div>
              <ul className="space-y-2 text-[10px]"><Legend tone="success" label="Qualificados" value={qualified} percent="26,2%" /><Legend tone="info" label="Não qualificados" value={59} percent="40,7%" /><Legend tone="warning" label="Sem retorno" value={40} percent="27,6%" /><Legend tone="muted" label="Em análise" value={8} percent="5,5%" /></ul>
            </div>
          </Panel>
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-[1.15fr_.85fr]">
          <Panel title="Origem dos leads" action={<span className="text-[10px] text-muted-foreground">Setembro 2026</span>}>
            <div className="mt-4 space-y-3"><Origin label="Meta Ads" value={67} percent="46,2%" /><Origin label="Google Ads" value={31} percent="21,4%" /><Origin label="Orgânico" value={14} percent="9,7%" /><Origin label="Indicação" value={8} percent="5,5%" /></div>
          </Panel>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <Panel title="Pontos de atenção"><ul className="mt-3 space-y-2 text-[10px]"><Attention text="Volume de leads abaixo da meta para o mês." /><Attention text="Aumentar orçamento no conjunto de Loteamentos." /><Attention text="Taxa de desqualificação por renda aumentou." /></ul></Panel>
            <Panel title="Acompanhamento" action={<Button variant="ghost" className="h-auto p-0 text-[10px] text-link">Editar</Button>}><dl className="mt-3 space-y-2.5 text-[10px]"><TrackingRow label="Última atualização" value="15/09/2026" /><TrackingRow label="Responsável" value={client.owner} /><TrackingRow label="Situação da campanha" value="Em andamento" /><TrackingRow label="Próxima ação" value="Ajustar segmentação e revisar criativos." /></dl></Panel>
          </div>
        </div>

        <Panel title="Histórico de resultados" className="mt-3" action={<div className="flex gap-2"><Button className="h-7 gap-1.5 px-2 text-[10px]"><Plus className="size-3" />Registrar resultado</Button><Button variant="outline" className="h-7 gap-1.5 px-2 text-[10px]"><Download className="size-3" />Exportar</Button></div>}>
          <div className="mt-3 overflow-x-auto"><table className="w-full min-w-[780px] text-left text-[10px]"><thead className="border-b border-border uppercase text-muted-foreground"><tr><th className="pb-2 font-medium">Período</th><th className="pb-2 font-medium">Leads</th><th className="pb-2 font-medium">Qualificados</th><th className="pb-2 font-medium">Vendas</th><th className="pb-2 font-medium">Faturamento do cliente</th><th className="pb-2 font-medium">CPL</th><th className="pb-2 font-medium">Observações</th><th /></tr></thead><tbody className="divide-y divide-border"><ResultRow period="Setembro/2026" leads={145} qualified={38} sales={3} revenue={150000} cpl="R$ 20,69" note="—" /><ResultRow period="Agosto/2026" leads={116} qualified={31} sales={2} revenue={95000} cpl="R$ 25,84" note="Campanha institucional" /><ResultRow period="Julho/2026" leads={102} qualified={28} sales={2} revenue={85000} cpl="R$ 29,40" note="Lançamento fase 2" /><ResultRow period="Junho/2026" leads={87} qualified={24} sales={1} revenue={45000} cpl="R$ 26,90" note="—" /><ResultRow period="Maio/2026" leads={66} qualified={18} sales={1} revenue={28000} cpl="R$ 24,75" note="Início das campanhas" /></tbody></table></div>
        </Panel>
      </main>
    </AppShell>
  );
}

function Legend({ tone, label, value, percent }: { tone: "success" | "info" | "warning" | "muted"; label: string; value: number; percent: string }) {
  const dots = { success: "bg-success", info: "bg-info", warning: "bg-warning", muted: "bg-muted-foreground" };
  return <li className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-2"><i className={`size-2 rounded-full ${dots[tone]}`} /><span className="truncate text-muted-foreground">{label}</span><strong>{value}</strong><span className="w-8 text-right text-muted-foreground">{percent}</span></li>;
}

function Origin({ label, value, percent }: { label: string; value: number; percent: string }) {
  const width = value === 67 ? "w-full" : value === 31 ? "w-[46%]" : value === 14 ? "w-[21%]" : "w-[12%]";
  return <div className="grid grid-cols-[78px_minmax(80px,1fr)_26px_36px] items-center gap-2 text-[10px]"><span>{label}</span><span className="h-1.5 overflow-hidden rounded-full bg-muted"><i className={`block h-full rounded-full bg-primary ${width}`} /></span><strong className="text-right">{value}</strong><span className="text-right text-muted-foreground">{percent}</span></div>;
}

function Attention({ text }: { text: string }) { return <li className="flex items-start gap-2"><CircleAlert className="mt-0.5 size-3.5 shrink-0 text-warning" /><span className="leading-relaxed text-muted-foreground">{text}</span></li>; }

function TrackingRow({ label, value }: { label: string; value: string }) { return <div className="grid grid-cols-[112px_minmax(0,1fr)] gap-2"><dt className="text-muted-foreground">{label}</dt><dd className="font-medium">{value}</dd></div>; }

function ResultRow({ period, leads, qualified, sales, revenue, cpl, note }: { period: string; leads: number; qualified: number; sales: number; revenue: number; cpl: string; note: string }) {
  return <tr><td className="py-2.5 font-medium">{period}</td><td>{leads}</td><td>{qualified}</td><td>{sales}</td><td>{money.format(revenue)}</td><td>{cpl}</td><td className="text-muted-foreground">{note}</td><td className="text-right"><Button variant="ghost" size="icon-sm" aria-label={`Abrir resultado de ${period}`}><MoreHorizontal className="size-4" /></Button></td></tr>;
}