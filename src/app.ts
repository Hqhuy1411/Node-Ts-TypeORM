import express, {Express , Request, Response,NextFunction} from 'express'
import bodyParser from 'body-parser'
import {routers} from './routes/index.router'
import { EntityNotFoundError, QueryFailedError } from 'typeorm'
import { ResponseUtil } from './utils/Response'
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
app.use((err : any,req:Request, res:Response, next : NextFunction)=>{

  if(err instanceof EntityNotFoundError){
    return ResponseUtil.sendErrror(res,"Item/page you are looking for does not exist", 404,null);
  }
  else 
  if(err instanceof QueryFailedError){
    return ResponseUtil.sendErrror(res,"Error for   Duplicate", 422,null);
  }
  return res.status(500).json({
    success : false,
    massage : "Something went wrong"
  })
})

export default app