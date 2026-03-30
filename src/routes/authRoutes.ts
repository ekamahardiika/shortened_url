import { Router } from "express";
import { 
    registerController,
    loginController,
    logoutController,
    userController
 } from "../controllers/authControllers";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

//Routes
router.post('/register', registerController);
router.post('/login', loginController);
router.post('/logout', authMiddleware, logoutController);
router.get('/user', authMiddleware, userController);

export default router;