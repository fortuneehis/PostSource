import { object, string } from "yup";
import { requestValidator } from "../middlewares";

export const getPostSchema = requestValidator(object({
    params: object({
        id: string().matches(/\d+/).required()
    })

}))

export const addPostSchema = requestValidator(object({
    body: object({
        
    })
}))


export const getPostCommentsSchema = requestValidator(object({
    params: object({
        id: string().matches(/\d+/, "ID parameter must be a number").required("ID parameter is required!")
    })
}))

export const addPostCommentSchema = requestValidator(object({
    params: object({
        id: string().matches(/\d+/,  "ID parameter must be a number").required("ID parameter is required!")
    })
}))

export const getPostCommentSchema = requestValidator(object({
    params: object({
        id: string().matches(/\d+/).required(),
        commentId: string().matches(/\d+/).required()
    })
}))

export const getPostRatingSchema = requestValidator(object({
    params: object({
        id: string().matches(/\d+/).required()
    })
}))

export const ratePostSchema = requestValidator(object({
    params: object({
        id: string().matches(/\d+/).required()
    }),
    body: object({})
}))