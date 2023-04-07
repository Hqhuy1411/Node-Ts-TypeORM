import {ErrorHandler} from "../app/middlewares/HandlerError"
import { AuthorController } from "./..//app/controllers/AuthorController";
import  express  from "express";

const router = express.Router();
const authcontroller = new AuthorController;


router.get('/' ,ErrorHandler.catchErrors(authcontroller.test));
router.get('/:id' ,ErrorHandler.catchErrors(authcontroller.test2));
router.post('/', ErrorHandler.catchErrors(authcontroller.create));
router.put('/:id', ErrorHandler.catchErrors(authcontroller.update));
router.delete('/:id', ErrorHandler.catchErrors(authcontroller.delete));



export default router;