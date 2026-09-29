# Acompanhamento do cliente

## Objetivo
Criar a aba **Acompanhamento** em cada perfil de cliente, reproduzindo a organização da referência no visual delicado já usado no painel.

## O que será construído
- Nova página em `/clientes/$clienteId/acompanhamento`, carregando o mesmo cliente da Carteira.
- Cabeçalho existente do cliente com a aba Acompanhamento ativa e links funcionais para Visão Geral e Cadastro e Condição.
- Seletor de período e resumo do funil com Leads, Qualificados, Oportunidades, Vendas, CPL e Faturamento.
- Gráfico de evolução da performance, quadro de qualidade dos leads e distribuição por origem.
- Blocos de pontos de atenção e situação do acompanhamento.
- Histórico mensal de resultados, com ação para registrar resultado e exportar apresentada na interface.
- Ajuste das abas nas páginas já existentes para que Acompanhamento seja clicável.

## Dados e comportamento
Os dados serão demonstrativos e derivados do cliente selecionado, sem persistência nesta etapa. A estrutura será responsiva para desktop e celular e manterá os tokens visuais existentes.

## Validação
- Conferir carregamento pela Carteira e navegação entre as três abas.
- Conferir layout em desktop e celular.
- Confirmar ausência de erros no painel.
