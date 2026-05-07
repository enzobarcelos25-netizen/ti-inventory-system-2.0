# TI Inventory System 2.0

Sistema full stack para inventario de ativos de TI, combinando front-end, back-end, scripts Python e planilha de apoio.

<p align="center">
  <img src="https://img.shields.io/badge/React-111?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-111?style=for-the-badge&logo=node.js" alt="Node.js" />
  <img src="https://img.shields.io/badge/Python-111?style=for-the-badge&logo=python" alt="Python" />
</p>

## Visao geral

O projeto foi criado para simular uma necessidade comum em suporte e infraestrutura: controlar equipamentos, dados de inventario e informacoes operacionais sem depender apenas de planilhas manuais.

Ele mostra a transicao entre conhecimento de TI corporativa e desenvolvimento: interface web, API, arquivos de dados e scripts auxiliares trabalhando no mesmo fluxo.

## Destaques

- Projeto aplicado a um problema real de TI.
- Separacao entre front-end e back-end.
- Scripts Python para apoio operacional.
- Base em planilha para aproximar o projeto de cenarios reais.
- Repositorio limpo de dependencias versionadas (`node_modules` removido).

## Funcionalidades atuais

- Dashboard React para visualizar informacoes.
- Componentes para formulario e cadastro.
- Servico de API no front-end.
- Back-end Node.js com `server.js`.
- Scripts Python para scanner e manipulacao de planilha.
- Arquivo `inventario.xlsx` como base inicial.

## Stack

- React
- Vite
- Node.js
- JavaScript
- Python
- Excel/planilhas

## Estrutura

```txt
ti-inventory-system-2.0/
  backend/
    server.js
    package.json
  frontend/
    src/
      Dashboard.jsx
      components/
        Copilot.jsx
        PCForm.jsx
      services/
        api.js
  python/
    scanner.py
    scanner_auto.py
    salvar_excel.py
  inventario.xlsx
```

## Como rodar

Back-end:

```bash
cd backend
npm install
npm run dev
```

Front-end:

```bash
cd frontend
npm install
npm run dev
```

## Organizacao aplicada

- README raiz criado.
- `.gitignore` adicionado.
- `backend/node_modules` removido do versionamento.
- Estrutura principal documentada.

## Proximos passos

- Padronizar scripts de start no `package.json` raiz.
- Documentar endpoints do back-end.
- Criar `.env.example`, se houver variaveis de ambiente.
- Adicionar prints da interface.
- Avaliar arquivos vazios dentro de `python/`.
- Evoluir persistencia para banco de dados.

## Status

Projeto em evolucao para portfolio, com foco em desenvolvimento web aplicado a TI corporativa.
