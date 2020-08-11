import { Router } from 'express';
import { postSignup, postLogin, postLogout } from '../controllers/auth';

const router = Router();

router.post('/signup', postSignup);

router.post('/login', postLogin);

router.post('/logout', postLogout);

export default router;
