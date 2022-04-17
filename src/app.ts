import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { categoryRouter, postRouter, userRouter }from './routes'
import compression from 'compression'
import helmet from 'helmet'
import CustomHTTPError from './utils/error'

dotenv.config()

const port = process.env.PORT || 5000

const app = express()
app.use(compression())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cors())
app.use("/users", userRouter)
app.use("/posts", postRouter)
app.use("/categories", categoryRouter)

app.use((err: CustomHTTPError, req: Request, res: Response, next: NextFunction)=>{
    res.status(err.status).json({
        success: false,
        err
    })
})


app.listen(port,()=>{
    try {
        console.log(`Running on port ${port}...`)
    } catch(err) {
        console.log(err)
    }
    
})