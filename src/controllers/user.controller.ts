import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import {userService} from "../services"

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const {name, password}: Pick<User, "name"|"password">  = req.body
    const [data, error] = await userService.createUser({name, password})
    
    if(error) {
        return next(error.getErrors())
    }
        res.json({
            success: true,
            message: "You have been registered successfully"
        })

}


export const loginUser = async(req: Request, res: Response, next: NextFunction) => {
    const {name, password}: Pick<User, "name"|"password"> = req.body
    const [user, error] = await userService.authenticateUser({name, password})
    
    if(error) {
        return next(error.getErrors())
    }

    res.json({
        success: true,
        message: "Successfully authenticated",
        user
    })
}
