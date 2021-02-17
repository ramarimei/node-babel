import express from 'express';
import { connect } from './database'
import Marketplaces from './models/marketplaceModel';

connect();

const PORT = 5000;
const server = express();

server.use(express.json());


server.get('/api/marketplaces', async (req, res) => {
    try {
        const marketplaces = await Marketplaces.find({});
        console.log(marketplaces); // should be an array of objects

        return res.json(marketplaces);
    } catch (e) {
        console.error(e);
        return res.status(500).send(e);
    }
});

// server.post('/api/marketplaces', )

server.use('*', (req,res) =>{
    return res.status(404).json({error: 'Route not found' });
});

server.listen(PORT, () => {
    console.log(`server is listening`);
});
