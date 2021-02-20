import express from 'express';
import { connect } from './database';
import marketplacesRouter from './routers/marketplacesRouter';
// import Marketplaces from './models/marketplaceModel';

connect();

const PORT = 5000;
const server = express();

server.use(express.json());
server.use('/api',marketplacesRouter);
server.use('/api/marketplaces', marketplacesRouter)

server.use('*', (req, res) => {
  return res.status(404).json({ error: 'Route not found' });
});

server.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
