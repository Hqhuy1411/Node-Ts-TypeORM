import authRouter from './author.routes'

export function routers(app){

    app.use('/auth', authRouter)

}

