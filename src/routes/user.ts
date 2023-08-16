import { Router } from 'express';
import controller from '../controllers/user.js'

const router = Router();

router.post('/register', controller.registerUser);

export default router;