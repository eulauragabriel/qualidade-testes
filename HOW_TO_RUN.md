# 📋 RESUMO: Como Rodar Tudo

## 🎯 Objetivo Final
Testar e rodar a aplicação completa (Backend + Frontend + Testes).

---

## 🏃 QUICK START (5 minutos)

### **Passo 1: Instalar (Terminal 1)**
```bash
cd c:\Users\Laura\Downloads\teste\backend
npm install
```

### **Passo 2: Configurar Environment**
Na pasta `backend`, criar arquivo `.env`:
```env
MONGODB_URI=mongodb://localhost:27017/crud-app-test
NODE_ENV=development
PORT=3000
```

### **Passo 3: Rodar Testes (Terminal 1)**
```bash
npm test
```

**Esperado:**
```
Test Suites: 4 passed, 4 total
Tests:       74 passed, 74 total ✅
```

### **Passo 4: Rodar Backend (Terminal 2)**
```bash
npm run dev
```

**Esperado:**
```
Server running on http://localhost:3000 ✅
Connected to MongoDB ✅
```

### **Passo 5: Rodar Frontend (Terminal 3)**
```bash
cd c:\Users\Laura\Downloads\teste\frontend
npm install
npm run dev
```

**Acesse:** http://localhost:3001 ✅

---

## ✅ CHECKLIST

- [ ] Backend npm install
- [ ] Backend .env configurado
- [ ] Testes rodando (74/74)
- [ ] Backend dev rodando (http://localhost:3000)
- [ ] Frontend dev rodando (http://localhost:3001)

---

## 📊 O QUE SERÁ TESTADO

### **Testes Unitários (Backend)**

1. **Pairwise Testing** (9 testes)
   - Teste combinatório de parâmetros

2. **Complexidade Ciclomática** (12 testes)
   - Métrica de qualidade do código

3. **AI-Driven Testing** (24 testes)
   - Edge cases e cenários derivados

4. **Integração CRUD** (29 testes)
   - Endpoints da API

### **Frontend**
- CRUD UI completa
- Formulários com validação
- Listagem paginada
- Sincronização com API

---

## 🔧 DETALHES

### Testes Específicos

```bash
cd backend

# Apenas Pairwise
npm test -- pairwise-testing.test.ts

# Apenas Complexidade
npm test -- cyclomatic-complexity.test.ts

# Apenas IA
npm test -- ai-driven-testing.test.ts

# Apenas Integração
npm test -- api.integration.test.ts
```

### Cobertura de Testes

```bash
npm run test:coverage
# Abre relatório em coverage/index.html
```

---

## 🚀 ENDPOINTS DISPONÍVEIS

```
POST   /api/v1/users          ← Criar usuário
GET    /api/v1/users          ← Listar usuários
GET    /api/v1/users/:id      ← Obter usuário
PUT    /api/v1/users/:id      ← Atualizar usuário
DELETE /api/v1/users/:id      ← Deletar usuário
```

---

## 🐛 SE ALGO FALHAR

### Erro: "MongoDB connection failed"
```bash
# Verificar se MongoDB está rodando
# Windows: Services > MongoDB
# Linux: sudo systemctl start mongod
# Mac: brew services start mongodb-community
```

### Erro: "Port 3000 already in use"
```bash
# Encontrar processo
netstat -ano | findstr :3000

# Matar (Windows)
taskkill /PID <PID> /F
```

### Erro: "Cannot find module 'uuid'"
```bash
cd backend
npm install @types/uuid
```

---

## 📚 PRÓXIMAS ETAPAS

1. Ler [QUICK_START.md](./QUICK_START.md) para detalhes
2. Ler [PRESENTATION.md](./PRESENTATION.md) para técnicas
3. Ler [AI-DRIVEN-TESTING.md](./AI-DRIVEN-TESTING.md) para IA

---

**Pronto? Comece pelo Passo 1! 🚀**
