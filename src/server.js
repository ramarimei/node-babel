import express from 'express';
import { connect } from './database';
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

server.post('/api/marketplaces', async (req, res) => {
  try {
    const { body } = req;
    // console.log(body);

    // check the body properties - name, description, owner
    if (
      !body.hasOwnProperty('name') ||
      !body.hasOwnProperty('description') ||
      !body.hasOwnProperty('owner')
    ) {
      return res.status(400).json({ error: 'Marketplace name, description, owner required' });
    }

    // check if the marketplace already exists
    const marketplaceExists = await Marketplaces.findOne({ name: body.name });
    // console.log(marketplaceExists);

    if (marketplaceExists != null){
      return res.status(400).json({error: 'Marketplace name already in use'});
    }

    // use the model to create a new marketplace
    const marketplace = new Marketplaces(body);
    console.log(marketplace);
    // save the marketplace
    await marketplace.save();

    //return 200 status and success message
    return res.status(201).json({
      success: true,
      data: marketplace
    });

  } catch (e) {
    console.error(e);
    return res.status(500).send(e);
  }
});
//Update route


server.use('*', (req, res) => {
  return res.status(404).json({ error: 'Route not found' });
});

server.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
