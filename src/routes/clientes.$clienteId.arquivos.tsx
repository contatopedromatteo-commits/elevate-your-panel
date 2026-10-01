import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ClipboardList,
  Cloud,
  ExternalLink,
  FileChartColumn,
  FileText,
  Folder,
  Image,
  Info,
  ListChecks,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getClient } from "@/data/clients";

export const Route = createFileRoute("/clientes/$clienteId/arquivos")({
  loader: ({ params }) => {
    const client = getClient(params.clienteId);
    if (!client) throw notFound();
    return { client };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.client.name ?? "Cliente";
    const title = `Arquivos de ${name} — LeadPro`;
    const description = `Links, documentos e materiais organizados de ${name}.`;
    return { meta: [
      { title }, { name: "description", content: description },
      { property: "og:title", content: title }, { property: "og:description", content: description },
      { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
    ] };
  },
  component: ClientFilesPage,
});

const clientLinks: Array<{ title: string; description: string; updated: string; icon: LucideIcon }> = [
  { title: "Contrato", description: "Contrato comercial vigente.", updated: "Atualizado em 10/04/2026", icon: FileText },
  { title: "Briefing", description: "Briefing inicial do cliente.", updated: "Atualizado em 12/04/2026", icon: ClipboardList },
  { title: "Plano de ação", description: "Estratégia e planejamento.", updated: "Atualizado em 15/04/2026", icon: ListChecks },
  { title: "Criativos", description: "Pasta de criativos e materiais.", updated: "Atualizado em 20/04/2026", icon: Image },
  { title: "Relatórios", description: "Relatórios periódicos.", updated: "Atualizado em 05/09/2026", icon: FileChartColumn },
  { title: "Outros", description: "Links adicionais.", updated: "Atualizado em 01/08/2026", icon: Folder },
];

function ClientFilesPage() {
  const { client } = Route.useLoaderData();
  const statusTone = client.status === "Ativo" ? "bg-success-soft text-success" : client.status === "Onboarding" ? "bg-info-soft text-info" : "bg-muted text-muted-foreground";

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
          <Link to="/clientes/$clienteId/arquivos" params={{ clienteId: client.id }} className="-mb-px shrink-0 border-b-2 border-primary px-3 pb-2 text-[12px] font-medium text-primary">Arquivos</Link>
          <Link to="/clientes/$clienteId/financeiro" params={{ clienteId: client.id }} className="-mb-px shrink-0 border-b-2 border-transparent px-3 pb-2 text-[12px] font-medium text-muted-foreground transition-colors hover:text-foreground">Financeiro</Link>
        </nav>

        <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div><h2 className="text-lg font-semibold">Arquivos e links</h2><p className="mt-1 text-[11px] text-muted-foreground">Centralize os acessos aos materiais do cliente.</p></div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button variant="outline" className="h-9 justify-between gap-3 px-3 text-[11px]"><CalendarDays className="size-3.5" />Setembro 2026<ChevronDown className="size-3.5" /></Button>
            <label className="relative min-w-0 sm:w-64"><Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" /><Input aria-label="Buscar arquivo ou link" placeholder="Buscar arquivo ou link..." className="h-9 bg-card pl-9 text-[11px]" /></label>
            <Button className="h-9 gap-2 px-3 text-[11px]"><Plus className="size-3.5" />Adicionar link</Button>
          </div>
        </div>

        <section className="mt-4 flex flex-col gap-4 rounded-md border border-border bg-card p-4 shadow-card sm:flex-row sm:items-center">
          <span className="grid size-14 shrink-0 place-items-center rounded-md bg-primary-soft text-primary"><Cloud className="size-7" /></span>
          <div className="min-w-0 flex-1"><h3 className="text-sm font-semibold">Pasta {client.name}</h3><p className="mt-0.5 text-[11px] text-muted-foreground">Google Drive · Pasta principal</p><p className="mt-2 text-[10px] text-muted-foreground">Acesse todos os materiais do cliente organizados nesta pasta principal.</p></div>
          <div className="flex items-center gap-1"><Button variant="outline" className="h-8 gap-1.5 px-3 text-[11px]">Abrir no Drive<ExternalLink className="size-3.5" /></Button><Button variant="ghost" size="icon-sm" aria-label="Mais ações da pasta"><MoreHorizontal className="size-4" /></Button></div>
        </section>

        <section className="mt-5"><h2 className="text-[14px] font-semibold">Links do cliente</h2><div className="mt-3 grid gap-3 md:grid-cols-2">{clientLinks.map((item) => <FileLinkCard key={item.title} {...item} />)}</div></section>

        <aside className="mt-4 flex items-start gap-3 rounded-md border border-info/20 bg-info-soft p-4 text-[10px] text-muted-foreground"><Info className="mt-0.5 size-4 shrink-0 text-info" /><p className="leading-relaxed"><strong className="font-semibold text-foreground">A LeadPro armazena apenas os links de acesso.</strong> Os arquivos permanecem no seu Drive.<br />Você pode adicionar, editar ou remover links a qualquer momento. A remoção do link não exclui o arquivo do Drive.</p></aside>
      </main>
    </AppShell>
  );
}

function FileLinkCard({ title, description, updated, icon: Icon }: { title: string; description: string; updated: string; icon: LucideIcon }) {
  return <article className="grid min-h-[82px] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-md border border-border bg-card p-3 shadow-card"><span className="grid size-10 place-items-center rounded-md bg-primary-soft text-primary"><Icon className="size-5" /></span><div className="min-w-0"><h3 className="truncate text-xs font-semibold">{title}</h3><p className="mt-1 truncate text-[10px] text-muted-foreground">{description}</p><p className="mt-0.5 text-[9px] text-muted-foreground">{updated}</p></div><div className="flex items-center"><Button variant="ghost" className="h-8 gap-1 px-2 text-[10px] text-link">Abrir<ExternalLink className="size-3" /></Button><Button variant="ghost" size="icon-sm" aria-label={`Mais ações de ${title}`}><MoreHorizontal className="size-4" /></Button></div></article>;
}