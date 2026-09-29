import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowDownAZ,
  ArrowUpAZ,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Plus,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { clients, type ClientStatus } from "@/data/clients";

export const Route = createFileRoute("/clientes/carteira")({
  head: () => ({
    meta: [
      { title: "Carteira de Clientes — LeadPro" },
      { name: "description", content: "Consulte e organize todos os clientes da carteira LeadPro." },
      { property: "og:title", content: "Carteira de Clientes — LeadPro" },
      { property: "og:description", content: "Consulte e organize todos os clientes da carteira LeadPro." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CarteiraPage,
});

const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

function Tag({ children, tone }: { children: string; tone: "success" | "info" | "warning" | "muted" }) {
  const classes = {
    success: "bg-success-soft text-success",
    info: "bg-info-soft text-info",
    warning: "bg-warning-soft text-warning",
    muted: "bg-muted text-muted-foreground",
  };
  return <span className={`inline-flex whitespace-nowrap rounded-sm px-2 py-1 text-[10px] font-medium ${classes[tone]}`}>{children}</span>;
}

function statusTone(status: ClientStatus) {
  if (status === "Ativo") return "success" as const;
  if (status === "Onboarding") return "info" as const;
  if (status === "Pausado") return "warning" as const;
  return "muted" as const;
}

function situationTone(situation: string) {
  if (situation === "Tudo certo") return "success" as const;
  if (situation === "1 pendência") return "warning" as const;
  if (situation === "Aguardando cliente" || situation === "Em configuração") return "info" as const;
  return "muted" as const;
}

function CarteiraPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [profile, setProfile] = useState("all");
  const [operation, setOperation] = useState("all");
  const [owner, setOwner] = useState("all");
  const [ascending, setAscending] = useState(true);

  const filteredClients = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("pt-BR");
    return clients
      .filter((client) => !normalized || `${client.name} ${client.company}`.toLocaleLowerCase("pt-BR").includes(normalized))
      .filter((client) => status === "all" || client.status === status)
      .filter((client) => profile === "all" || client.profile === profile)
      .filter((client) => operation === "all" || client.operation.includes(operation))
      .filter((client) => owner === "all" || client.owner === owner)
      .sort((a, b) => ascending ? a.name.localeCompare(b.name, "pt-BR") : b.name.localeCompare(a.name, "pt-BR"));
  }, [ascending, operation, owner, profile, query, status]);

  const clearFilters = () => {
    setQuery("");
    setStatus("all");
    setProfile("all");
    setOperation("all");
    setOwner("all");
  };

  return (
    <AppShell>
      <main className="mx-auto max-w-[1180px] p-4 sm:p-5">
        <div className="mb-5 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
          <div className="min-w-0">
            <h1 className="truncate text-[28px] font-semibold">Clientes</h1>
            <p className="mt-1 text-sm text-muted-foreground">Acompanhe e gerencie todos os clientes da LeadPro.</p>
          </div>
          <Button className="gap-2 px-3 text-xs sm:px-4"><Plus className="size-4" />Novo cliente</Button>
        </div>

        <div className="mb-4 flex gap-1 border-b border-border">
          <Link to="/clientes" className="-mb-px border-b-2 border-transparent px-3 pb-2 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground">Visão Geral</Link>
          <Link to="/clientes/carteira" className="-mb-px border-b-2 border-primary px-3 pb-2 text-[13px] font-medium text-primary">Carteira</Link>
        </div>

        <section className="overflow-hidden rounded-md border border-border bg-card shadow-card">
          <div className="flex flex-col gap-2 border-b border-border p-3 xl:flex-row xl:items-center">
            <label className="relative min-w-52 flex-1 xl:max-w-64">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar cliente..." className="h-9 bg-search pl-9 text-xs" aria-label="Buscar cliente" />
            </label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:flex xl:flex-1">
              <FilterSelect value={status} onChange={setStatus} label="Status" options={["Ativo", "Onboarding", "Pausado", "Encerrado"]} />
              <FilterSelect value={profile} onChange={setProfile} label="Perfil econômico" options={["High", "Medium", "Low"]} />
              <FilterSelect value={operation} onChange={setOperation} label="Atuação" options={["Apartamentos", "Loteamentos", "Casas", "Comerciais"]} />
              <FilterSelect value={owner} onChange={setOwner} label="Responsável" options={["Carol", "Pedro"]} />
            </div>
            <Button variant="outline" className="h-9 gap-2 px-3 text-xs"><SlidersHorizontal className="size-3.5" />Mais filtros</Button>
            <Button variant="ghost" onClick={clearFilters} className="h-9 gap-1.5 px-2 text-xs text-link"><X className="size-3.5" />Limpar filtros</Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[940px] border-collapse text-left">
              <thead className="bg-muted/60 text-[10px] uppercase text-muted-foreground">
                <tr>
                  <th className="px-4 py-2.5 font-medium">
                    <button onClick={() => setAscending((value) => !value)} className="inline-flex items-center gap-1.5" aria-label="Ordenar clientes por nome">
                      Cliente {ascending ? <ArrowDownAZ className="size-3.5" /> : <ArrowUpAZ className="size-3.5" />}
                    </button>
                  </th>
                  <th className="px-3 py-2.5 font-medium">Status</th>
                  <th className="px-3 py-2.5 font-medium">Atuação</th>
                  <th className="px-3 py-2.5 font-medium">Perfil</th>
                  <th className="px-3 py-2.5 font-medium">Responsável</th>
                  <th className="px-3 py-2.5 font-medium">Receita LeadPro<br /><span className="normal-case">(mês atual)</span></th>
                  <th className="px-3 py-2.5 font-medium">Situação</th>
                  <th className="px-3 py-2.5 text-right font-medium">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredClients.map((client) => (
                  <tr key={client.name} className="group transition-colors hover:bg-muted/45">
                    <td className="px-4 py-3">
                      <Link to="/clientes/$clienteId" params={{ clienteId: client.id }} className="grid w-full grid-cols-[32px_minmax(0,1fr)] items-center gap-2.5 text-left" aria-label={`Abrir cliente ${client.name}`}>
                        <span className="grid size-8 place-items-center rounded-md bg-avatar text-[10px] font-semibold text-primary-foreground">{client.initials}</span>
                        <span className="min-w-0">
                          <span className="block truncate text-xs font-semibold group-hover:text-primary">{client.name}</span>
                          <span className="block truncate text-[10px] text-muted-foreground">{client.company}</span>
                        </span>
                      </Link>
                    </td>
                    <td className="px-3 py-3"><Tag tone={statusTone(client.status)}>{client.status}</Tag></td>
                    <td className="max-w-36 truncate px-3 py-3 text-[11px]">{client.operation}</td>
                    <td className="px-3 py-3"><Tag tone={client.profile === "High" ? "info" : "muted"}>{client.profile}</Tag></td>
                    <td className="px-3 py-3 text-[11px]">{client.owner}</td>
                    <td className="px-3 py-3 text-[11px] font-medium tabular-nums">{money.format(client.revenue)}</td>
                    <td className="px-3 py-3"><Tag tone={situationTone(client.situation)}>{client.situation}</Tag></td>
                    <td className="px-3 py-3 text-right"><Button variant="ghost" size="icon-sm" aria-label={`Mais ações para ${client.name}`}><MoreHorizontal className="size-4" /></Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredClients.length === 0 ? (
            <div className="grid min-h-48 place-items-center p-6 text-center">
              <div><p className="text-sm font-medium">Nenhum cliente encontrado</p><p className="mt-1 text-xs text-muted-foreground">Tente ajustar ou limpar os filtros.</p></div>
            </div>
          ) : null}

          <div className="flex items-center justify-between border-t border-border px-4 py-3">
            <p className="text-[11px] text-muted-foreground">Mostrando {filteredClients.length} de {clients.length} clientes</p>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon-sm" disabled aria-label="Página anterior"><ChevronLeft className="size-4" /></Button>
              <span className="grid size-8 place-items-center rounded-md bg-primary-soft text-xs font-medium text-primary">1</span>
              <Button variant="ghost" size="icon-sm" disabled aria-label="Próxima página"><ChevronRight className="size-4" /></Button>
            </div>
          </div>
        </section>
      </main>
    </AppShell>
  );
}

function FilterSelect({ value, onChange, label, options }: { value: string; onChange: (value: string) => void; label: string; options: string[] }) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-9 min-w-0 bg-card text-xs shadow-none xl:w-32" aria-label={label}>
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">{label}</SelectItem>
        {options.map((option) => <SelectItem key={option} value={option}>{option}</SelectItem>)}
      </SelectContent>
    </Select>
  );
}