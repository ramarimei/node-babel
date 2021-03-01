import express, { Router } from 'express';
import morgan from 'morgan';
import { connect } from './database';
import authRouter from './routers/authRouter';
import marketplacesRouter from './routers/marketplacesRouter';
import errorHandler from './middleware/errorHandler';
import Marketplaces from './models/marketplaceModel';
import authMiddleware from './middleware/authMiddleware';

connect();

const PORT = 5000;
const server = express();

server.use(express.json());
server.use(morgan('dev'));
server.use('/auth',authRouter);
server.use('/api',marketplacesRouter);
server.use('/api/marketplaces', marketplacesRouter(Router, Marketplaces));

server.use('*', (req, res) => {
  return res.status(404).json({ error: 'Route not found' });
});
server.use(errorHandler);

server.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
