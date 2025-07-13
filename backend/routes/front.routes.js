import express from 'express';
import { frontLogin } from '../controllers/front.controllers.js';

const router = express.Router();

router.post('/login', frontLogin);

export default router;