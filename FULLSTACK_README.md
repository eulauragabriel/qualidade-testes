# Full-Stack CRUD Application

Uma aplicação CRUD completa com React, TypeScript, Express.js e MongoDB/Firebase.

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18+ e npm
- MongoDB instalado (ou conta Firebase)

### Instalação

#### Backend

```bash
cd backend
npm install
cp .env.example .env
# Configure as variáveis de ambiente em .env
npm run build
npm start
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

O servidor backend rodará em `http://localhost:3000` e o frontend em `http://localhost:3001`.

## 📁 Estrutura do Projeto

```
projeto/
├── backend/                    # API Express.js
│   ├── src/
│   │   ├── config/            # Configurações e banco de dados
│   │   ├── controllers/       # Controladores de rota
│   │   ├── middleware/        # Validação e tratamento de erro
│   │   ├── models/            # Schemas Mongoose
│   │   ├── routes/            # Definição de rotas
│   │   ├── services/          # Lógica de negócio
│   │   └── index.ts           # Entrada do servidor
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── frontend/                   # React + Vite
│   ├── src/
│   │   ├── components/        # Componentes React
│   │   ├── services/          # Cliente API
│   │   ├── App.tsx            # Componente principal
│   │   ├── App.css            # Estilos globais
│   │   └── main.tsx           # Entrada React
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── .env.example
├── src/                       # Código original CRUD (testes)
├── tests/                     # Suite de testes original
└── README.md
```

## 🔧 Configuração do Banco de Dados

### MongoDB Local

1. Instale o MongoDB Community Edition
2. Inicie o serviço MongoDB
3. Configure em `backend/.env`:
   ```
   DB_TYPE=mongodb
   MONGODB_URI=mongodb://localhost:27017/crud-app
   ```

### Firebase

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com)
2. Gere uma chave privada em Project Settings → Service Accounts
3. Configure em `backend/.env`:
   ```
   DB_TYPE=firebase
   FIREBASE_PROJECT_ID=seu-id-aqui
   FIREBASE_PRIVATE_KEY=sua-chave-aqui
   FIREBASE_CLIENT_EMAIL=seu-email@seu-projeto.iam.gserviceaccount.com
   ```

## 📚 API REST

### Endpoints Disponíveis

#### Usuários

- `GET /api/v1/users` - Listar todos (com paginação)
- `GET /api/v1/users/:id` - Buscar por ID
- `GET /api/v1/users/active` - Listar ativos
- `GET /api/v1/users/search/by-email?email=...` - Buscar por email
- `GET /api/v1/users/age-range?minAge=18&maxAge=65` - Buscar por idade
- `GET /api/v1/users/stats/count` - Contar usuários
- `POST /api/v1/users` - Criar novo
- `PUT /api/v1/users/:id` - Atualizar
- `DELETE /api/v1/users/:id` - Deletar
- `PATCH /api/v1/users/:id/deactivate` - Desativar
- `PATCH /api/v1/users/:id/reactivate` - Reativar

### Exemplo de Requisição

```bash
# Criar usuário
curl -X POST http://localhost:3000/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "age": 30
  }'

# Listar usuários
curl http://localhost:3000/api/v1/users?page=1&limit=10

# Atualizar usuário
curl -X PUT http://localhost:3000/api/v1/users/123 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva Junior",
    "age": 31
  }'

# Deletar usuário
curl -X DELETE http://localhost:3000/api/v1/users/123
```

## 🎨 Features do Frontend

- **Lista de Usuários**: Visualizar todos com paginação e filtros
- **Criar Usuário**: Formulário com validação
- **Editar Usuário**: Atualizar informações
- **Deletar Usuário**: Remover com confirmação
- **Ativar/Desativar**: Controlar status de usuários
- **Filtros**: Por status (ativo/inativo) e itens por página
- **Validação**: Client-side e server-side

## 🧪 Testes

### Backend

```bash
cd backend
npm install
npm test
```

### Frontend

```bash
cd frontend
npm install
npm test
```

### Testes Originais (Pairwise, AI-driven, etc.)

```bash
# Na raiz do projeto
npm install
npm test
```

## 🔐 Segurança

- Validação de entrada em todos os endpoints
- Schemas Joi para validação de dados
- Helmet para headers de segurança
- CORS configurado
- TypeScript strict mode habilitado
- Tratamento centralizado de erros

## 📊 Validação de Dados

### Usuário

- **Name**: 1-100 caracteres, obrigatório
- **Email**: Formato válido, único, obrigatório
- **Age**: 18-120 anos, inteiro, obrigatório
- **Status**: 'active' ou 'inactive' (padrão: active)

## 🚢 Deploy

### Backend (Heroku, Railway, etc.)

```bash
cd backend
npm install
npm run build
```

Variáveis de ambiente necessárias: PORT, NODE_ENV, DB_TYPE, MONGODB_URI (ou credenciais Firebase), CORS_ORIGIN

### Frontend (Vercel, Netlify, etc.)

```bash
cd frontend
npm install
npm run build
```

Será gerado um diretório `dist/` pronto para deploy.

## 📝 Documentação Adicional

- [README Backend](./backend/README.md) - Detalhes da API
- [README Frontend](./frontend/README.md) - Guia do React
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Guia de deploy
- [TESTING.md](./TESTING.md) - Estratégias de teste

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 📧 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.

---

**Desenvolvido com ❤️ usando TypeScript, React e Express**
