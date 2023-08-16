import { Router } from 'express';
import controller from '../controllers/data.js'
import verifyToken from '../middlewares/auth.js';

const router = Router();

router.post('/data', verifyToken, controller.postData);
router.get('/data/:key', verifyToken, controller.getDataByKey);
router.put('/data/:key', verifyToken, controller.updateDataByKey);
router.delete('/data/:key', verifyToken, controller.deleteDataByKey);

export default router;