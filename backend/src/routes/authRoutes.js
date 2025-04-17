import express from 'express';
import { signup, login,verifyotp,resetPassword, getCurrentUser, logout } from '../controllers/authController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/verifyotp', verifyotp);
router.post('/login', login);
router.get('/logout', logout);
router.post('/resetpassword', authMiddleware, resetPassword);
router.get('/getcurrentuser', authMiddleware, getCurrentUser);

export default router;