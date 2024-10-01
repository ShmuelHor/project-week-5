import express from 'express';
import { login, register, getAllGamesOfUser } from '../controllers/authController.js';
const router = express.Router();
router.route('/auth/register').post(register);
router.route('/auth/login').post(login);
router.route("/games").get(getAllGamesOfUser);
// router.route("/games").get(authMiddleware,getAllGamesOfUser);
export default router;
