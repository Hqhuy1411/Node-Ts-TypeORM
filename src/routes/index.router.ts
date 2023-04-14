import authorRouter from './author.routes'
import userRouter from './users.router'
import authRouter from './auth.routers'
import bookRouter from './book.routers'
import express, {Express , Request, Response,NextFunction} from 'express'

export function routers(app){

/**
 * @openapi
 * /hello:
 *   get:
 *     tags:
 *       - Hello
 *     description: Test swagger
 *     responses:
 *       '200':
 *         description: App is running
 */
    app.use('/hello' , (req : Request,res :Response)=>{
        res.sendStatus(200)
    })
    app.use('/author', authorRouter)
    app.use('/user', userRouter)
    app.use('/auth', authRouter)
    app.use('/book', bookRouter)

}
