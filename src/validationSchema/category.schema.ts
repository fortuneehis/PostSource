import { object, string } from "yup";
import { requestValidator } from "../middlewares";



export const getCategoryPostsSchema = requestValidator(object({
    params: object({
        id: string().matches(/\d+/).required()
    })
}))

export const addCategorySchema = requestValidator(object({
    body: object({
        name: string().required()
    })
}))