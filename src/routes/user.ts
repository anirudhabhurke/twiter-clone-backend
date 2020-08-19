import { Router } from 'express';
import { postSignup, postLogin, postLogout, isSignedIn } from '../controllers/auth';
import { body } from 'express-validator';

const router = Router();

router.post(
      '/signup',
      [
            body('email', 'Invalid email').isEmail().normalizeEmail().trim(),
            body('password', 'Invalid Password').isLength({ min: 5, max: 32 }).isAlphanumeric(),
            body('username').isAlphanumeric().trim(),
      ],
      postSignup
);

router.post(
      '/login',
      [
            body('email', 'Invalid email').isEmail().normalizeEmail().trim(),
            body('password', 'Invalid Password').isLength({ min: 5, max: 32 }).isAlphanumeric(),
      ],
      postLogin
);

router.post('/logout', isSignedIn, postLogout);

export default router;
