import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { config } from './config/config';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import userRoutes from './routes/users';

const app = express();

// Middleware de segurança e logging
app.use(helmet());
app.use(morgan('combined'));
app.use(cors({
  origin: config.corsOrigin,
  credentials: true,
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
  });
});

// API Routes
app.use(`${config.apiPrefix}/users`, userRoutes);

// 404 Handler
app.use(notFoundHandler);

// Error Handler (deve ser o último middleware)
app.use(errorHandler);

export default app;
