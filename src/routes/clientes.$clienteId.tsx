import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/clientes/$clienteId")({
  component: ClientProfileLayout,
});

function ClientProfileLayout() {
  return <Outlet />;
}