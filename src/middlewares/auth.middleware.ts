import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken"
import * as dotEnv from 'dotenv'

dotEnv.config()

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {

    const { headers } = req
    const authorizationHeader = headers["authorization"]
    if(!authorizationHeader) {
        return next({
            success: false,
            message: "Unauthorized! 402"
        }) 
    }
    
    const authToken = authorizationHeader.split(" ")[1]
    console.log(authToken)
        let user = jwt.verify(authToken, process.env.JWT_SECRET as string)
        if(!user) {
            return next({
                success: false,
                message: "Unauthorized! 402"
            })
        }
  
        //@ts-ignore
        req.user = user
        next()


}


export default authenticateUser