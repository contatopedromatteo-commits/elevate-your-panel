import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  Bell,
  CircleDollarSign,
  FileText,
  Home,
  Megaphone,
  Menu,
  MoreVertical,
  RefreshCw,
  Search,
  Settings,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Painel", icon: Home, to: "/" },
  { label: "CRM", icon: RefreshCw, badge: "Em breve" },
  { label: "Clientes", icon: UserPlus, to: "/clientes" },
  { label: "Onboarding", icon: FileText },
  { label: "Equipe", icon: Users, badge: "Em breve" },
  { label: "Marketing", icon: Megaphone },
  { label: "Financeiro", icon: CircleDollarSign, to: "/financeiro" },
  { label: "Relatórios", icon: BarChart3, badge: "Em breve" },
] as const;

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
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-overlay lg:hidden" onClick={onClose} aria-hidden="true" />}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-52 flex-col border-r border-border bg-sidebar px-4 py-5 transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="mb-7 flex items-center justify-between px-1">
          <Logo />
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={onClose} aria-label="Fechar menu"><X className="size-5" /></Button>
        </div>
        <nav className="space-y-1" aria-label="Navegação principal">
          {navItems.map((item) => {
            const active = "to" in item && item.to === pathname;
            const content = (
              <>
                <item.icon className="size-[18px] shrink-0" strokeWidth={1.9} />
                <span className="text-sm">{item.label}</span>
                {"badge" in item && item.badge && <span className="ml-auto rounded-sm bg-badge px-2 py-0.5 text-[10px] text-badge-foreground">{item.badge}</span>}
              </>
            );
            const cls = `w-full justify-start gap-3 px-2.5 ${active ? "text-primary" : "text-sidebar-foreground"}`;
            return "to" in item && item.to ? (
              <Button key={item.label} asChild variant={active ? "soft" : "ghost"} className={cls}>
                <Link to={item.to}>{content}</Link>
              </Button>
            ) : (
              <Button key={item.label} variant="ghost" className={cls}>{content}</Button>
            );
          })}
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

export function AppShell({ children }: { children: ReactNode }) {
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
        {children}
      </div>
    </div>
  );
}
