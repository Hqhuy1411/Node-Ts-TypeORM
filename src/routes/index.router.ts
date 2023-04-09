import authorRouter from './author.routes'
import userRouter from './users.router'
import authRouter from './auth.routers'
import bookRouter from './book.routers'

export function routers(app){

    app.use('/author', authorRouter)
    app.use('/user', userRouter)
    app.use('/auth', authRouter)
    app.use('/book', bookRouter)

}

