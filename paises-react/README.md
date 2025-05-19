Desafio React – Victor Itakura de Oliveira  

Mini‑aplicação em React 18+ que lista países consumindo a REST Countries API.

 Descrição

Esta aplicação permite ao usuário explorar informações sobre países:

Listar todos os países

-Buscar por nome

-Filtrar por região

-Paginar resultados (60 países por página)

-Exibir detalhes de cada país (bandeira, capital, população, línguas, moeda, fronteiras)

-Spinner de carregamento e tratamento de erros com retry

Decisões Técnicas

-React 18+ com Function Components e Hooks: facilita gerenciamento de estado e efeitos colaterais.

-TypeScript: adiciona tipagem estática e segurança.

-Context API: gerencia globalmente a lista de países sem necessidade de Redux.

-React Router v6: navegação entre lista e detalhe de país.

-Fetch nativo + async/await: chamadas HTTP simples e legíveis.

-Tailwind CSS: estilização rápida e responsiva (mobile-first).

-LocalStorage: cache simples para evitar chamadas repetidas à API.

-Jest + React Testing Library: testes unitários para lista, busca, loading e navegação.

Limitações

-Cache simples via LocalStorage, sem expiração configurada.

-Sem modo claro/escuro implementado.

-Paginação tradicional; infinite scroll não implementado, porem presente nos primeiros commits.

-Sem testes de integração (e2e); apenas testes unitários.

Testes

# Executa todos os testes
npm test

# Gera relatório de cobertura
npm run coverage

Cobertura mínima atingida: >50% de linhas e funções.

