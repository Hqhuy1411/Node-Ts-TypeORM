import { AuthorController } from "./..//app/controllers/AuthorController";
import  express  from "express";

const router = express.Router();
const authcontroller = new AuthorController;


router.get('/' ,authcontroller.test);



export default router;