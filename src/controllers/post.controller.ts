
import { Post } from "@prisma/client"
import { NextFunction, Request, response, Response } from "express"
import { postService } from "../services"


type POST_STATUS = "PUBLIC"|"PRIVATE"

export const getAllPosts = async(req: Request, res: Response, next: NextFunction) => {
    const [posts, error] = await postService.getAllPosts()

    if(error) {
        next(error.getErrors())
    }

    res.json({
        success: true,
        posts
    })
}

export const addPost = async (req: Request, res: Response, next: NextFunction) => {


    const { id: creatorId } = req.user

    const { title, description, status, categories } : {title: string, description: string, status: POST_STATUS, categories: string}= req.body
    
    const categoriesArray = categories.split(',')
        .map(category=> category.trim())
        .filter(category=> category.length > 0)

    const [ _, error ] = await postService.addPost({title, description, status, creatorId, categoriesArray})

    if(error) {
        return next(error.getErrors())
    }

    response.json({
        success: true,
        message: "User registered successfully"
    })
}

export const getPost = async(req: Request, res: Response, next: NextFunction) => {

    const { id: userId} = req.user
    const { id } = req.params
    const [post, error] = await postService.getPost(userId, Number(id))

    if(error) {
        return next(error.getErrors())
    }

    res.json({
        success: true,
        post: post
    })
}


export const getPostComments = async(req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    const [comments, error] = await postService.getPostComments(Number(id))

    if(error) {
        return next(error.getErrors())
    }

    res.json({
        success: true,
        comments
    })
}

export const getPostComment = async (req: Request, res: Response, next: NextFunction) => {
    const { id, commentId } = req.params

    const [comment, error] = await postService.getPostComment(Number(id), Number(commentId))

    if(error) {
        return next(error.getErrors())
    }

    res.json({
        success: true,
        comment
    })
}

export const getPostRating = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params

    const [rating, error] = await postService.getPostRating(Number(id))

    if(error) {
        return next(error.getErrors())
    }

    res.json({
        success: true,
        rating
    })
}