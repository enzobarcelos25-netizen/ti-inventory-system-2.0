# TI Inventory System 2.0

Sistema de inventario de TI criado para organizar computadores, equipamentos e informacoes de ambiente corporativo.

O projeto combina front-end, back-end e scripts auxiliares para treinar uma arquitetura mais proxima de um sistema real usado por suporte ou infraestrutura.

## Objetivo

Centralizar o cadastro e a consulta de ativos de TI, reduzindo controle manual em planilhas soltas e criando base para futuras automacoes.

## Funcionalidades atuais

- Front-end em React para visualizar e cadastrar informacoes.
- Back-end em Node.js para servir dados e endpoints.
- Scripts Python para apoio em scanner e manipulacao de planilha.
- Arquivo `inventario.xlsx` usado como base de dados inicial/apoio.
- Componentes separados para dashboard, formulario e integracao com API.

## Stack

- React
- Vite
- Node.js
- JavaScript
- Python
- Excel/planilhas

## Estrutura principal

```txt
ti-inventory-system-2.0/
  backend/
    server.js
    package.json
  frontend/
    src/
      Dashboard.jsx
      components/
      services/api.js
  python/
    scanner.py
    scanner_auto.py
    salvar_excel.py
  inventario.xlsx
```

## Como rodar

### Back-end

```bash
cd backend
npm install
npm run dev
```

### Front-end

```bash
cd frontend
npm install
npm run dev
```

## Observacoes de organizacao

Este repositorio ainda pode evoluir em limpeza tecnica. Proximos ajustes recomendados:

- Remover `node_modules` versionado e manter apenas `package.json` / `package-lock.json`.
- Criar `.env.example` para variaveis de ambiente, se houver.
- Padronizar scripts de start no `package.json` raiz.
- Documentar os endpoints do back-end.
- Adicionar prints da interface.

## Status

Projeto em evolucao para portfolio e pratica de sistema full stack aplicado a TI corporativa.
