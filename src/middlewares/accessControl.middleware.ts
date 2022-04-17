import { NextFunction, Request, Response } from "express";
import { postService } from "../services";
import CustomHTTPError from "../utils/error";
import createError from "../utils/error";



export const postAccessControl = async (req: Request, res: Response, next: NextFunction) => {
    const { id : userId } = req.user

    const { id } = req.params

    const [canView, error] = await postService.getPostAccess(Number(id), userId)

    if(canView) {
        return next()
    }

    next(error?.getErrors())

}