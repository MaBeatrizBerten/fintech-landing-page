# 🚀 Fintech Landing Page

Uma landing page completa e full-stack desenvolvida para captação de leads, contando com validação de dados, auditoria de requisições e um ambiente de banco de dados isolado com Docker.

## 💻 Tecnologias Utilizadas

**Frontend:**
* React + Vite
* TypeScript
* Integração com API REST

**Backend:**
* Node.js + TypeScript
* Prisma ORM
* PostgreSQL (rodando em container Docker)
* Zod (Validação de schemas e segurança dos dados)
* Pino (Logs de auditoria e monitoramento)

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
