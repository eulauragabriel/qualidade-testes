# Guia de Deployment

Este documento descreve como fazer deploy da aplicação CRUD em diferentes plataformas.

## Heroku

### Backend

1. **Prepare o projeto**
   ```bash
   cd backend
   ```

2. **Create Procfile**
   ```
   web: npm run build && npm start
   ```

3. **Deploy**
   ```bash
   heroku login
   heroku create your-app-name-api
   heroku config:set DB_TYPE=mongodb
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set CORS_ORIGIN=https://your-frontend-url
   git push heroku main
   ```

### Frontend

1. **Configure variáveis de ambiente**
   ```bash
   cd frontend
   ```

2. **Build**
   ```bash
   npm run build
   ```

3. **Deploy (Vercel / Netlify)**
   - Conecte seu repositório GitHub
   - Configure variável: `VITE_API_BASE_URL=https://your-backend-url/api/v1`
   - Deploy automático

## Railway.app

### Backend

1. **Connect GitHub**
   - Vá para railway.app e conecte sua conta GitHub

2. **Create new project**
   - Selecione "GitHub repo"
   - Aponte para a pasta `backend`

3. **Environment Variables**
   - DB_TYPE = mongodb
   - MONGODB_URI = (sua conexão MongoDB)
   - CORS_ORIGIN = (sua URL frontend)
   - NODE_ENV = production

4. **Deploy**
   - Railway faz deploy automático

### Frontend

1. **Vercel**
   ```bash
   npm i -g vercel
   cd frontend
   vercel deploy --prod
   ```

2. **Configure**
   - VITE_API_BASE_URL = (sua URL backend)

## Docker

### Backend Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### Frontend Dockerfile

```dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:7
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password
    volumes:
      - mongodb_data:/data/db

  backend:
    build:
      context: ./backend
    ports:
      - "3000:3000"
    environment:
      DB_TYPE: mongodb
      MONGODB_URI: mongodb://admin:password@mongodb:27017/crud-app
      CORS_ORIGIN: http://localhost:3001
      NODE_ENV: production
    depends_on:
      - mongodb

  frontend:
    build:
      context: ./frontend
    ports:
      - "3001:80"
    environment:
      VITE_API_BASE_URL: http://localhost:3000/api/v1
    depends_on:
      - backend

volumes:
  mongodb_data:
```

**Deploy com Docker Compose:**
```bash
docker-compose up -d
```

## AWS

### Backend (Elastic Beanstalk)

```bash
cd backend

# Create .ebextensions/node.config
mkdir -p .ebextensions
cat > .ebextensions/node.config << EOF
option_settings:
  aws:elasticbeanstalk:container:nodejs:
    NodeVersion: 18.x
  aws:autoscaling:launchconfiguration:
    IamInstanceProfile: aws-elasticbeanstalk-ec2-role
EOF

# Deploy
eb init
eb create prod-environment
eb deploy
```

### Frontend (S3 + CloudFront)

```bash
cd frontend
npm run build

# Upload to S3
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

## Variáveis de Ambiente por Plataforma

### Heroku
```
NODE_ENV=production
PORT=dynamically assigned
DB_TYPE=mongodb
MONGODB_URI=<your_mongodb>
CORS_ORIGIN=https://your-frontend.herokuapp.com
```

### Railway
```
NODE_ENV=production
DB_TYPE=mongodb
MONGODB_URI=<your_mongodb>
CORS_ORIGIN=<your_frontend_url>
```

### Vercel (Frontend)
```
VITE_API_BASE_URL=https://your-backend.com/api/v1
```

### AWS (Backend)
```
NODE_ENV=production
RDS_DB_NAME=cruddb
RDS_HOSTNAME=<rds_endpoint>
RDS_PASSWORD=<password>
RDS_USERNAME=admin
```

## Monitoramento e Logs

### Heroku
```bash
# Ver logs
heroku logs --tail

# Restart
heroku restart
```

### Railway
```bash
# Logs automáticos no dashboard
```

### Docker
```bash
# Ver logs
docker-compose logs -f backend

# Acessar container
docker-compose exec backend sh
```

## Health Checks

Todos os endpoints:
- Backend: `GET http://localhost:3000/health`
- Frontend: Healthcheck automático do servidor

## Backup

### MongoDB
```bash
# Backup local
mongodump --uri="mongodb://user:password@host/dbname" --out=./backup

# Restore
mongorestore ./backup
```

### Firebase
- Ative backups no Firebase Console
- Exporte dados regularmente

## Troubleshooting

### Backend não conecta ao banco
1. Verificar MONGODB_URI
2. Verificar credenciais
3. Verificar firewall (MongoDB precisa de porta 27017)

### CORS errors no frontend
1. Verificar CORS_ORIGIN em backend/.env
2. Certificar que frontend URL está correta

### Build fails
1. Limpar `node_modules` e reinstalar
2. Verificar versão Node.js compatível

---

Para mais informações, consulte os READMEs específicos de cada serviço.
