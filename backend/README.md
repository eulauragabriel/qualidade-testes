# Backend API - README

Express.js REST API para gerenciamento de usuários com MongoDB/Firebase.

## 📋 Estrutura

```
backend/
├── src/
│   ├── config/
│   │   ├── config.ts          # Environment configuration
│   │   └── database.ts        # Database connection service
│   ├── controllers/
│   │   └── UserController.ts  # HTTP request handlers
│   ├── middleware/
│   │   ├── validation.ts      # Input validation (Joi)
│   │   └── errorHandler.ts    # Error handling
│   ├── models/
│   │   └── User.ts            # Mongoose schema
│   ├── routes/
│   │   └── users.ts           # API endpoints
│   ├── services/
│   │   └── UserService.ts     # Business logic
│   ├── index.ts               # Server entry point
│   ├── tsconfig.json
│   ├── package.json
│   └── .env.example
```

## 🚀 Setup

### 1. Instalação
```bash
npm install
```

### 2. Configuração
```bash
cp .env.example .env
# Edit .env with your settings
```

### 3. Build & Run
```bash
npm run build
npm start
```

O servidor rodará em `http://localhost:3000`.

## 🔧 Variáveis de Ambiente

```env
# Server
PORT=3000
NODE_ENV=development

# Database Type
DB_TYPE=mongodb          # ou firebase

# MongoDB
MONGODB_URI=mongodb://localhost:27017/crud-app

# Firebase
FIREBASE_PROJECT_ID=your-id
FIREBASE_PRIVATE_KEY=your-key
FIREBASE_CLIENT_EMAIL=your-email

# API
CORS_ORIGIN=http://localhost:3001
API_PREFIX=/api/v1

# Validation
MIN_AGE=18
MAX_AGE=120
```

## 📡 API Endpoints

### Base URL
```
http://localhost:3000/api/v1
```

### Users

#### List Users (Paginated)
```http
GET /users?page=1&limit=10&status=active
```

**Response:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "pages": 5
  }
}
```

#### Get User by ID
```http
GET /users/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30,
    "status": "active",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
}
```

#### Get Active Users
```http
GET /users/active?page=1&limit=10
```

#### Search by Email
```http
GET /users/search/by-email?email=john@example.com
```

#### Filter by Age Range
```http
GET /users/age-range?minAge=25&maxAge=35
```

#### Count Users
```http
GET /users/stats/count?status=active
```

**Response:**
```json
{
  "success": true,
  "count": 42,
  "status": "active"
}
```

#### Create User
```http
POST /users
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "age": 28
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": { ... }
}
```

**Status Code:** `201 Created`

#### Update User
```http
PUT /users/:id
Content-Type: application/json

{
  "name": "Jane Doe",
  "age": 29
}
```

#### Delete User
```http
DELETE /users/:id
```

**Response:**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

#### Deactivate User
```http
PATCH /users/:id/deactivate
```

#### Reactivate User
```http
PATCH /users/:id/reactivate
```

### Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "development",
  "dbType": "mongodb"
}
```

## 🧪 Testing

### Run Tests

```bash
# Run all tests
npm test

# Watch mode - Re-run on file changes
npm test:watch

# With coverage report
npm test -- --coverage
```

### Test Setup

Tests use a separate test database: `crud-app-test`

**Configuration:**
1. Copy `.env.test.example` to `.env.test` (optional)
2. Set `MONGODB_TEST_URI` in `.env.test` or `.env`
3. Ensure MongoDB is running
4. Run `npm test`

### Test Structure

**File:** `backend/tests/api.integration.test.ts`

**Coverage:**
- ✅ Health check endpoint
- ✅ Create user (success and error cases)
- ✅ Get all users (list, filter by status)
- ✅ Get user by ID (valid ID, invalid format, not found)
- ✅ Update user (success, validation errors, duplicate email)
- ✅ Delete user (success, not found, invalid format)
- ✅ Deactivate/Reactivate user
- ✅ Search by email
- ✅ Filter by age range
- ✅ Count users (total and by status)
- ✅ Get active users

**Total Tests:** 35+ integration tests

### Test Database

Tests automatically:
1. Connect to test database
2. Clean database before each test
3. Test all CRUD operations
4. Validate error responses
5. Disconnect after all tests

**Note:** Test database is independent from development database

## 📦 Project Structure

### Controllers (`controllers/`)
Responsáveis por lidar com requisições HTTP:
- Parse request parameters
- Call services
- Return formatted responses
- Handle HTTP status codes

### Services (`services/`)
Contêm lógica de negócio:
- Validação
- Database queries
- Business rules
- Error handling

### Models (`models/`)
Definem schemas de dados:
- Mongoose schemas
- Validation rules
- Indices
- Relationships

### Middleware (`middleware/`)
Processam requisições/respostas:
- Input validation
- Error handling
- Logging
- Authentication (expandable)

### Routes (`routes/`)
Mapeiam endpoints para controllers:
- HTTP methods
- URL paths
- Middleware chain
- Controller methods

### Config (`config/`)
Gerenciam configuração:
- Environment variables
- Database connection
- Feature flags

## 🔐 Error Handling

Todos os erros seguem um padrão consistente:

```json
{
  "error": "User not found",
  "status": 404,
  "details": { }
}
```

**HTTP Status Codes:**
- `200 OK` - Success
- `201 Created` - Resource created
- `400 Bad Request` - Validation error
- `404 Not Found` - Resource not found
- `409 Conflict` - Email already exists
- `500 Internal Server Error` - Server error

## 🗄️ Database Schemas

### User Schema
```typescript
{
  _id: ObjectId,
  name: String (1-100 chars),
  email: String (unique, format),
  age: Number (18-120),
  status: Enum['active', 'inactive'],
  createdAt: Date,
  updatedAt: Date
}
```

**Indices:**
- `email` (unique)
- `status`
- `age`

## 🔌 Middleware

### Validation Middleware
Valida entrada usando Joi schemas:
```typescript
router.post('/users', 
  validate(createUserSchema), 
  controller.create
);
```

### Error Handler
Centraliza tratamento de erros:
```typescript
app.use(errorHandler);
```

## 📊 Logging

Morgan registra todas as requisições:
```
GET /api/v1/users 200 5ms
POST /api/v1/users 201 10ms
DELETE /api/v1/users/:id 200 8ms
```

## 🔒 Security Features

- **Helmet**: HTTP header security
- **CORS**: Cross-origin protection
- **Validation**: Input validation com Joi
- **TypeScript**: Type-safe code
- **Error Handling**: Sem exposição de informações sensíveis

## 🚢 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment for Production
```env
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://...
CORS_ORIGIN=https://yourdomain.com
```

## 📈 Performance

- **Pagination**: Limite de queries
- **Indexing**: MongoDB indices otimizados
- **Error Handling**: Fast-fail on validation
- **Response Compression**: Helmet headers

## 🔄 Development

### Watch Mode
```bash
npm run dev
```

### Debug Mode
```bash
DEBUG=* npm start
```

## 📚 API Documentation

Para documentação interativa, considere adicionar:
- Swagger/OpenAPI
- Postman collection
- GraphQL (alternativa)

## 🐛 Troubleshooting

### Cannot connect to MongoDB
- Verifique se MongoDB está rodando
- Confirme MONGODB_URI está correto
- Check firewall/network access

### Port already in use
```bash
# Linux/Mac
lsof -i :3000 | kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### CORS errors
- Check CORS_ORIGIN in .env
- Verify frontend URL matches
- Check browser console for actual error

## 🎯 Best Practices

✅ Always validate input
✅ Use environment variables
✅ Handle errors consistently
✅ Log important events
✅ Use TypeScript strict mode
✅ Test business logic
✅ Use meaningful error messages
✅ Paginate large datasets

## 📖 Further Reading

- [Express.js Documentation](https://expressjs.com)
- [Mongoose Documentation](https://mongoosejs.com)
- [Joi Validation](https://joi.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## 📄 License

MIT

---

**Version:** 1.0.0
**Last Updated:** 2024
