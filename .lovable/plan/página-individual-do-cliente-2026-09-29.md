# Página individual do cliente

## Objetivo
Criar a visão geral de cada cliente da Carteira, seguindo a composição delicada da referência e mantendo a navegação pronta para evolução.

## Implementação
- Criar a rota dinâmica `/clientes/$clienteId` para abrir qualquer cliente da lista.
- Transformar o nome/avatar de cada cliente na Carteira em um link para sua página.
- Montar o cabeçalho do cliente com nome, empresa, status, perfil, responsável e ação de edição.
- Adicionar as abas Visão Geral, Dados, Canais e Conexões, Acompanhamento, Arquivos e Financeiro, mantendo Visão Geral ativa nesta rodada.
- Reproduzir os blocos da referência: indicadores, situação atual, performance, financeiro, informações do cliente e atividades recentes.
- Usar dados demonstrativos coerentes com cada cliente, com Gran Reserva como conteúdo principal da referência.
- Garantir leitura adequada em computador e celular, sem alterar as demais páginas.

## Validação
- Abrir um cliente pela Carteira e confirmar a URL e o conteúdo individual.
- Conferir a nova tela em desktop e celular.
- Verificar erros de execução e compilação.

## Detalhes técnicos
- A rota será um segmento dinâmico do TanStack Router, preservando `/clientes` e `/clientes/carteira`.
- Os dados compartilhados da carteira serão centralizados em um módulo reutilizável para evitar divergências entre lista e detalhe.
