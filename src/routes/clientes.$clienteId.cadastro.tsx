import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CalendarDays, ChevronLeft, LockKeyhole, MoreHorizontal, Pause, Pencil, Plus, Trash2 } from "lucide-react";
import type { ReactNode } from "react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { getClient } from "@/data/clients";

export const Route = createFileRoute("/clientes/$clienteId/cadastro")({
  loader: ({ params }) => {
    const client = getClient(params.clienteId);
    if (!client) throw notFound();
    return { client };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.client.name ?? "Cliente";
    const title = `Cadastro e Condição de ${name} — LeadPro`;
    const description = `Dados cadastrais, atuação e condição comercial de ${name}.`;
    return { meta: [
      { title }, { name: "description", content: description },
      { property: "og:title", content: title }, { property: "og:description", content: description },
      { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
    ] };
  },
  component: ClientRegistrationPage,
});

const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

function Panel({ title, action, children, className = "" }: { title: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return <section className={`rounded-md border border-border bg-card p-4 shadow-card ${className}`}><div className="flex items-center justify-between gap-3"><h2 className="text-[14px] font-semibold">{title}</h2>{action}</div>{children}</section>;
}

function Field({ label, value }: { label: string; value: string }) {
  return <div className="min-w-0"><dt className="text-[10px] text-muted-foreground">{label}</dt><dd className="mt-1 truncate text-xs font-medium">{value}</dd></div>;
}

function ClientRegistrationPage() {
  const { client } = Route.useLoaderData();
  const monthly = client.id === "gran-reserva" ? 697 : client.revenue;
  const setup = client.profile === "High" ? 497 : 297;
  const statusTone = client.status === "Ativo" ? "bg-success-soft text-success" : client.status === "Onboarding" ? "bg-info-soft text-info" : "bg-muted text-muted-foreground";

  return (
    <AppShell>
      <main className="mx-auto max-w-[1180px] p-4 sm:p-5">
        <Link to="/clientes/carteira" className="mb-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"><ChevronLeft className="size-3.5" />Voltar para a carteira</Link>
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid size-14 shrink-0 place-items-center rounded-md bg-avatar text-sm font-semibold text-primary-foreground">{client.initials}</span>
            <div className="min-w-0"><h1 className="truncate text-[24px] font-semibold">{client.name}</h1><p className="truncate text-xs text-muted-foreground">{client.company}</p><div className="mt-2 flex flex-wrap items-center gap-1.5"><span className={`rounded-sm px-2 py-1 text-[10px] font-medium ${statusTone}`}>{client.status}</span><span className="rounded-sm bg-info-soft px-2 py-1 text-[10px] font-medium text-info">{client.profile}</span><span className="text-[10px] text-muted-foreground">Responsável: {client.owner}</span></div></div>
          </div>
          <div className="flex gap-2"><Button variant="outline" className="h-8 gap-2 px-3 text-xs"><Pencil className="size-3.5" />Editar cliente</Button><Button variant="ghost" size="icon-sm" aria-label="Mais ações"><MoreHorizontal className="size-4" /></Button></div>
        </header>

        <nav className="mt-5 flex gap-1 overflow-x-auto border-b border-border" aria-label="Seções do cliente">
          <Link to="/clientes/$clienteId" params={{ clienteId: client.id }} className="-mb-px shrink-0 border-b-2 border-transparent px-3 pb-2 text-[12px] font-medium text-muted-foreground hover:text-foreground">Visão Geral</Link>
          <Link to="/clientes/$clienteId/cadastro" params={{ clienteId: client.id }} className="-mb-px shrink-0 border-b-2 border-primary px-3 pb-2 text-[12px] font-medium text-primary">Cadastro e Condição</Link>
          {["Acompanhamento", "Arquivos", "Financeiro"].map((tab) => <span key={tab} className="-mb-px shrink-0 border-b-2 border-transparent px-3 pb-2 text-[12px] font-medium text-muted-foreground">{tab}</span>)}
        </nav>

        <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_280px]">
          <Panel title="Dados do cliente" action={<Button variant="outline" className="h-7 gap-1.5 px-2 text-[11px]"><Pencil className="size-3" />Editar</Button>}>
            <div className="mt-4 grid gap-4 sm:grid-cols-[104px_minmax(0,1fr)]"><div><div className="grid h-24 place-items-center rounded-md bg-avatar text-sm font-semibold text-primary-foreground">{client.initials}</div><Button variant="ghost" className="mt-2 h-auto w-full p-0 text-[11px] text-link">Alterar logo</Button></div><dl className="grid gap-x-5 gap-y-3 sm:grid-cols-2 xl:grid-cols-3"><Field label="Nome / Razão social" value={client.company} /><Field label="Responsável interno" value={client.owner} /><Field label="Nome fantasia" value={client.name} /><Field label="Status" value={client.status} /><Field label="CNPJ" value="12.345.678/0001-90" /><Field label="Perfil econômico" value={client.profile} /><Field label="Contato principal" value="João Silva" /><Field label="Data do cadastro" value="12/05/2026" /><Field label="Telefone" value="(11) 99999-9999" /><Field label="Observações" value="Cliente estratégico com alto potencial de expansão." /><Field label="E-mail" value={`joao@${client.id}.com.br`} /></dl></div>
          </Panel>
          <Panel title="Atuação" action={<Button variant="outline" className="h-7 gap-1.5 px-2 text-[11px]"><Pencil className="size-3" />Editar atuação</Button>}><p className="mt-4 text-[10px] text-muted-foreground">Operações</p><div className="mt-2 flex flex-wrap gap-1.5">{client.operation.split(", ").map((item) => <Tag key={item}>{item}</Tag>)}</div><p className="mt-5 text-[10px] text-muted-foreground">Produtos</p><div className="mt-2 flex flex-wrap gap-1.5"><Tag>Apartamentos</Tag><Tag>Casas</Tag><Tag>Comerciais</Tag></div></Panel>
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,1fr)_280px]">
          <Panel title="Condição comercial atual" action={<span className="rounded-sm bg-success-soft px-2 py-1 text-[10px] font-medium text-success">Vigente</span>}><dl className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6"><Field label="Início da cobrança" value="12/05/2026" /><Field label="Mensalidade" value={money.format(monthly)} /><Field label="Setup" value={money.format(setup)} /><Field label="Fee de performance" value="10% sobre faturamento" /><Field label="Dia de corte" value="Dia 10" /><Field label="Vigência" value="12/05/2026 → atual" /></dl><div className="mt-4 flex items-center gap-2 rounded-md bg-info-soft px-3 py-2 text-[11px] text-info"><CalendarDays className="size-3.5" />Condição calculada conforme a condição vigente no primeiro dia da competência.</div></Panel>
          <aside className="flex flex-col justify-between rounded-md border border-info/30 bg-info-soft p-4"><div><div className="flex items-center gap-2 text-xs font-semibold text-info"><LockKeyhole className="size-4" />Condição protegida</div><p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">Esta condição já possui movimentações associadas e não pode mais ser alterada.</p></div><Button variant="outline" className="mt-4 h-8 gap-2 bg-card text-[11px]"><Plus className="size-3.5" />Criar nova condição</Button></aside>
        </div>

        <Panel title="Histórico de condições comerciais" className="mt-3"><div className="mt-3 overflow-x-auto"><table className="w-full min-w-[720px] text-left text-[11px]"><thead className="border-b border-border text-[10px] uppercase text-muted-foreground"><tr><th className="pb-2 font-medium">Vigência</th><th className="pb-2 font-medium">Mensalidade</th><th className="pb-2 font-medium">Setup</th><th className="pb-2 font-medium">Fee de performance</th><th className="pb-2 font-medium">Dia de corte</th><th className="pb-2 font-medium">Situação</th><th /></tr></thead><tbody className="divide-y divide-border"><HistoryRow period="12/05/2026 → atual" monthly={monthly} setup={setup} fee="10%" cutoff="Dia 10" current /><HistoryRow period="01/04/2026 → 11/05/2026" monthly={497} setup={0} fee="8%" cutoff="Dia 5" /></tbody></table></div></Panel>

        <section className="mt-3 flex flex-col gap-3 rounded-md border border-border bg-card p-4 shadow-card sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-[14px] font-semibold">Gerenciamento do cliente</h2><p className="mt-1 text-[11px] text-muted-foreground">Utilize estas ações para alterar a situação do cliente na LeadPro.</p></div><div className="flex flex-wrap gap-2"><Button variant="outline" className="h-8 gap-2 border-warning/40 text-[11px] text-warning"><Pause className="size-3.5" />Pausar cliente</Button><Button variant="outline" className="h-8 gap-2 border-destructive/30 text-[11px] text-destructive"><Trash2 className="size-3.5" />Encerrar cliente</Button></div></section>
      </main>
    </AppShell>
  );
}

function Tag({ children }: { children: ReactNode }) { return <span className="rounded-sm bg-info-soft px-2 py-1 text-[10px] font-medium text-info">{children}</span>; }

function HistoryRow({ period, monthly, setup, fee, cutoff, current = false }: { period: string; monthly: number; setup: number; fee: string; cutoff: string; current?: boolean }) {
  return <tr><td className="py-2.5">{period}</td><td>{money.format(monthly)}</td><td>{money.format(setup)}</td><td>{fee}</td><td>{cutoff}</td><td><span className={`rounded-sm px-2 py-1 text-[10px] ${current ? "bg-success-soft text-success" : "bg-muted text-muted-foreground"}`}>{current ? "Vigente" : "Encerrada"}</span></td><td className="text-right"><Button variant="ghost" size="icon-sm" aria-label={`Mais ações para condição ${period}`}><MoreHorizontal className="size-4" /></Button></td></tr>;
}