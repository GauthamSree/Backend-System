import { Router } from 'express';
import controller from '../controllers/user.js'

const router = Router();

router.post('/register', controller.registerUser);
router.post('/token', controller.generateToken);

export default router;