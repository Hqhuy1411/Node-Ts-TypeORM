import express, {Express , Request, Response} from 'express'
import bodyParser from 'body-parser'
import {routers} from './routes/index.router'
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
  

  export default app