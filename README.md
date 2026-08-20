# 🚀 Fintech Landing Page

Aplicação **full-stack para captação de leads**, desenvolvida com React e Node.js, com foco em validação de dados, segurança, auditoria de requisições e persistência em banco de dados PostgreSQL na nuvem.

---

## 🚀 Aplicação em Produção — Live Demo

O projeto está **100% funcional e publicado em produção**, permitindo testar a aplicação diretamente pela internet.

### 🌐 Acesse o projeto

- **Frontend:** https://fintech-landing-page-xi.vercel.app
- **Backend API:** https://ramp-backend-5gzl.onrender.com

> 💡 **Dica para testar:** acesse o frontend, role até o final da página e preencha o formulário de contato. Os dados são enviados para a API hospedada no Render e persistidos no banco de dados PostgreSQL do Supabase.

---

## 🏗️ Arquitetura e Deploy

O projeto utiliza uma arquitetura **Full-Stack**, integrando interface, API e banco de dados em diferentes serviços de nuvem.

| Camada            | Tecnologia                     | Hospedagem                   |
| ----------------- | ------------------------------ | ---------------------------- |
| 🎨 Frontend       | React + Vite + TypeScript      | Vercel                       |
| ⚙️ Backend        | Node.js + Express + TypeScript | Render                       |
| 🗄️ Banco de Dados | PostgreSQL                     | Supabase                     |
| 🔌 Comunicação    | API RESTful                    | CORS + Variáveis de Ambiente |

### 🔄 Fluxo da aplicação

```text
Usuário
   │
   ▼
Frontend — React + Vite
   │
   │ API REST
   ▼
Backend — Node.js + Express
   │
   │ Prisma ORM
   ▼
PostgreSQL — Supabase
```

A comunicação entre frontend e backend é realizada por meio de uma **API RESTful**, com configuração de **CORS** e utilização de **variáveis de ambiente** para manter informações sensíveis fora do código-fonte.

---

## 💻 Tecnologias Utilizadas

### 🎨 Frontend

- ![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB) **React**
- ![Vite](https://img.shields.io/badge/Vite-%23646CFF.svg?logo=vite&logoColor=white) **Vite**
- ![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?logo=typescript&logoColor=white) **TypeScript**
- 🔌 Integração com **API REST**

### ⚙️ Backend

- ![Node.js](https://img.shields.io/badge/Node.js-%2343853D.svg?logo=node.js&logoColor=white) **Node.js**
- **Express**
- ![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?logo=typescript&logoColor=white) **TypeScript**
- ![Prisma](https://img.shields.io/badge/Prisma-%233982CE.svg?logo=Prisma&logoColor=white) **Prisma ORM**
- ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white) **Supabase**
- 🐘 **PostgreSQL**
- 🛡️ **Zod** — validação e tipagem dos dados
- 📝 **Pino** — logs estruturados e auditoria de requisições

---

## 🔐 Segurança e Boas Práticas

### 🛡️ Validação de Dados

O **Zod** é utilizado para validar os dados recebidos pela API antes do processamento.

A validação garante que:

- Os dados estejam no formato esperado;
- Campos obrigatórios sejam preenchidos;
- Valores inválidos sejam rejeitados;
- Payloads inesperados não sejam processados pela aplicação.

### 📝 Logs Estruturados

O **Pino** é utilizado para gerar logs estruturados das requisições realizadas na API.

Os logs permitem acompanhar:

- Requisições recebidas;
- Status das respostas;
- Erros durante o processamento;
- Informações úteis para auditoria e monitoramento.

### 🔒 Variáveis de Ambiente

Informações sensíveis, como credenciais e strings de conexão com o banco de dados, são armazenadas através de **variáveis de ambiente**.

O arquivo `.env` não deve ser versionado no Git.

---

## 📌 Funcionalidades

- 🚀 Landing Page para captação de leads
- 📝 Formulário de contato
- 🔌 Integração entre frontend e backend através de API REST
- 🛡️ Validação de dados com Zod
- 🗄️ Persistência em PostgreSQL
- ☁️ Banco de dados hospedado no Supabase
- 🔎 Logs estruturados com Pino
- 📊 Auditoria das requisições
- 🌐 Deploy do frontend na Vercel
- ⚙️ Deploy do backend no Render
- ⚡ Desenvolvimento com Vite
- 🔷 Aplicação desenvolvida em TypeScript

---

## 🛠️ Como Rodar o Projeto Localmente

### 📋 Pré-requisitos

Antes de começar, você precisa ter instalado:

- [Node.js](https://nodejs.org/)
- npm
- Uma conta no [Supabase](https://supabase.com/)
- Git

---

### 1. ⚙️ Configurando o Backend

Entre na pasta do backend:

```bash
cd ramp-backend
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` na raiz do backend:

```env
DATABASE_URL="postgresql://postgres.[SUA_CONTA]:[SUA_SENHA]@[SEU_HOST]:5432/postgres"
```

Substitua os valores pelos dados de conexão fornecidos pelo seu projeto no Supabase.

Sincronize o Prisma com o banco de dados:

```bash
npx prisma db push
```

Inicie o servidor:

```bash
npm run dev
```

A API será executada localmente, por padrão, em:

```text
http://localhost:3333
```

---

### 2. 🎨 Configurando o Frontend

Abra outro terminal e entre na pasta do frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O Vite exibirá no terminal o endereço local para acessar a aplicação.

---

## 📁 Estrutura do Projeto

```text
fintech-landing-page/
│
├── ramp-backend/
│   ├── prisma/
│   ├── src/
│   ├── .env
│   ├── package.json
│   └── ...
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
└── README.md
```

> A estrutura pode variar de acordo com a organização atual do projeto.

---

## 🎯 Objetivo do Projeto

O projeto foi desenvolvido com o objetivo de demonstrar a construção de uma aplicação **Full-Stack moderna**, integrando uma interface web com uma API REST, validação de dados, banco de dados relacional e práticas de segurança, monitoramento e deploy em produção.

---

## 👩‍💻 Desenvolvimento

Projeto desenvolvido utilizando **React, TypeScript, Node.js, Express, Prisma, PostgreSQL e Supabase**, com deploy realizado através da **Vercel** e **Render**.
