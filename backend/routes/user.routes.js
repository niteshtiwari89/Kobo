import express from 'express';
import { signup, login, frontLogin, getAllUsers, deleteUserById, deleteProfile, logout, updateProfile, createAccountAdmin, loginAdmin, checkUsernameAvailability } from '../controllers/user.controllers.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// Admin routes
router.post('/createaccountadmin', createAccountAdmin);
router.post('/loginadmin', loginAdmin);


router.post('/signup', signup);
router.post('/login', login);
router.get('/check-username/:username', checkUsernameAvailability); // Username availability check
router.get('/', getAllUsers); // Protected route
router.post('/front-login', frontLogin); // Add frontend login route
router.delete('/:id', deleteUserById); // Protected route
router.delete('/delete', deleteProfile);
router.put('/update', authMiddleware, updateProfile);
router.post('/logout', logout); // Add logout route
export default router;                                                                    