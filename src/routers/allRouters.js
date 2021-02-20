import { Router } from 'express';
const router = Router();



router.get('/allRouters', (req, res) => {
    return res.send('allRouters!!');
});












export default router;