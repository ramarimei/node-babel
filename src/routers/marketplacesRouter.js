import { Router } from 'express';
import Marketplaces from '../models/marketplaceModel'
const router = Router();

router.get('/marketplacesRouter', (req, res) => {
    return res.send('marketplaces_router!!!!');
});


router.get('/', async (req, res) => {
    try {
      const marketplaces = await Marketplaces.find({});
      console.log(marketplaces); // should be an array of objects
  
      return res.json(marketplaces);
    } catch (e) {
      console.error(e);
      return res.status(500).send(e);
    }
  });
  
  router.post('/', async (req, res) => {
    try {
      const { body } = req;
  
      // check the body properties - name, description, owner
      if (
        !body.hasOwnProperty('name') ||
        !body.hasOwnProperty('description') ||
        !body.hasOwnProperty('owner')
      ) {
        return res
          .status(400)
          .json({ error: 'Marketplace name, description, owner required' });
      }
      // check if the marketplace already exists
      const marketplaceExists = await Marketplaces.findOne({ name: body.name });
      // console.log(marketplaceExists);
      if (marketplaceExists != null) {
        return res.status(400).json({ error: 'Marketplace name already in use' });
      }
  
      // use the model to create a new marketplace
      const marketplace = new Marketplaces(body);
      console.log(marketplace);
      // save the marketplace
      await marketplace.save();
  
      //return 200 status and success message
      return res.status(201).json({
        success: true,
        data: marketplace,
      });
    } catch (e) {
      console.error(e);
      return res.status(500).send(e);
    }
  });
  //Update route
  router.put('/:id', async (req, res) => {
    try {
      const { body } = req;
      const { id } = req.params;
      console.log(id);
  
      // check :id is not undefined
      if(!id){
        return res.status(400).json({error: 'Marketplace id parameter required'});
      }
      //check body properties - name, description, owner
      if (
        !body.hasOwnProperty('name') ||
        !body.hasOwnProperty('description') ||
        !body.hasOwnProperty('owner')
      ) {
        return res
          .status(400)
          .json({ error: 'Marketplace name, description, owner required' });
      }
  
      const marketplace = await Marketplaces.findByIdAndUpdate(id, body, { new: true}).lean();
      delete marketplace.__v;
  
      console.log(marketplace);
  
      return res.status(200).json({
          success: true,
          data: marketplace
      });
  
    } catch (e) {
      console.error(e);
  
      if(e.kind == 'ObjectId' && e.path == '_id'){
        return res.status(400).json({ error: 'Invalid id parameter' });
      }
      return res.status(500).send(e);
    }
  });
  
  //Delete 
  router.delete('/:id', async (req, res) => {
  try {
      const { id } = req.params;
  
      await Marketplaces.findByIdAndDelete(id);
  
      return res.json({ success: true });
  } catch (e) {
      console.error(e);
      return res.status(500).send(e);
  }
  });

  export default router;








