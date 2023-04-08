
import { UserController } from "./..//app/controllers/UserController";
import  express  from "express";
import { ErrorHandler } from '../app/middlewares/HandlerError'

const router = express.Router();
const userController = new UserController;

router.post('/',  ErrorHandler.catchErrors(userController.create));



export default router;