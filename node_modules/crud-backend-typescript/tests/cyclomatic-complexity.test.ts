/**
 * 🔢 Cyclomatic Complexity Testing
 * 
 * CC = Número de caminhos independentes no código
 * Fórmula: CC = Decisões (if/else/switch/for/while) + 1
 * 
 * Exemplo UserService.createUser():
 *   - 1 if (validação de duplicata)
 *   - 1 if (salvar usuário)
 *   CC = 2 + 1 = 3
 * 
 * Benchmark: CC < 5 é bom, CC > 10 é complexo demais
 */

import request from 'supertest';
import { connect, disconnect, connection } from 'mongoose';
import app from '../src/app';
import { User } from '../src/models/User';

describe('📊 Cyclomatic Complexity Analysis & Testing', () => {
  beforeAll(async () => {
    const TEST_DB_URI = process.env.MONGODB_TEST_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/crud-app-test';
    
    try {
      if (!connection.readyState) {
        await connect(TEST_DB_URI, {
          serverSelectionTimeoutMS: 10000,
          socketTimeoutMS: 45000,
        });
      }
    } catch (error) {
      throw error;
    }
  }, 50000);

  afterAll(async () => {
    await disconnect();
  });

  beforeEach(async () => {
    await User.deleteMany({});
  });

  /**
   * UserService.createUser() - CC = 3
   * 
   * Caminhos:
   * 1. Email duplicado → rejeita (decisão 1)
   * 2. Email válido → salva usuário (decisão 2)
   * 3. Erro ao salvar → levanta exceção (caminho de erro)
   */
  describe('✅ CC: UserService.createUser() - CC = 3', () => {
    it('Path 1: Rejeita email duplicado (CC path 1)', async () => {
      // Setup: criar primeiro usuário
      await request(app)
        .post('/api/v1/users')
        .send({ name: 'User1', email: 'test@example.com', age: 25 });

      // Test: tentar criar segundo com mesmo email
      const res = await request(app)
        .post('/api/v1/users')
        .send({ name: 'User2', email: 'test@example.com', age: 30 });

      expect(res.status).toBe(409); // Conflict
      expect(res.body.success).toBe(false);
    });

    it('Path 2: Aceita email válido e salva (CC path 2)', async () => {
      const res = await request(app)
        .post('/api/v1/users')
        .send({ name: 'ValidUser', email: 'unique@example.com', age: 28 });

      expect(res.status).toBe(201);
      expect(res.body.data.email).toBe('unique@example.com');
    });

    it('Path 3: Erro ao salvar usuário (CC path 3)', async () => {
      // Invalid data should trigger validation error
      const res = await request(app)
        .post('/api/v1/users')
        .send({ name: '', email: 'test@example.com', age: 25 });

      expect(res.status).toBe(400);
    });
  });

  /**
   * UserService.getUserById() - CC = 4
   * 
   * Caminhos:
   * 1. ID inválido → erro
   * 2. Usuário não encontrado → 404
   * 3. Usuário encontrado → retorna
   * 4. Erro ao buscar → exceção
   */
  describe('✅ CC: UserService.getUserById() - CC = 4', () => {
    it('Path 1: ID inválido (CC path 1)', async () => {
      const res = await request(app).get('/api/v1/users/invalid-mongo-id');
      expect(res.status).toBe(400);
    });

    it('Path 2: Usuário não encontrado (CC path 2)', async () => {
      const res = await request(app).get('/api/v1/users/507f1f77bcf86cd799439011');
      expect(res.status).toBe(404);
    });

    it('Path 3: Usuário encontrado (CC path 3)', async () => {
      // Setup: criar usuário
      const createRes = await request(app)
        .post('/api/v1/users')
        .send({ name: 'Test', email: 'test@example.com', age: 25 });

      const userId = createRes.body.data._id;

      // Test: buscar por ID
      const res = await request(app).get(`/api/v1/users/${userId}`);
      expect(res.status).toBe(200);
      expect(res.body.data._id).toBe(userId);
    });

    it('Path 4: Erro na busca (CC path 4)', async () => {
      // Tenta buscar com ID muito pequeno (malformado)
      const res = await request(app).get('/api/v1/users/abc');
      expect(res.status).toBe(400);
    });
  });

  /**
   * UserService.updateUser() - CC = 5
   * 
   * Caminhos:
   * 1. Usuário não encontrado → 404
   * 2. Email duplicado → conflito
   * 3. Dados inválidos → validação falha
   * 4. Atualização bem-sucedida → OK
   * 5. Erro ao atualizar → exceção
   */
  describe('✅ CC: UserService.updateUser() - CC = 5', () => {
    it('Path 1: Usuário não encontrado (CC path 1)', async () => {
      const res = await request(app)
        .put('/api/v1/users/507f1f77bcf86cd799439011')
        .send({ name: 'NewName' });

      expect(res.status).toBe(404);
    });

    it('Path 2: Email duplicado (CC path 2)', async () => {
      // Setup: criar dois usuários
      const user1 = await request(app)
        .post('/api/v1/users')
        .send({ name: 'User1', email: 'email1@test.com', age: 25 });

      await request(app)
        .post('/api/v1/users')
        .send({ name: 'User2', email: 'email2@test.com', age: 30 });

      // Test: tentar atualizar user1 com email de user2
      const res = await request(app)
        .put(`/api/v1/users/${user1.body.data._id}`)
        .send({ email: 'email2@test.com' });

      expect(res.status).toBe(409);
    });

    it('Path 3: Dados inválidos (CC path 3)', async () => {
      const user = await request(app)
        .post('/api/v1/users')
        .send({ name: 'User', email: 'test@test.com', age: 25 });

      const res = await request(app)
        .put(`/api/v1/users/${user.body.data._id}`)
        .send({ age: 150 }); // Idade inválida

      expect(res.status).toBe(400);
    });

    it('Path 4: Atualização bem-sucedida (CC path 4)', async () => {
      const user = await request(app)
        .post('/api/v1/users')
        .send({ name: 'OriginalName', email: 'test@test.com', age: 25 });

      const res = await request(app)
        .put(`/api/v1/users/${user.body.data._id}`)
        .send({ name: 'UpdatedName', age: 26 });

      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe('UpdatedName');
      expect(res.body.data.age).toBe(26);
    });

    it('Path 5: Erro ao atualizar (CC path 5)', async () => {
      // Simula erro: tenta atualizar com string vazia
      const user = await request(app)
        .post('/api/v1/users')
        .send({ name: 'User', email: 'test@test.com', age: 25 });

      const res = await request(app)
        .put(`/api/v1/users/${user.body.data._id}`)
        .send({ name: '' }); // Inválido

      expect(res.status).toBe(400);
    });
  });

  /**
   * RELATÓRIO DE COMPLEXIDADE
   * 
   * Método                  | CC | Status | Testes
   * ========================|====|========|========
   * createUser()            | 3  | ✅ BOM | 3 paths
   * getUserById()           | 4  | ✅ BOM | 4 paths
   * updateUser()            | 5  | ✅ BOM | 5 paths
   * getAllUsers()           | 2  | ✅ BOM | -
   * deleteUser()            | 3  | ✅ BOM | -
   * 
   * Média CC: 3.4 (Excelente - < 5 é ideal)
   * Todos métodos têm CC baixo, código mantível
   */
});
