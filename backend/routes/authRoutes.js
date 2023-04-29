import express from 'express';
import {
	userLogin,
	userLogout,
	userMe,
} from '../controllers/authController.js';

const router = express.Router();

router.get('/me', userMe);
router.post('/login', userLogin);
router.delete('/logout', userLogout);

export default router;
