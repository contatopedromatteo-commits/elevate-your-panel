import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowUp,
  BadgeDollarSign,
  Building2,
  CalendarDays,
  Check,
  ChevronLeft,
  CircleAlert,
  Clock3,
  ExternalLink,
  FileText,
  Landmark,
  Mail,
  MapPin,
  MoreHorizontal,
  Pencil,
  Phone,
  Target,
  TrendingUp,
  UserRound,
  Users,
  WalletCards,
} from "lucide-react";
import type { ReactNode } from "react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { getClient } from "@/data/clients";

export const Route = createFileRoute("/clientes/$clienteId/")({
  loader: ({ params }) => {
    const client = getClient(params.clienteId);
    if (!client) throw notFound();
    return { client };
  },
  head: ({ loaderData }) => {
    const title = loaderData ? `${loaderData.client.name} — LeadPro` : "Cliente não encontrado — LeadPro";
    const description = loaderData
      ? `Visão geral, desempenho e situação financeira de ${loaderData.client.name}.`
      : "O cliente solicitado não foi encontrado.";
    return { meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ] };
  },
  notFoundComponent: ClientNotFound,
  component: ClientOverviewPage,
});

const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

function Tag({ children, tone = "muted" }: { children: ReactNode; tone?: "success" | "info" | "warning" | "muted" }) {
  const classes = {
    success: "bg-success-soft text-success",
    info: "bg-info-soft text-info",
    warning: "bg-warning-soft text-warning",
    muted: "bg-muted text-muted-foreground",
  };
  return <span className={`inline-flex rounded-sm px-2 py-1 text-[10px] font-medium ${classes[tone]}`}>{children}</span>;
}

function Metric({ icon, label, value, note, alert = false }: { icon: ReactNode; label: string; value: string; note: ReactNode; alert?: boolean }) {
  return (
    <article className="flex min-h-24 items-center gap-3 rounded-md border border-border bg-card px-4 py-3 shadow-card">
      <span className={`grid size-10 shrink-0 place-items-center rounded-md ${alert ? "bg-warning-soft text-warning" : "bg-icon text-primary"}`}>{icon}</span>
      <div className="min-w-0">
        <p className="text-[12px] text-muted-foreground">{label}</p>
        <strong className="mt-0.5 block truncate text-xl font-semibold leading-none">{value}</strong>
        <div className={`mt-2 flex items-center gap-1 text-[10px] ${alert ? "text-warning" : "text-success"}`}>{note}</div>
      </div>
    </article>
  );
}

function Panel({ title, action, children, className = "" }: { title: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-md border border-border bg-card p-4 shadow-card ${className}`}>
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[14px] font-semibold">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function ClientOverviewPage() {
  const { client } = Route.useLoaderData();
  const isGranReserva = client.id === "gran-reserva";
  const displayRevenue = isGranReserva ? 1900 : client.revenue;

  return (
    <AppShell>
      <main className="mx-auto max-w-[1180px] p-4 sm:p-5">
        <Link to="/clientes/carteira" className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground">
          <ChevronLeft className="size-3.5" /> Voltar para a carteira
        </Link>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid size-14 shrink-0 place-items-center rounded-md bg-avatar text-sm font-semibold text-primary-foreground">{client.initials}</span>
            <div className="min-w-0">
              <h1 className="truncate text-[24px] font-semibold">{client.name}</h1>
              <p className="truncate text-xs text-muted-foreground">{client.company}</p>
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                <Tag tone={client.status === "Ativo" ? "success" : client.status === "Onboarding" ? "info" : "muted"}>{client.status}</Tag>
                <Tag tone="info">{client.profile}</Tag>
                <span className="text-[10px] text-muted-foreground">Responsável: {client.owner}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Button variant="outline" className="h-8 gap-2 px-3 text-xs"><Pencil className="size-3.5" />Editar cliente</Button>
            <Button variant="ghost" size="icon-sm" aria-label="Mais ações"><MoreHorizontal className="size-4" /></Button>
          </div>
        </div>

        <nav className="mt-5 flex gap-1 overflow-x-auto border-b border-border" aria-label="Seções do cliente">
          <Link to="/clientes/$clienteId" params={{ clienteId: client.id }} className="-mb-px shrink-0 border-b-2 border-primary px-3 pb-2 text-[12px] font-medium text-primary">Visão Geral</Link>
          <Link to="/clientes/$clienteId/cadastro" params={{ clienteId: client.id }} className="-mb-px shrink-0 border-b-2 border-transparent px-3 pb-2 text-[12px] font-medium text-muted-foreground transition-colors hover:text-foreground">Cadastro e Condição</Link>
          <Link to="/clientes/$clienteId/acompanhamento" params={{ clienteId: client.id }} className="-mb-px shrink-0 border-b-2 border-transparent px-3 pb-2 text-[12px] font-medium text-muted-foreground transition-colors hover:text-foreground">Acompanhamento</Link>
          {["Arquivos", "Financeiro"].map((tab) => (
            <span key={tab} className="-mb-px shrink-0 border-b-2 border-transparent px-3 pb-2 text-[12px] font-medium text-muted-foreground">{tab}</span>
          ))}
        </nav>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <Metric icon={<WalletCards className="size-5" />} label="Receita mensal" value={money.format(displayRevenue)} note={<><ArrowUp className="size-3" /> 8% vs. mês anterior</>} />
          <Metric icon={<Users className="size-5" />} label="Leads no período" value={isGranReserva ? "145" : String(54 + client.name.length * 7)} note={<><ArrowUp className="size-3" /> 10% vs. mês anterior</>} />
          <Metric icon={<CalendarDays className="size-5" />} label="Tempo como cliente" value={isGranReserva ? "4 meses" : "8 meses"} note={<span className="text-muted-foreground">Desde 12/05/2026</span>} />
          <Metric icon={<CircleAlert className="size-5" />} label="Pendências" value={client.situation === "Tudo certo" ? "0" : "2"} alert={client.situation !== "Tudo certo"} note={<span>{client.situation === "Tudo certo" ? "Nenhuma pendência" : "Ver detalhes"}</span>} />
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-[1.05fr_.95fr]">
          <Panel title="Situação atual">
            <div className="mt-3 flex flex-wrap items-center gap-2"><Tag tone="success">Ativo</Tag><span className="text-xs text-muted-foreground">Operação em andamento</span></div>
            <ul className="mt-4 space-y-2.5 text-xs">
              <StatusLine tone="success" label="Financeiro em dia" />
              <StatusLine tone="success" label="Onboarding concluído" />
              <StatusLine tone="warning" label="1 ponto de atenção em performance" />
              <StatusLine tone="success" label="Nenhuma pendência de cliente" />
            </ul>
          </Panel>

          <Panel title="Performance" action={<Button variant="ghost" className="h-auto gap-1 p-0 text-[11px] text-link">Ver acompanhamento <ExternalLink className="size-3" /></Button>}>
            <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-4">
              {[ ["145", "Leads"], ["38", "Qualificados"], ["8", "Oportunidades"], ["3", "Vendas"] ].map(([value, label]) => (
                <div key={label} className="bg-card p-3 text-center"><strong className="text-lg font-semibold">{value}</strong><p className="text-[10px] text-muted-foreground">{label}</p></div>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between rounded-md bg-muted/50 px-3 py-2 text-[11px]">
              <span className="flex items-center gap-1.5 text-muted-foreground"><TrendingUp className="size-3.5 text-primary" />Conversão lead → oportunidade</span>
              <span className="font-semibold text-success">↑ 1,2 pp</span>
            </div>
          </Panel>
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-[1.05fr_.95fr]">
          <Panel title="Financeiro (no período)" action={<Button variant="ghost" className="h-auto gap-1 p-0 text-[11px] text-link">Ver financeiro <ExternalLink className="size-3" /></Button>}>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <FinanceItem icon={<ArrowUp />} label="Receita" value={money.format(displayRevenue)} tone="success" />
              <FinanceItem icon={<ArrowDown />} label="A receber" value="R$ 810,00" tone="info" />
              <FinanceItem icon={<CircleAlert />} label="Vencido" value="R$ 0,00" tone="warning" />
            </div>
            <div className="mt-3 flex items-center gap-2 rounded-md bg-muted/50 px-3 py-2 text-[11px] text-muted-foreground"><CalendarDays className="size-3.5" />Próximo recebimento: <strong className="text-foreground">Mensalidade · R$ 600,00 · 20/09/2026</strong></div>
          </Panel>

          <Panel title="Informações do cliente" action={<Button variant="ghost" className="h-auto gap-1 p-0 text-[11px] text-link">Ver cadastro completo <ExternalLink className="size-3" /></Button>}>
            <dl className="mt-3 grid gap-2 text-[11px] sm:grid-cols-2">
              <Info icon={<Building2 />} label="Responsável interno" value={client.owner} />
              <Info icon={<UserRound />} label="Perfil econômico" value={client.profile} />
              <Info icon={<Target />} label="Atuação" value={client.operation} />
              <Info icon={<Landmark />} label="Início da relação" value="12/05/2026" />
              <Info icon={<Mail />} label="E-mail" value={`contato@${client.id}.com.br`} />
              <Info icon={<Phone />} label="Telefone" value="(11) 99999-2026" />
              <Info icon={<MapPin />} label="Localização" value="São Paulo, SP" />
              <Info icon={<BadgeDollarSign />} label="Condição comercial" value="Mensalidade + performance" />
            </dl>
          </Panel>
        </div>

        <Panel title="Atividades recentes" className="mt-3" action={<Button variant="ghost" className="h-auto p-0 text-[11px] text-link">Ver todas</Button>}>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[660px] text-left text-[11px]">
              <thead className="border-b border-border text-[10px] uppercase text-muted-foreground"><tr><th className="pb-2 font-medium">Data</th><th className="pb-2 font-medium">Atividade</th><th className="pb-2 font-medium">Descrição</th><th className="pb-2 font-medium">Origem</th><th className="pb-2 font-medium">Usuário</th><th /></tr></thead>
              <tbody className="divide-y divide-border">
                <Activity date="16/09/2026" icon={<BadgeDollarSign />} activity="Faturamento registrado" description={`Venda de ${money.format(85000)}`} origin="Acompanhamento" user="Carol" />
                <Activity date="12/09/2026" icon={<Users />} activity="Pagamento recebido" description={`Mensalidade · ${money.format(600)}`} origin="Financeiro" user="Carol" />
                <Activity date="08/09/2026" icon={<FileText />} activity="Status atualizado" description="Cliente marcado como Ativo" origin="Cadastro" user="Pedro" />
                <Activity date="01/09/2026" icon={<TrendingUp />} activity="Performance atualizada" description="145 leads no período" origin="Acompanhamento" user="Sistema" />
              </tbody>
            </table>
          </div>
        </Panel>
      </main>
    </AppShell>
  );
}

function StatusLine({ label, tone }: { label: string; tone: "success" | "warning" }) {
  return <li className="flex items-center gap-2"><span className={`grid size-4 place-items-center rounded-full bg-${tone}-soft text-${tone}`}>{tone === "success" ? <Check className="size-2.5" /> : <Clock3 className="size-2.5" />}</span>{label}</li>;
}

function FinanceItem({ icon, label, value, tone }: { icon: ReactNode; label: string; value: string; tone: "success" | "info" | "warning" }) {
  return <div className="rounded-md border border-border p-3"><div className={`flex items-center gap-1.5 text-[10px] text-${tone}`}>{<span className="size-3.5 [&>svg]:size-3.5">{icon}</span>}{label}</div><strong className="mt-1.5 block text-xs font-semibold">{value}</strong></div>;
}

function Info({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return <div className="grid grid-cols-[16px_84px_minmax(0,1fr)] items-center gap-1.5"><span className="text-muted-foreground [&>svg]:size-3.5">{icon}</span><dt className="text-muted-foreground">{label}</dt><dd className="truncate font-medium">{value}</dd></div>;
}

function Activity({ date, icon, activity, description, origin, user }: { date: string; icon: ReactNode; activity: string; description: string; origin: string; user: string }) {
  return <tr><td className="py-2.5 text-muted-foreground">{date}</td><td className="py-2.5"><span className="inline-flex items-center gap-2"><span className="text-primary [&>svg]:size-3.5">{icon}</span>{activity}</span></td><td className="py-2.5">{description}</td><td className="py-2.5 text-muted-foreground">{origin}</td><td className="py-2.5">{user}</td><td className="py-2.5 text-right"><Button variant="ghost" size="icon-sm" aria-label={`Mais detalhes de ${activity}`}><MoreHorizontal className="size-4" /></Button></td></tr>;
}

function ClientNotFound() {
  return <AppShell><main className="grid min-h-[60vh] place-items-center p-6 text-center"><div><h1 className="text-xl font-semibold">Cliente não encontrado</h1><p className="mt-2 text-sm text-muted-foreground">Esse cadastro não está disponível na carteira.</p><Button asChild className="mt-4"><Link to="/clientes/carteira">Voltar para a carteira</Link></Button></div></main></AppShell>;
}