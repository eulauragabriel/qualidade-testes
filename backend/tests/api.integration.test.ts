/**
 * 🧪 API Integration Tests - CRUD Operations
 * 
 * ⚠️  REQUIREMENTS:
 * 1. MongoDB deve estar conectado (local ou Atlas)
 * 2. Testar todas as operações CRUD em tempo real
 * 
 * Para rodar: npm test
 */

import request from 'supertest';
import { connect, disconnect, connection } from 'mongoose';
import app from '../src/app';
import { User } from '../src/models/User';

describe('🧪 CRUD API - Integration Tests com Banco de Dados Real', () => {
  beforeAll(async () => {
    // Get the test URI from environment (loaded by setup.ts)
    const TEST_DB_URI = process.env.MONGODB_TEST_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/crud-app-test';
    
    try {
      if (!connection.readyState) {
        await connect(TEST_DB_URI, {
          serverSelectionTimeoutMS: 10000,
          socketTimeoutMS: 45000,
        });
        console.log('\n✅ MongoDB Conectado:', TEST_DB_URI);
      }
    } catch (error) {
      console.error('\n❌ Erro ao conectar MongoDB');
      console.error('   Certifique-se de que MongoDB está rodando!');
      throw error;
    }
  }, 50000);

  afterAll(async () => {
    await disconnect();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  // ========== HEALTH CHECK ==========
  describe('✅ GET /health', () => {
    it('retorna status de saúde do servidor', async () => {
      const res = await request(app).get('/health');

      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ok');
      expect(res.body).toHaveProperty('timestamp');
      expect(res.body).toHaveProperty('environment');
    });
  });

  // ========== CREATE (POST) ==========
  describe('✅ POST /api/v1/users - Criar Usuário', () => {
    it('cria usuário com dados válidos', async () => {
      const res = await request(app)
        .post('/api/v1/users')
        .send({ name: 'João Silva', email: 'joao@test.com', age: 28 });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe('João Silva');
      expect(res.body.data.status).toBe('active');
      expect(res.body.data).toHaveProperty('_id');
    });

    it('rejeita email inválido', async () => {
      const res = await request(app)
        .post('/api/v1/users')
        .send({ name: 'João', email: 'invalid', age: 28 });

      expect(res.status).toBe(400);
    });

    it('rejeita idade menor que 18', async () => {
      const res = await request(app)
        .post('/api/v1/users')
        .send({ name: 'João', email: 'joao@test.com', age: 17 });

      expect(res.status).toBe(400);
    });

    it('rejeita email duplicado', async () => {
      await request(app)
        .post('/api/v1/users')
        .send({ name: 'João', email: 'joao@test.com', age: 28 });

      const res = await request(app)
        .post('/api/v1/users')
        .send({ name: 'Maria', email: 'joao@test.com', age: 30 });

      expect(res.status).toBe(409);
    });

    it('rejeita campos obrigatórios ausentes', async () => {
      const res = await request(app)
        .post('/api/v1/users')
        .send({ name: 'João' });

      expect(res.status).toBe(400);
    });
  });

  // ========== READ (GET) ==========
  describe('✅ GET /api/v1/users - Listar Usuários', () => {
    it('retorna lista vazia quando sem usuários', async () => {
      const res = await request(app).get('/api/v1/users');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toEqual([]);
      expect(res.body.pagination.total).toBe(0);
    });

    it('retorna todos os usuários criados', async () => {
      await request(app).post('/api/v1/users').send({
        name: 'João', email: 'joao@test.com', age: 28
      });
      await request(app).post('/api/v1/users').send({
        name: 'Maria', email: 'maria@test.com', age: 32
      });
      await request(app).post('/api/v1/users').send({
        name: 'Pedro', email: 'pedro@test.com', age: 25
      });

      const res = await request(app).get('/api/v1/users');

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(3);
      expect(res.body.pagination.total).toBe(3);
    });

    it('filtra usuários por status', async () => {
      const user1 = await request(app).post('/api/v1/users').send({
        name: 'João', email: 'joao@test.com', age: 28
      });

      await request(app).post('/api/v1/users').send({
        name: 'Maria', email: 'maria@test.com', age: 32
      });

      // Desativar um
      await request(app).patch(`/api/v1/users/${user1.body.data._id}/deactivate`);

      const res = await request(app).get('/api/v1/users?status=active');

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].status).toBe('active');
    });

    it('pagina corretamente os resultados', async () => {
      for (let i = 0; i < 15; i++) {
        await request(app).post('/api/v1/users').send({
          name: `User ${i}`, email: `user${i}@test.com`, age: 20 + i
        });
      }

      const res = await request(app).get('/api/v1/users?page=2&limit=10');

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(5);
      expect(res.body.pagination.page).toBe(2);
      expect(res.body.pagination.total).toBe(15);
    });
  });

  describe('✅ GET /api/v1/users/:id - Buscar por ID', () => {
    it('retorna usuário específico por ID', async () => {
      const created = await request(app).post('/api/v1/users').send({
        name: 'João', email: 'joao@test.com', age: 28
      });

      const res = await request(app).get(`/api/v1/users/${created.body.data._id}`);

      expect(res.status).toBe(200);
      expect(res.body.data._id).toBe(created.body.data._id);
      expect(res.body.data.name).toBe('João');
    });

    it('retorna 404 para ID inválido', async () => {
      const res = await request(app).get('/api/v1/users/invalid-id');

      expect(res.status).toBe(400);
    });

    it('retorna 404 para usuário inexistente', async () => {
      const res = await request(app).get('/api/v1/users/507f1f77bcf86cd799439011');

      expect(res.status).toBe(404);
    });
  });

  describe('✅ GET /api/v1/users/active - Usuários Ativos', () => {
    it('retorna apenas usuários ativos', async () => {
      const user1 = await request(app).post('/api/v1/users').send({
        name: 'João', email: 'joao@test.com', age: 28
      });

      await request(app).post('/api/v1/users').send({
        name: 'Maria', email: 'maria@test.com', age: 32
      });

      await request(app).patch(`/api/v1/users/${user1.body.data._id}/deactivate`);

      const res = await request(app).get('/api/v1/users/active');

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].name).toBe('Maria');
    });
  });

  describe('✅ GET /api/v1/users/search/by-email', () => {
    it('busca usuário por email', async () => {
      await request(app).post('/api/v1/users').send({
        name: 'João', email: 'joao@test.com', age: 28
      });

      const res = await request(app).get('/api/v1/users/search/by-email?email=joao@test.com');

      expect(res.status).toBe(200);
      expect(res.body.data.email).toBe('joao@test.com');
    });

    it('retorna 400 sem email parameter', async () => {
      const res = await request(app).get('/api/v1/users/search/by-email');

      expect(res.status).toBe(400);
    });
  });

  describe('✅ GET /api/v1/users/age-range', () => {
    it('filtra usuários por faixa de idade', async () => {
      await request(app).post('/api/v1/users').send({
        name: 'João', email: 'joao@test.com', age: 20
      });
      await request(app).post('/api/v1/users').send({
        name: 'Maria', email: 'maria@test.com', age: 30
      });
      await request(app).post('/api/v1/users').send({
        name: 'Pedro', email: 'pedro@test.com', age: 40
      });

      const res = await request(app).get('/api/v1/users/age-range?minAge=25&maxAge=35');

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].age).toBe(30);
    });
  });

  describe('✅ GET /api/v1/users/stats/count', () => {
    it('conta total de usuários', async () => {
      await request(app).post('/api/v1/users').send({
        name: 'João', email: 'joao@test.com', age: 28
      });
      await request(app).post('/api/v1/users').send({
        name: 'Maria', email: 'maria@test.com', age: 32
      });

      const res = await request(app).get('/api/v1/users/stats/count');

      expect(res.status).toBe(200);
      expect(res.body.count).toBe(2);
    });

    it('conta usuários por status', async () => {
      const user1 = await request(app).post('/api/v1/users').send({
        name: 'João', email: 'joao@test.com', age: 28
      });
      await request(app).post('/api/v1/users').send({
        name: 'Maria', email: 'maria@test.com', age: 32
      });

      await request(app).patch(`/api/v1/users/${user1.body.data._id}/deactivate`);

      const res = await request(app).get('/api/v1/users/stats/count?status=active');

      expect(res.status).toBe(200);
      expect(res.body.count).toBe(1);
    });
  });

  // ========== UPDATE (PUT) ==========
  describe('✅ PUT /api/v1/users/:id - Atualizar Usuário', () => {
    it('atualiza dados do usuário', async () => {
      const created = await request(app).post('/api/v1/users').send({
        name: 'João', email: 'joao@test.com', age: 28
      });

      const res = await request(app)
        .put(`/api/v1/users/${created.body.data._id}`)
        .send({ name: 'João Silva', age: 29 });

      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe('João Silva');
      expect(res.body.data.age).toBe(29);
      expect(res.body.data.email).toBe('joao@test.com');
    });

    it('rejeita email inválido na atualização', async () => {
      const created = await request(app).post('/api/v1/users').send({
        name: 'João', email: 'joao@test.com', age: 28
      });

      const res = await request(app)
        .put(`/api/v1/users/${created.body.data._id}`)
        .send({ email: 'invalid-email' });

      expect(res.status).toBe(400);
    });

    it('rejeita email duplicado na atualização', async () => {
      const user1 = await request(app).post('/api/v1/users').send({
        name: 'João', email: 'joao@test.com', age: 28
      });
      await request(app).post('/api/v1/users').send({
        name: 'Maria', email: 'maria@test.com', age: 32
      });

      const res = await request(app)
        .put(`/api/v1/users/${user1.body.data._id}`)
        .send({ email: 'maria@test.com' });

      expect(res.status).toBe(409);
    });

    it('rejeita idade fora do intervalo', async () => {
      const created = await request(app).post('/api/v1/users').send({
        name: 'João', email: 'joao@test.com', age: 28
      });

      const res = await request(app)
        .put(`/api/v1/users/${created.body.data._id}`)
        .send({ age: 150 });

      expect(res.status).toBe(400);
    });
  });

  // ========== DELETE ==========
  describe('✅ DELETE /api/v1/users/:id - Deletar Usuário', () => {
    it('deleta usuário existente', async () => {
      const created = await request(app).post('/api/v1/users').send({
        name: 'João', email: 'joao@test.com', age: 28
      });

      const deleteRes = await request(app).delete(`/api/v1/users/${created.body.data._id}`);

      expect(deleteRes.status).toBe(200);
      expect(deleteRes.body.success).toBe(true);

      // Verificar que foi realmente deletado
      const getRes = await request(app).get(`/api/v1/users/${created.body.data._id}`);
      expect(getRes.status).toBe(404);
    });

    it('retorna 404 ao deletar inexistente', async () => {
      const res = await request(app).delete('/api/v1/users/507f1f77bcf86cd799439011');

      expect(res.status).toBe(404);
    });

    it('retorna 400 com ID inválido', async () => {
      const res = await request(app).delete('/api/v1/users/invalid-id');

      expect(res.status).toBe(400);
    });
  });

  // ========== DEACTIVATE/REACTIVATE ==========
  describe('✅ PATCH /api/v1/users/:id/deactivate - Desativar', () => {
    it('desativa usuário ativo', async () => {
      const created = await request(app).post('/api/v1/users').send({
        name: 'João', email: 'joao@test.com', age: 28
      });

      const res = await request(app).patch(`/api/v1/users/${created.body.data._id}/deactivate`);

      expect(res.status).toBe(200);
      expect(res.body.data.status).toBe('inactive');
    });
  });

  describe('✅ PATCH /api/v1/users/:id/reactivate - Reativar', () => {
    it('reativa usuário inativo', async () => {
      const created = await request(app).post('/api/v1/users').send({
        name: 'João', email: 'joao@test.com', age: 28
      });

      await request(app).patch(`/api/v1/users/${created.body.data._id}/deactivate`);

      const res = await request(app).patch(`/api/v1/users/${created.body.data._id}/reactivate`);

      expect(res.status).toBe(200);
      expect(res.body.data.status).toBe('active');
    });
  });

  // ========== INTEGRAÇÃO COMPLETA ==========
  describe('✅ Integração Completa - Ciclo CRUD Completo', () => {
    it('realiza ciclo completo: Criar → Ler → Atualizar → Deletar', async () => {
      // CREATE
      const createRes = await request(app).post('/api/v1/users').send({
        name: 'Teste Usuario', email: 'teste@example.com', age: 30
      });
      expect(createRes.status).toBe(201);
      const userId = createRes.body.data._id;

      // READ
      const readRes = await request(app).get(`/api/v1/users/${userId}`);
      expect(readRes.status).toBe(200);
      expect(readRes.body.data.name).toBe('Teste Usuario');

      // UPDATE
      const updateRes = await request(app)
        .put(`/api/v1/users/${userId}`)
        .send({ name: 'Usuario Atualizado', age: 31 });
      expect(updateRes.status).toBe(200);
      expect(updateRes.body.data.name).toBe('Usuario Atualizado');

      // DEACTIVATE
      const deactivateRes = await request(app).patch(`/api/v1/users/${userId}/deactivate`);
      expect(deactivateRes.status).toBe(200);
      expect(deactivateRes.body.data.status).toBe('inactive');

      // REACTIVATE
      const reactivateRes = await request(app).patch(`/api/v1/users/${userId}/reactivate`);
      expect(reactivateRes.status).toBe(200);
      expect(reactivateRes.body.data.status).toBe('active');

      // DELETE
      const deleteRes = await request(app).delete(`/api/v1/users/${userId}`);
      expect(deleteRes.status).toBe(200);

      // Verificar deleção
      const finalRes = await request(app).get(`/api/v1/users/${userId}`);
      expect(finalRes.status).toBe(404);
    });
  });
});
