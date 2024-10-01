import express, { Router } from 'express';
import {login ,register} from '../controllers/authController.js'
import authMiddleware from '../middoleware/authMiddleware.js';

const router:Router = express.Router();

router.route('/user/register').post(register);
router.route('/user/login').post(login);

// router.route("/a").get(authMiddleware,a);
console.log("firstName");


export default router;