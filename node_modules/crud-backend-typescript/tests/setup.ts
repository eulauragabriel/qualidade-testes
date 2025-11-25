import dotenv from 'dotenv';

// Load .env.test or .env
dotenv.config({ path: '.env.test' });
dotenv.config({ path: '.env' });

// Set test environment
process.env.NODE_ENV = 'test';
process.env.DB_TYPE = process.env.TEST_DB_TYPE || 'mongodb';
process.env.MONGODB_URI = process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/crud-app-test';

// Jest timeout
jest.setTimeout(30000);

// Suppress console logs during tests (comment out if you want to see logs)
if (process.env.DEBUG_TESTS !== 'true') {
  global.console = {
    ...console,
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    // Keep error for debugging
  } as any;
}

export {};
