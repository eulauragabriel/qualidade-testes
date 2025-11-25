# CRUD TypeScript - Full-Stack Project

Sistema CRUD completo com **Express API** + **React Frontend** + **MongoDB/Firebase**.

**📖 Guia Rápido:** Veja [QUICK_START.md](./QUICK_START.md) para instruções passo a passo!

---

## 🚀 Quick Start (30 segundos)

```bash
# Terminal 1 - Testes
cd backend && npm install && npm test

# Terminal 2 - Backend API
cd backend && npm run dev      # http://localhost:3000

# Terminal 3 - Frontend
cd frontend && npm install && npm run dev  # http://localhost:3001
```

**Esperado:** ✅ 74 testes passando | Backend rodando | Frontend carregando

---

## 📚 Projetos

### 🔴 Backend (Express + TypeScript)

```bash
cd backend

# Desenvolvimento
npm run dev            # ts-node com hot-reload

# Produção
npm run build          # Compilar TypeScript
npm start              # Rodar versão compilada

# Testes
npm test               # Rodar testes unitários
npm test:watch         # Modo watch
npm test:coverage      # Com cobertura

# Qualidade
npm run lint           # ESLint
```

**Endpoints:**
- `POST /api/v1/users` - Criar
- `GET /api/v1/users` - Listar
- `GET /api/v1/users/:id` - Obter
- `PUT /api/v1/users/:id` - Atualizar
- `DELETE /api/v1/users/:id` - Deletar

**Stack:** Express, Mongoose, Firebase Admin, Joi validation, Helmet, Morgan

**Testes:** 66 testes incluindo Pairwise Testing, AI-Driven Testing, CRUD e Service tests
- `backend/tests/` → Testes unitários
- `backend/tests/fixtures/` → Exemplos educacionais

### 🔵 Frontend (React + Vite)

```bash
cd frontend

# Desenvolvimento
npm run dev            # http://localhost:3001

# Produção
npm run build          # Vite build
npm run preview        # Preview da build
```

**Features:**
- CRUD UI funcional
- Formulário com validação
- Listagem paginada
- Status de usuário (ativo/inativo)

**Stack:** React 18, TypeScript, Vite, Axios

---

## 📖 Documentação

- **FULLSTACK_README.md** - Setup detalhado, configuração de banco de dados
- **DEPLOYMENT.md** - Deploy em Heroku, Vercel, Docker
- **AI-DRIVEN-TESTING.md** - Guia de testes com IA
- **PRESENTATION.md** - Técnicas de teste e qualidade

---

## 🗂️ Estrutura

```
teste/
├── backend/
│   ├── src/                    # Código-fonte
│   │   ├── index.ts           # Express server
│   │   ├── config/            # Configuração e DB
│   │   ├── middleware/        # Validação, erro, etc
│   │   ├── controllers/       # HTTP handlers
│   │   ├── services/          # Lógica de negócio
│   │   ├── routes/            # Endpoints
│   │   └── models/            # Mongoose schemas
│   ├── tests/                  # 66 testes unitários
│   │   ├── *.test.ts          # Testes
│   │   └── fixtures/          # Exemplos educacionais
│   ├── package.json
│   ├── jest.config.js
│   ├── tsconfig.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── App.tsx            # Main component
│   │   ├── components/        # UserForm, UserList
│   │   ├── services/          # API client
│   │   └── main.tsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── .env.example
│
├── README.md                   # Este arquivo
├── FULLSTACK_README.md
├── DEPLOYMENT.md
├── AI-DRIVEN-TESTING.md
└── PRESENTATION.md
```

---

## ⚙️ Configuração

### Backend (.env)

```env
PORT=3000
NODE_ENV=development
DB_TYPE=mongodb              # ou 'firebase'
MONGODB_URI=mongodb://localhost:27017/crud-app
CORS_ORIGIN=http://localhost:3001
```

### Frontend (.env)

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

---

## 🧪 Testes

Testes localizados em `backend/tests/`:

```bash
cd backend

# Rodar todos os testes
npm test

# Modo watch (re-roda ao salvar)
npm test:watch

# Com relatório de cobertura
npm test:coverage
```

**Tipos de testes:**
- ✅ Pairwise Testing (combinações estratégicas)
- ✅ AI-Driven Testing (edge cases com IA)
- ✅ CRUD Testing (operações completas)
- ✅ Service Testing (lógica de negócio)

**Cobertura:** 93.42%

---

## 🚀 Deployment

Ver **DEPLOYMENT.md** para:
- Heroku
- Vercel (frontend)
- Docker
- Variáveis de ambiente

---

## 🛠️ Scripts Globais

```bash
npm run dev:back       # Backend em dev
npm run dev:front      # Frontend em dev
npm start:back         # Backend em produção
npm test               # Rodar testes backend
npm test:watch         # Testes em watch mode
npm build:back         # Build backend
npm build:front        # Build frontend
npm lint:back          # ESLint backend
```

---

## 📋 Checklist de Início

- [ ] `npm install` em `backend/`
- [ ] `npm install` em `frontend/`
- [ ] Copiar `.env.example` → `.env` em ambos
- [ ] Configurar banco (MongoDB ou Firebase)
- [ ] `npm start` no backend
- [ ] `npm run dev` no frontend
- [ ] Acessar http://localhost:3001

---

**Pronto para usar!** 🎉
