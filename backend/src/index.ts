import { config } from './config/config';
import { DatabaseService } from './config/database';
import app from './app';

const dbService = new DatabaseService();

// Iniciar servidor
const startServer = async () => {
  try {
    // Conectar ao banco de dados
    await dbService.connect();

    const port = config.port;
    app.listen(port, () => {
      console.log(`\n✅ Server running on http://localhost:${port}`);
      console.log(`📚 API available at http://localhost:${port}${config.apiPrefix}`);
      console.log(`🗄️  Database type: ${config.dbType}`);
      console.log(`🌍 CORS origin: ${config.corsOrigin}\n`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('\n🛑 SIGTERM received, shutting down gracefully...');
  await dbService.disconnect();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('\n🛑 SIGINT received, shutting down gracefully...');
  await dbService.disconnect();
  process.exit(0);
});

startServer();

export default app;
