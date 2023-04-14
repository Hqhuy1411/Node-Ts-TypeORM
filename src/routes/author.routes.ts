import {ErrorHandler} from "../app/middlewares/HandlerError"
import { AuthorController } from "./..//app/controllers/AuthorController";
import  express  from "express";

const router = express.Router();
const authcontroller = new AuthorController;

router.get('/' ,authcontroller.getAll);
/**
 * @openapi
 * /author/{id}:
 *   get:
 *     tags:
 *       - Author
 *     summary: Get author by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the author to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Author information retrieved successfully
 *       '404':
 *         description: Author not found
 */
router.get('/:id' ,ErrorHandler.catchErrors(authcontroller.get));
/**
 * @swagger
 * /author:
 *   post:
 *     tags:
 *       - Author
 *     summary: Create a new user
 *     requestBody:
 *       description: User object that needs to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRequest'
 *     responses:
 *       200:
 *         description: User created successfully
 */

router.post('/', ErrorHandler.catchErrors(authcontroller.create));
router.put('/:id', ErrorHandler.catchErrors(authcontroller.update));
router.delete('/:id', ErrorHandler.catchErrors(authcontroller.delete));



export default router;