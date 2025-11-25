# 🧪 Testes de Integração - Guia Completo

## 📋 Pré-requisitos

Os testes de integração testam a **API completa com banco de dados real**. Você precisa de MongoDB.

### Opção 1: MongoDB Local (Recomendado para desenvolvimento)

**Windows:**
1. Download: https://www.mongodb.com/try/download/community
2. Instalar (padrão recomendado)
3. Iniciar serviço MongoDB

**macOS (com Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu):**
```bash
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

**Docker:**
```bash
docker run -d \
  --name mongo-test \
  -p 27017:27017 \
  -e MONGO_INITDB_DATABASE=crud-app-test \
  mongo:latest
```

### Opção 2: MongoDB Atlas (Cloud - Recomendado para produção)

1. Criar conta: https://www.mongodb.com/cloud/atlas
2. Criar cluster gratuito
3. Copiar connection string (você terá algo como: `mongodb+srv://user:password@cluster.mongodb.net/?retryWrites=true`)

---

## 🚀 Rodando os Testes

### Setup Inicial

```bash
# Entrar na pasta do backend
cd backend

# Instalar dependências (primeira vez apenas)
npm install

# Copiar .env.test (já vem pronto)
# Nada a fazer, já existe .env.test
```

### Rodar Testes - MongoDB Local

```bash
# Opção 1: Com MongoDB rodando localmente (padrão)
npm test

# Opção 2: Ver relatório de cobertura
npm test -- --coverage

# Opção 3: Modo watch (re-roda ao salvar arquivos)
npm test:watch
```

### Rodar Testes - MongoDB Atlas (Cloud)

1. **Editar `.env.test`:**

```env
PORT=3000
NODE_ENV=test
DB_TYPE=mongodb
MONGODB_URI=mongodb://localhost:27017/crud-app
MONGODB_TEST_URI=mongodb+srv://seu_user:sua_password@seu-cluster.mongodb.net/crud-app-test?retryWrites=true&w=majority
CORS_ORIGIN=http://localhost:3001
API_PREFIX=/api/v1
```

2. **Rodar testes:**

```bash
npm test
```

---

## 📊 Resultado Esperado

Se tudo funcionar, você verá:

```
 PASS  tests/api.integration.test.ts
  🧪 CRUD API - Integration Tests
    GET /health
      ✓ should return health status (45 ms)
    POST /api/v1/users - Create User
      ✓ should create a new user successfully (78 ms)
      ✓ should fail with invalid email (34 ms)
      ✓ should fail with age < 18 (29 ms)
      ✓ should fail with duplicate email (105 ms)
      ✓ should fail with missing required fields (23 ms)
    GET /api/v1/users - Get All Users
      ✓ should return empty list when no users exist (42 ms)
      ✓ should return all users (156 ms)
      ✓ should filter by status (134 ms)
    GET /api/v1/users/:id - Get User by ID
      ✓ should return user by id (98 ms)
      ✓ should fail with invalid id format (31 ms)
      ✓ should return 404 for non-existent user (89 ms)
    ... (mais 20+ testes)

Test Suites: 1 passed, 1 total
Tests:       35 passed, 35 total
Snapshots:   0 total
Time:        15.234 s
```

---

## ❌ Troubleshooting

### ❌ Erro: "Cannot connect to MongoDB"

**Solução:**
- Verifique se MongoDB está rodando
- Tente conectar manualmente: `mongosh mongodb://localhost:27017`
- Ou use Docker: `docker run -d -p 27017:27017 mongo:latest`

### ❌ Erro: "MONGODB_TEST_URI is not set"

**Solução:**
- Copie `.env.test.example` para `.env.test`
- Ou defina variável de ambiente: `export MONGODB_TEST_URI=mongodb://localhost:27017/crud-app-test`

### ❌ Erro: "Timeout - Tests are slow"

**Solução:**
- Testes estão esperando MongoDB responder
- Aumente timeout em `jest.config.js`: `testTimeout: 60000`
- Verifique conexão de rede se usar MongoDB Atlas

### ❌ Erro: "Connection refused"

**Solução:**
```bash
# Verifique se MongoDB está rodando
mongosh   # macOS/Linux
mongo     # Windows (versões antigas)

# Ou inicie MongoDB:
mongod    # Termo inal 1

# Depois rode testes em novo terminal
cd backend && npm test
```

---

## 🔧 Estrutura dos Testes

Arquivo: `backend/tests/api.integration.test.ts`

### Suite de Testes

```
✅ GET /health                      (1 teste)
✅ POST /api/v1/users              (5 testes)  
✅ GET /api/v1/users               (3 testes)
✅ GET /api/v1/users/:id           (3 testes)
✅ PUT /api/v1/users/:id           (3 testes)
✅ DELETE /api/v1/users/:id        (3 testes)
✅ PATCH /api/v1/users/:id/...     (2 testes)
✅ GET /api/v1/users/search/...    (2 testes)
✅ GET /api/v1/users/age-range     (1 teste)
✅ GET /api/v1/users/stats/count   (2 testes)
✅ GET /api/v1/users/active        (1 teste)
─────────────────────────────────────────────
Total: 35+ testes de integração
```

### O que é Testado

**✅ Funcionalidades:**
- Criar usuário com validações
- Listar usuários com paginação e filtros
- Buscar usuário por ID
- Atualizar dados de usuário
- Deletar usuário
- Deativar/Reativar usuário
- Buscar por email
- Filtrar por faixa de idade
- Contar usuários
- Status HTTP corretos
- Mensagens de erro

**✅ Validações:**
- Email válido
- Idade entre 18 e 120
- Email único
- Campos obrigatórios
- ID válido (MongoDB ObjectId)

**✅ Banco de Dados:**
- Criar registros
- Ler registros
- Atualizar registros
- Deletar registros
- Filtros e paginação
- Índices e constraints

---

## 📈 Coverage Report

Para gerar relatório de cobertura de código:

```bash
npm test -- --coverage
```

Isto gera um relatório mostrando qual % do código está coberto pelos testes.

Arquivo de saída: `backend/coverage/index.html`

---

## 🔄 Ciclo de Desenvolvimento

1. **Fazer mudança no código:**
   ```bash
   # Editar arquivo em src/
   vim src/services/UserService.ts
   ```

2. **Rodar testes em watch mode:**
   ```bash
   npm test:watch
   ```

3. **Ver resultado em tempo real** - testes re-rodam automaticamente ao salvar

4. **Corrigir bugs** se algum teste falhar

---

## 🎯 Boas Práticas

✅ **Sempre rodar testes antes de deploy:**
```bash
npm test
```

✅ **Manter testes limpos - cada teste**:
- Testa UMA coisa
- Não depende de outros testes
- Limpa dados antes de rodar (beforeEach)

✅ **Usar nomes descritivos:**
```javascript
it('✅ should create a new user successfully', async () => {
  // Bom - descreve o que testa

it('test user', async () => {
  // Ruim - muito genérico
```

✅ **Testar casos de sucesso E erro:**
```javascript
it('✅ should create user', async () => {...})
it('❌ should fail with invalid email', async () => {...})
```

---

## 🚀 CI/CD Integration

Para rodar testes automaticamente em GitHub/GitLab:

**.github/workflows/test.yml:**
```yaml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      mongodb:
        image: mongo:latest
        options: >-
          --health-cmd mongosh
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 27017:27017
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: cd backend && npm install && npm test
```

---

## 📚 Referências

- [Jest Documentation](https://jestjs.io)
- [Supertest API Testing](https://github.com/visionmedia/supertest)
- [MongoDB Docs](https://docs.mongodb.com)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

**Pronto! Testes configurados e prontos para rodar! 🎉**
