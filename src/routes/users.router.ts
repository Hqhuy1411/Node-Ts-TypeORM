
import { UserController } from "./..//app/controllers/UserController";
import  express  from "express";
import { ErrorHandler } from '../app/middlewares/HandlerError'
import verifyUser from "../app/middlewares/AuthMiddleware"
const router = express.Router();
const userController = new UserController;

router.post('/',  ErrorHandler.catchErrors(userController.create));
router.put('/',  verifyUser ,ErrorHandler.catchErrors(userController.update));
router.delete('/',  verifyUser ,ErrorHandler.catchErrors(userController.delete));



export default router;