# 🚀 Fintech Landing Page

Uma landing page completa e full-stack desenvolvida para captação de leads, contando com validação de dados, auditoria de requisições e um ambiente de banco de dados isolado com Docker.

## 💻 Tecnologias Utilizadas

**Frontend:**
* ![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB) + ![Vite](https://img.shields.io/badge/Vite-%23646CFF.svg?logo=vite&logoColor=white)
* ![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?logo=typescript&logoColor=white)
* 🔌 Integração com API REST

**Backend:**
* ![NodeJS](https://img.shields.io/badge/Node.js-%2343853D.svg?logo=node.js&logoColor=white) + ![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?logo=typescript&logoColor=white)
* ![Prisma](https://img.shields.io/badge/Prisma-%233982CE.svg?logo=Prisma&logoColor=white)
* ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-%23316192.svg?logo=postgresql&logoColor=white) (via ![Docker](https://img.shields.io/badge/Docker-%230db7ed.svg?logo=docker&logoColor=white))
* 🛡️ **Zod** (Validação de schemas e segurança dos dados)
* 📝 **Pino** (Logs de auditoria e monitoramento)


## ⚙️ Arquitetura e Segurança
* **Isolamento de Ambiente:** Banco de dados executado localmente via `docker-compose`, garantindo que o ambiente de desenvolvimento não dependa de serviços externos.
* **Validação e Sanitização:** Uso do Zod para garantir que a API processe apenas dados esperados e sanitização ativa contra injeções de código (XSS).
* **Logs Estruturados:** Sistema de logs implementado para rastrear o tempo de resposta e o status HTTP de cada requisição no backend.

## 🛠️ Como rodar o projeto localmente

### 1. Subindo o Banco de Dados
Na pasta do backend, inicie o container do PostgreSQL:
```bash
cd ramp-backend
docker-compose up -d
```

### 2. Rodando as Migrations
Sincronize a estrutura do banco de dados com o Prisma:
```bash
npx prisma db push
```

### 3. Iniciando o Backend
Inicie o servidor de desenvolvimento (rodará na porta 3333):
```bash
npm run dev
```

### 4. Iniciando o Frontend
Em um novo terminal, na raiz do projeto frontend, instale as dependências e rode a aplicação:
```bash
npm install
npm run dev
```
---
