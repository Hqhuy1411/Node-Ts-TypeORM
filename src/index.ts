import express, {Express , Request, Response} from 'express'
const app : Express = express()
const port = 3000
app.use('/' ,(req : Request,res :Response)=>{
    res.send("Hello ahihi")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })