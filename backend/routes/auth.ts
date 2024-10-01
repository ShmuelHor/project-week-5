import express, { Router } from 'express';
import {login ,register,getAllGamesOfUser} from '../controllers/authController.js'
import authMiddleware from '../middoleware/authMiddleware.js';

const router:Router = express.Router();

router.route('/auth/register').post(register);
router.route('/auth/login').post(login);
router.route("/games").get(getAllGamesOfUser);
// router.route("/games").get(authMiddleware,getAllGamesOfUser);


export default router;