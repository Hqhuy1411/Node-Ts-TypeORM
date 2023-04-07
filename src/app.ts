import express, {Express , Request, Response,NextFunction} from 'express'
import bodyParser from 'body-parser'
import {routers} from './routes/index.router'
import { EntityNotFoundError, QueryFailedError } from 'typeorm'
import { ResponseUtil } from './utils/Response'
import { ErrorHandler } from './app/middlewares/HandlerError'
const app : Express = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended :true}))


routers(app);
app.use('/hello' ,(req : Request,res :Response)=>{
    res.send("Hello ahihi")
})
app.use("*", (req: Request, res: Response) => {
    return res.status(404).json({
      success: false,
      message: "Invalid route",
    });
  });

  
  // Middleware function to handler Error
app.use(ErrorHandler.handleErrors)

export default app