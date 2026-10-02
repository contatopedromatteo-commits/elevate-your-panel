import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUp, BarChart3, CalendarDays, ChevronDown, ChevronLeft, ChevronRight, Download, Filter, Laptop, Plus, ReceiptText, RefreshCw, Search, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/financeiro/lancamentos")({
  head: () => ({ meta: [
    { title: "Lançamentos financeiros — LeadPro" },
    { name: "description", content: "Consulte e organize as entradas e saídas financeiras da LeadPro." },
    { property: "og:title", content: "Lançamentos financeiros — LeadPro" },
    { property: "og:description", content: "Consulte e organize as entradas e saídas financeiras da LeadPro." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Lancamentos,
});

const tabs = [
  { label: "Painel", to: "/financeiro" as const },
  { label: "Lançamentos", to: "/financeiro/lancamentos" as const },
  { label: "Fluxo de Caixa" }, { label: "A Pagar / A Receber" }, { label: "Orçamento" }, { label: "Entradas" },
];

type Entry = { date: string; description: string; detail: string; category: string; client: string; type: "Entrada" | "Saída"; value: string; status: "Realizado" | "Previsto" };
const entries: Entry[] = [
  { date: "15/09/2026", description: "Mensalidade — Marcelo Nunes", detail: "Competência set/26", category: "Mensalidade", client: "Marcelo Nunes", type: "Entrada", value: "R$ 697,00", status: "Realizado" },
  { date: "13/09/2026", description: "Claude AI", detail: "Assinatura mensal", category: "Inteligência Artificial", client: "—", type: "Saída", value: "R$ 120,00", status: "Realizado" },
  { date: "12/09/2026", description: "Tráfego Pago — Meta Ads", detail: "Campanha própria", category: "Tráfego Pago", client: "—", type: "Saída", value: "R$ 550,00", status: "Realizado" },
  { date: "10/09/2026", description: "Ferramenta e Software", detail: "Notion, Google One", category: "Ferramentas e Software", client: "—", type: "Saída", value: "R$ 189,00", status: "Realizado" },
  { date: "05/09/2026", description: "Setup Fee — Ana Beatriz", detail: "Contrato inicial", category: "Setup Fee", client: "Ana Beatriz", type: "Entrada", value: "R$ 497,00", status: "Realizado" },
  { date: "02/09/2026", description: "Contabilidade", detail: "Serviços contábeis", category: "Contabilidade", client: "—", type: "Saída", value: "R$ 350,00", status: "Realizado" },
  { date: "28/08/2026", description: "DAS", detail: "Impostos", category: "Impostos", client: "—", type: "Saída", value: "R$ 70,00", status: "Previsto" },
  { date: "25/08/2026", description: "Fee de Performance — Ana Beatriz", detail: "Resultado agosto", category: "Fee de Performance", client: "Ana Beatriz", type: "Entrada", value: "R$ 1.500,00", status: "Realizado" },
];
const recurring = [
  { icon: ReceiptText, title: "Contabilidade", value: "R$ 350,00 · Mensal" }, { icon: Laptop, title: "Ferramentas e Software", value: "R$ 189,00 · Mensal" },
  { icon: Sparkles, title: "Claude AI", value: "R$ 120,00 · Mensal" }, { icon: BarChart3, title: "Domínio e Hospedagem", value: "R$ 60,00 · Mensal" },
];

function TypeMark({ type }: { type: Entry["type"] }) {
  return type === "Entrada" ? <span className="inline-flex items-center gap-1.5 font-medium text-success"><ArrowUp className="size-3.5" />Entrada</span> : <span className="inline-flex items-center gap-1.5 font-medium text-destructive"><ArrowDown className="size-3.5" />Saída</span>;
}

function Lancamentos() {
  const [query, setQuery] = useState(""); const [type, setType] = useState("Todos"); const [category, setCategory] = useState("Todas"); const [status, setStatus] = useState("Todos");
  const visibleEntries = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("pt-BR");
    return entries.filter((entry) => (!q || `${entry.description} ${entry.detail} ${entry.client}`.toLocaleLowerCase("pt-BR").includes(q)) && (type === "Todos" || entry.type === type) && (category === "Todas" || entry.category === category) && (status === "Todos" || entry.status === status));
  }, [category, query, status, type]);
  function clearFilters() { setQuery(""); setType("Todos"); setCategory("Todas"); setStatus("Todos"); }
  function exportCsv() {
    const header = "Data,Descrição,Categoria,Cliente,Tipo,Valor,Status";
    const rows = visibleEntries.map((entry) => [entry.date, entry.description, entry.category, entry.client, entry.type, entry.value, entry.status].map((item) => `"${item}"`).join(","));
    const url = URL.createObjectURL(new Blob([[header, ...rows].join("\n")], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = "lancamentos-leadpro.csv"; anchor.click(); URL.revokeObjectURL(url);
  }
  return <AppShell><main className="mx-auto max-w-[1180px] p-4 sm:p-5">
    <div className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4"><div className="min-w-0"><h1 className="truncate text-[28px] font-semibold">Financeiro</h1><p className="mt-1 text-sm text-muted-foreground">Acompanhe a saúde financeira da LeadPro.</p></div><Button variant="outline" className="gap-3 px-3 text-xs sm:px-4"><CalendarDays className="size-4 text-primary" /><span className="hidden sm:inline">Setembro 2026</span><ChevronDown className="size-4" /></Button></div>
    <nav className="mb-4 flex gap-1 overflow-x-auto border-b border-border" aria-label="Seções do financeiro">{tabs.map((tab, i) => "to" in tab && tab.to ? <Link key={tab.label} to={tab.to} className={`whitespace-nowrap border-b-2 px-3 pb-2 text-[13px] transition-colors ${i === 1 ? "border-primary font-medium text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>{tab.label}</Link> : <span key={tab.label} className="whitespace-nowrap border-b-2 border-transparent px-3 pb-2 text-[13px] text-muted-foreground">{tab.label}</span>)}</nav>
    <section className="space-y-3">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center"><label className="relative min-w-0 flex-1 lg:max-w-xs"><Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar lançamento..." className="pl-9 text-xs" /></label><div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
        <Select value={type} onValueChange={setType}><SelectTrigger className="w-full text-xs sm:w-28"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Todos">Tipo</SelectItem><SelectItem value="Entrada">Entrada</SelectItem><SelectItem value="Saída">Saída</SelectItem></SelectContent></Select>
        <Select value={category} onValueChange={setCategory}><SelectTrigger className="w-full text-xs sm:w-36"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Todas">Categoria</SelectItem>{Array.from(new Set(entries.map((entry) => entry.category))).map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectContent></Select>
        <Select value={status} onValueChange={setStatus}><SelectTrigger className="w-full text-xs sm:w-28"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Todos">Status</SelectItem><SelectItem value="Realizado">Realizado</SelectItem><SelectItem value="Previsto">Previsto</SelectItem></SelectContent></Select>
        <Button variant="outline" size="sm" className="gap-2 text-xs"><Filter className="size-3.5" />Mais filtros</Button></div><Button size="sm" className="gap-2 text-xs lg:ml-auto"><Plus className="size-4" />Novo lançamento</Button></div>
      {(query || type !== "Todos" || category !== "Todas" || status !== "Todos") && <Button variant="ghost" size="sm" onClick={clearFilters} className="h-auto px-0 text-xs text-muted-foreground">Limpar filtros</Button>}
      <div className="grid gap-3 sm:grid-cols-3">{[
        { icon: ArrowUp, label: "Entradas", value: "R$ 21.400,00", note: "Realizadas no período", tone: "bg-success-soft text-success", valueTone: "" },
        { icon: ArrowDown, label: "Saídas", value: "R$ 8.950,00", note: "Realizadas no período", tone: "bg-destructive-soft text-destructive", valueTone: "" },
        { icon: BarChart3, label: "Resultado", value: "+ R$ 12.450,00", note: "Entradas − Saídas", tone: "bg-primary-soft text-primary", valueTone: "text-success" },
      ].map((metric) => <article key={metric.label} className="flex items-center gap-3 rounded-md border border-border bg-card p-4 shadow-card"><span className={`grid size-9 place-items-center rounded-md ${metric.tone}`}><metric.icon className="size-4" /></span><div><p className="text-xs text-muted-foreground">{metric.label}</p><strong className={`block text-lg font-semibold ${metric.valueTone}`}>{metric.value}</strong><span className="text-[10px] text-muted-foreground">{metric.note}</span></div></article>)}</div>
      <section className="overflow-hidden rounded-md border border-border bg-card shadow-card"><div className="flex items-center justify-between border-b border-border px-4 py-3"><div><h2 className="text-sm font-semibold">Lançamentos</h2><p className="text-[11px] text-muted-foreground">{visibleEntries.length} de 32 lançamentos</p></div><Button variant="outline" size="sm" onClick={exportCsv} className="gap-2 text-xs"><Download className="size-3.5" />Exportar</Button></div><div className="overflow-x-auto"><table className="w-full min-w-[900px] text-left text-[11px]"><thead className="bg-muted/60 text-muted-foreground"><tr><th className="px-4 py-2 font-medium">Data</th><th className="px-3 py-2 font-medium">Descrição</th><th className="px-3 py-2 font-medium">Categoria</th><th className="px-3 py-2 font-medium">Cliente</th><th className="px-3 py-2 font-medium">Tipo</th><th className="px-3 py-2 text-right font-medium">Valor</th><th className="px-3 py-2 font-medium">Status</th><th className="w-10 px-3 py-2"><span className="sr-only">Ações</span></th></tr></thead><tbody>{visibleEntries.map((entry) => <tr key={`${entry.date}-${entry.description}`} className="border-t border-border transition-colors hover:bg-muted/40"><td className="whitespace-nowrap px-4 py-2.5 text-muted-foreground">{entry.date}</td><td className="px-3 py-2.5"><strong className="block font-medium">{entry.description}</strong><span className="text-[10px] text-muted-foreground">{entry.detail}</span></td><td className="px-3 py-2.5"><span className="rounded-sm bg-info-soft px-2 py-1 text-info">{entry.category}</span></td><td className="px-3 py-2.5">{entry.client}</td><td className="px-3 py-2.5"><TypeMark type={entry.type} /></td><td className="whitespace-nowrap px-3 py-2.5 text-right font-medium">{entry.value}</td><td className="px-3 py-2.5"><span className={`rounded-sm px-2 py-1 ${entry.status === "Realizado" ? "bg-success-soft text-success" : "bg-primary-soft text-primary"}`}>{entry.status}</span></td><td className="px-3 py-2.5"><Button variant="ghost" size="icon-sm" aria-label={`Ações de ${entry.description}`}>•••</Button></td></tr>)}</tbody></table>{visibleEntries.length === 0 && <p className="px-4 py-10 text-center text-sm text-muted-foreground">Nenhum lançamento encontrado.</p>}</div><div className="flex items-center justify-between border-t border-border px-4 py-3 text-[11px] text-muted-foreground"><span>Mostrando 1–{visibleEntries.length} de 32 lançamentos</span><div className="flex items-center gap-1"><Button variant="ghost" size="icon-sm" aria-label="Página anterior"><ChevronLeft className="size-4" /></Button><span className="grid size-7 place-items-center rounded-md bg-primary text-primary-foreground">1</span><Button variant="ghost" size="icon-sm">2</Button><Button variant="ghost" size="icon-sm">3</Button><Button variant="ghost" size="icon-sm">4</Button><Button variant="ghost" size="icon-sm" aria-label="Próxima página"><ChevronRight className="size-4" /></Button></div></div></section>
      <section className="rounded-md border border-border bg-card p-4 shadow-card"><div className="mb-3 flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-3"><span className="grid size-8 place-items-center rounded-md bg-primary-soft text-primary"><RefreshCw className="size-4" /></span><div><h2 className="text-sm font-semibold">Despesas recorrentes</h2><p className="text-[11px] text-muted-foreground">4 ativas · prontas para esta competência</p></div></div><div className="flex gap-2"><Button variant="outline" size="sm" className="text-xs">Gerenciar</Button><Button size="sm" className="gap-2 text-xs"><RefreshCw className="size-3.5" />Gerar lançamentos do mês</Button></div></div><div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">{recurring.map((item) => <article key={item.title} className="flex items-center gap-3 rounded-md border border-border bg-muted/30 p-3"><item.icon className="size-4 shrink-0 text-primary" /><div className="min-w-0"><p className="truncate text-xs font-medium">{item.title}</p><p className="text-[10px] text-muted-foreground">{item.value}</p></div></article>)}</div></section>
    </section>
  </main></AppShell>;
}
