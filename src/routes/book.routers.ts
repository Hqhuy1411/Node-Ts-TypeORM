import {ErrorHandler} from "../app/middlewares/HandlerError"
import { BookController } from "./..//app/controllers/BookController";
import  express  from "express";

const router = express.Router();
const bookController = new BookController;


router.get('/' ,bookController.getAll);
router.get('/:id' ,ErrorHandler.catchErrors(bookController.get));
router.post('/', ErrorHandler.catchErrors(bookController.create));
router.put('/:id', ErrorHandler.catchErrors(bookController.update));
router.delete('/:id', ErrorHandler.catchErrors(bookController.delete));



export default router;