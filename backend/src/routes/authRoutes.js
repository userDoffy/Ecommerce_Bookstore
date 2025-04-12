import express from 'express';
import { signup, login,verifyotp,resetPassword } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/verifyotp', verifyotp);
router.post('/login', login);
router.post('/resetpassword', authMiddleware, resetPassword);

export default router;