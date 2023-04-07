import { ErrorHandler } from "../utils/ErrorHandler";
import { AuthorController } from "./..//app/controllers/AuthorController";
import  express  from "express";

const router = express.Router();
const authcontroller = new AuthorController;


router.get('/' ,ErrorHandler.handleErrors(authcontroller.test));
router.get('/:id' ,ErrorHandler.handleErrors(authcontroller.test2));
router.post('/', ErrorHandler.handleErrors(authcontroller.create));
router.put('/:id', ErrorHandler.handleErrors(authcontroller.update));
router.delete('/:id', ErrorHandler.handleErrors(authcontroller.delete));



export default router;