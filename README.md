# Gerenciamento de Usuário

Aplicação CRUD completa com TypeScript, React, Express.js e MongoDB.

**Disciplina:** Qualidade e Testes de Software

## 🚀 Início Rápido

### Pré-requisitos
- Node.js 18+
- MongoDB rodando

### Instalação

**Backend:**
```bash
cd backend
npm install
npm test # Verificar testes (74/74 passando)
npm run dev # Iniciar servidor na porta 3000
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev # Iniciar app na porta 3001
```

## 📡 API

Base URL: `http://localhost:3000/api/v1`

### Endpoints
- `GET /users` - Listar
- `GET /users/:id` - Obter por ID
- `POST /users` - Criar
- `PUT /users/:id` - Atualizar
- `DELETE /users/:id` - Deletar
- `PATCH /users/:id/deactivate` - Desativar

## 🧪 Testes

```bash
cd backend
npm test # 74 testes (Pairwise, CC, AI-Driven, CRUD)
npm test:watch # Modo watch
```

## ✅ Status

- ✅ 74/74 testes passando
- ✅ Backend: Express + TypeScript
- ✅ Frontend: React + Vite
- ✅ Banco: MongoDB
