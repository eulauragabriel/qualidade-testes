# 🚀 QUICK START - Como Rodar Tudo

## ⚙️ PRÉ-REQUISITOS

- ✅ Node.js 16+ instalado
- ✅ MongoDB rodando (local ou Atlas)
- ✅ Git (opcional)

---

## 1️⃣ INSTALAR DEPENDÊNCIAS

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

**Tempo esperado:** ~2-3 minutos (primeira vez)

---

## 2️⃣ CONFIGURAR VARIÁVEIS DE AMBIENTE

### Backend

```bash
cd backend
```

**Criar `.env` baseado em `.env.example`:**

```env
# .env
MONGODB_URI=mongodb://localhost:27017/crud-app-test
NODE_ENV=development
PORT=3000
```

**Ou se usar MongoDB Atlas:**

```env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/crud-app-test?retryWrites=true
```

### Frontend

```bash
cd frontend
```

**Criar `.env.local` baseado em `.env.example`:**

```env
# .env.local
VITE_API_URL=http://localhost:3000/api/v1
```

---

## 3️⃣ RODAR OS TESTES (Backend)

```bash
cd backend

# Rodar todos os testes
npm test

# Rodar com cobertura
npm run test:coverage

# Rodar em modo watch (recarrega quando você edita)
npm test:watch
```

**Resultado esperado:**
```
Test Suites: 4 passed, 4 total
Tests:       74 passed, 74 total
Time:        ~20s
```

**O que é testado:**
- ✅ **Pairwise Testing** (9 testes)
- ✅ **Complexidade Ciclomática** (12 testes)
- ✅ **AI-Driven Testing** (24 testes)
- ✅ **Integração CRUD** (29 testes)

---

## 4️⃣ RODAR O BACKEND

### Opção A: Desenvolvimento (com hot-reload)

```bash
cd backend
npm run dev
```

**Saída:**
```
Server running on http://localhost:3000
Connected to MongoDB
```

### Opção B: Produção

```bash
cd backend
npm run build
npm start
```

**Endpoints disponíveis:**
- `POST /api/v1/users` - Criar usuário
- `GET /api/v1/users` - Listar usuários
- `GET /api/v1/users/:id` - Obter usuário
- `PUT /api/v1/users/:id` - Atualizar usuário
- `DELETE /api/v1/users/:id` - Deletar usuário

---

## 5️⃣ RODAR O FRONTEND

```bash
cd frontend
npm run dev
```

**Acesse em:** http://localhost:3001

**Recursos:**
- ✨ Interface CRUD completa
- 📝 Formulário com validação
- 📊 Listagem paginada
- 🔄 Sincronização com API

---

## 🎯 FLUXO COMPLETO (RECOMENDADO)

### Terminal 1 - Backend API

```bash
cd backend
npm install
npm run dev
```

Aguarde até ver:
```
Server running on http://localhost:3000
Connected to MongoDB
```

### Terminal 2 - Testes

```bash
cd backend
npm test
```

Aguarde até ver:
```
Test Suites: 4 passed, 4 total
Tests:       74 passed, 74 total
```

### Terminal 3 - Frontend

```bash
cd frontend
npm install
npm run dev
```

Acesse: http://localhost:3001

---

## 🧪 TESTES ESPECÍFICOS

### Rodar apenas Pairwise Testing

```bash
cd backend
npm test -- pairwise-testing.test.ts
```

### Rodar apenas Complexidade Ciclomática

```bash
npm test -- cyclomatic-complexity.test.ts
```

### Rodar apenas AI-Driven Testing

```bash
npm test -- ai-driven-testing.test.ts
```

### Rodar apenas Integração CRUD

```bash
npm test -- api.integration.test.ts
```

---

## 📊 GERAR COBERTURA DE TESTES

```bash
cd backend
npm run test:coverage
```

**Resultado:** Arquivos HTML em `backend/coverage/`

Abra: `coverage/index.html` no navegador

---

## ✅ VALIDAÇÃO (QUALIDADE)

### Lint

```bash
cd backend
npm run lint
```

### Build TypeScript

```bash
npm run build
```

---

## 🐛 TROUBLESHOOTING

### "MongoDB connection failed"

**Solução:**
1. Certifique-se que MongoDB está rodando
2. Verifique `MONGODB_URI` no `.env`

**Testar conexão:**
```bash
mongo  # ou mongosh (versões recentes)
```

### "Port 3000 already in use"

**Solução:**
```bash
# Encontrar processo usando porta 3000
netstat -ano | findstr :3000

# Matar processo (Windows)
taskkill /PID <PID> /F
```

### "Cannot find module 'uuid'"

**Solução:**
```bash
cd backend
npm install @types/uuid
```

### Testes falhando aleatoriamente

**Solução:**
```bash
# Limpar cache Jest
npm test -- --clearCache

# Reiniciar MongoDB
```

---

## 📚 DOCUMENTAÇÃO COMPLETA

- **`README.md`** - Visão geral do projeto
- **`PRESENTATION.md`** - Técnicas de teste e qualidade
- **`AI-DRIVEN-TESTING.md`** - Guia de testes com IA
- **`FULLSTACK_README.md`** - Setup avançado e deploy
- **`DEPLOYMENT.md`** - Deploy em produção

---

## 🎓 ESTRUTURA DE ARQUIVOS

```
teste/
├── backend/
│   ├── src/
│   │   ├── models/        ← Mongoose User schema
│   │   ├── services/      ← Lógica de negócio (UserService)
│   │   ├── controllers/   ← HTTP handlers
│   │   ├── middleware/    ← Validação e erros
│   │   ├── routes/        ← Endpoints
│   │   └── config/        ← Config e DB
│   ├── tests/
│   │   ├── pairwise-testing.test.ts
│   │   ├── cyclomatic-complexity.test.ts
│   │   ├── ai-driven-testing.test.ts
│   │   └── api.integration.test.ts
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/    ← React components
│   │   ├── services/      ← API calls
│   │   └── App.tsx
│   └── package.json
│
└── docs/
    ├── PRESENTATION.md
    ├── AI-DRIVEN-TESTING.md
    └── FULLSTACK_README.md
```

---

## ✨ PRONTO PARA COMEÇAR?

1. ✅ Instale dependências
2. ✅ Configure `.env`
3. ✅ Rode `npm test` (backend)
4. ✅ Rode `npm run dev` (backend)
5. ✅ Rode `npm run dev` (frontend)

**Vou começar! 🚀**
