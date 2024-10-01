import express from 'express';
import { login, register } from '../controllers/authController.js';
const router = express.Router();
router.route('/user/register').post(register);
router.route('/user/login').post(login);
// router.route("/a").get(authMiddleware,a);
console.log("firstName");
export default router;
