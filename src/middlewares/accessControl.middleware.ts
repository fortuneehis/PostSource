import { NextFunction, Request, Response } from "express";
import { postService } from "../services";



export const postAccessControl = async (req: Request, res: Response, next: NextFunction) => {
    const { id : userId } = req.user

    const { id } = req.params

    const [_, error] = await postService.getPostAccess(Number(id), userId)

    if(error) {
        return next(error.getErrors())
    }

    next()

}