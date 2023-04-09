import {ErrorHandler} from "../app/middlewares/HandlerError"
import { BookController } from "./..//app/controllers/BookController";
import  express  from "express";
import verifyUser from "../app/middlewares/AuthMiddleware";

const router = express.Router();
const bookController = new BookController;


router.get('/' ,ErrorHandler.catchErrors(bookController.getAll));
router.get('/:id' ,ErrorHandler.catchErrors(bookController.get));
router.post('/', verifyUser,ErrorHandler.catchErrors(bookController.create));
router.put('/:idBook', verifyUser,ErrorHandler.catchErrors(bookController.update));
router.delete('/:idBook', verifyUser,ErrorHandler.catchErrors(bookController.delete));



export default router;