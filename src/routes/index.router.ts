import authRouter from './author.routes'
import userRouter from './users.router'


export function routers(app){

    app.use('/auth', authRouter)
    app.use('/user', userRouter)
}

