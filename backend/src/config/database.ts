import { connect, disconnect } from 'mongoose';
import { config } from '../config/config';

export class DatabaseService {
  async connect(): Promise<void> {
    await this.connectMongoDB();
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

  async disconnect(): Promise<void> {
    await disconnect();
    console.log('✅ Disconnected from MongoDB');
  }
}
