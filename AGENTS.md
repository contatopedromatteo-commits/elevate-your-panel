<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep Clients overview at `/clientes` and the full client portfolio at `/clientes/carteira` so each view remains directly shareable and extensible.
- Keep individual client profiles at `/clientes/$clienteId`, using one shared client dataset for portfolio and detail consistency.
- Keep client registration and commercial terms at `/clientes/$clienteId/cadastro`, with profile tabs linking between overview and registration.
- Keep client performance tracking at `/clientes/$clienteId/acompanhamento`, using the shared client identity and profile navigation.
- Keep the client document index at `/clientes/$clienteId/arquivos`; store access links rather than uploaded file binaries in this mock phase.
- Keep client financial details at `/clientes/$clienteId/financeiro`, separating LeadPro receivables from client revenue used for commissions.
- Keep the general Financeiro dashboard at `/financeiro` and transaction management at `/financeiro/lancamentos` so both views remain directly accessible.
