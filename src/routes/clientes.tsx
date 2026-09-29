import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/clientes")({
  component: ClientesLayout,
});

function ClientesLayout() {
  return <Outlet />;
}
