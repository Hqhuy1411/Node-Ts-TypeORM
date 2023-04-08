
import  express  from "express";
import { ErrorHandler } from '../app/middlewares/HandlerError'
import { AuthController } from "../app/controllers/AuthController";

const router = express.Router();
const authController = new AuthController;

router.post('/login',  ErrorHandler.catchErrors(authController.login));



export default router;