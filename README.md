# Área de Membros — Mapa do Prazer Masculino (Brasil)

Área de membros para o mercado brasileiro do produto Mapa do Prazer Masculino.

- **Domínio de Produção no Vercel:** [https://mapa-do-prazer-area.vercel.app/#dashboard](https://mapa-do-prazer-area.vercel.app/#dashboard)
- **Idioma / Região:** `pt-BR`
- **Funil Correspondente:** `mapa-prazer-masculino-br`
- **Orquestrador Central:** [`group-jevo-funnel-ops`](https://github.com/groupjevo-projects/group-jevo-funnel-ops)

## Estrutura Técnica

- `index.html`: Shell principal da Single Page Application.
- `css/styles.css`: Estilização dark mode / luxury responsiva.
- `js/data.js`: Base de dados dos cursos, módulos, players de vídeo (VTURB) e materiais.
- `js/pages/dashboard.js`: Renderizador do catálogo e estado dos módulos.
- `js/pages/course.js`: Renderizador de aulas e leitor de materiais.
- `js/app.js`: Roteamento hash (`#dashboard`, `#course/:id`) e inicialização.
- `assets/`: Mockups, logos e materiais para download.

## Deploy no Vercel

Repositório configurado para deploy automático direto da raiz (`/`) a cada push na branch `main`.
