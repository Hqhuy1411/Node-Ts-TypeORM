import {ErrorHandler} from "../app/middlewares/HandlerError"
import { BookController } from "./..//app/controllers/BookController";
import  express  from "express";
import verifyUser from "../app/middlewares/AuthMiddleware";
import check from "../app/middlewares/AutheCheckMid";

const router = express.Router();
const bookController = new BookController;


router.get('/' ,ErrorHandler.catchErrors(bookController.getAll));
router.get('/:id' ,ErrorHandler.catchErrors(bookController.get));
router.post('/', verifyUser,check,ErrorHandler.catchErrors(bookController.create));
router.put('/:idBook', verifyUser,check,ErrorHandler.catchErrors(bookController.update));
router.delete('/:idBook', verifyUser,check,ErrorHandler.catchErrors(bookController.delete));



export default router;