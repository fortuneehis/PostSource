import { object, string } from "yup";
import { requestValidator } from "../middlewares";



export const createUserSchema = requestValidator(object({
    body: object({
        name: string().required(),
        password: string().required()
    })

}))

export const authenticateUserSchema = requestValidator(object({
    
    body: object({
        name: string().required(),
        password: string().required()
    })

}))