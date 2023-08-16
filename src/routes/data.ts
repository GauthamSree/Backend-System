import { Router } from 'express';
import controller from '../controllers/data.js'

const router = Router();

router.post('/data', controller.postData);

export default router;