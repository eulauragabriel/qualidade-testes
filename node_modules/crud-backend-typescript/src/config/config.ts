import dotenv from 'dotenv';

// Carregar .env.test em modo de testes
if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: '.env.test' });
} else {
  dotenv.config();
}

export const config = {
  // Server
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',

  // Database
  dbType: (process.env.DB_TYPE || 'mongodb') as 'mongodb' | 'firebase',
  mongoUri: process.env.NODE_ENV === 'test' 
    ? (process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/crud-app-test')
    : (process.env.MONGODB_URI || 'mongodb://localhost:27017/crud-app'),
  
  // Firebase
  firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
  firebasePrivateKey: process.env.FIREBASE_PRIVATE_KEY,
  firebaseClientEmail: process.env.FIREBASE_CLIENT_EMAIL,

  // API
  apiPrefix: '/api/v1',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3001',

  // Validation
  minAge: 18,
  maxAge: 120,
};
