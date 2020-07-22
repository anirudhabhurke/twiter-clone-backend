import { Router } from 'express';
import { fetchUser, createUser, getAllUsers, updateUser, deleteUser } from '../controllers/user';

const router = Router();

router.param('userId', fetchUser);

router.post('/', createUser);

router.get('/', getAllUsers);

router.patch('/:userId', updateUser);

router.delete('/:userId', deleteUser);

export default router;
