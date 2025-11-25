import { connect, disconnect } from 'mongoose';
import { config } from '../config/config';

export class DatabaseService {
  async connect(): Promise<void> {
    if (config.dbType === 'mongodb') {
      await this.connectMongoDB();
    } else if (config.dbType === 'firebase') {
      await this.connectFirebase();
    }
  }

  private async connectMongoDB(): Promise<void> {
    try {
      await connect(config.mongoUri);
      console.log('✅ Connected to MongoDB');
    } catch (error) {
      console.error('❌ Failed to connect to MongoDB:', error);
      throw error;
    }
  }

  private async connectFirebase(): Promise<void> {
    try {
      const admin = await import('firebase-admin');
      
      if (!admin.apps.length) {
        admin.initializeApp({
          projectId: config.firebaseProjectId,
          privateKey: config.firebasePrivateKey?.replace(/\\n/g, '\n'),
          clientEmail: config.firebaseClientEmail,
        } as any);
      }
      
      console.log('✅ Connected to Firebase');
    } catch (error) {
      console.error('❌ Failed to connect to Firebase:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (config.dbType === 'mongodb') {
      await disconnect();
      console.log('✅ Disconnected from MongoDB');
    }
  }
}
