import { NextFunction, Request, Response } from "express";
import * as yup from "yup"
import CustomHTTPError from "../utils/error";
import createError from "../utils/error";



const requestValidator = (schema: yup.AnyObjectSchema) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.validate(req)
        next()
    } catch(err: any) {
       next(new CustomHTTPError(err.name, "", 400, err.errors))
    }
}

export default requestValidator