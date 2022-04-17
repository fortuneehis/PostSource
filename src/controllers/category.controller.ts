import { NextFunction, Request, Response } from "express";
import { categoryService } from "../services";


export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
    const [categories, error] = await categoryService.getCategories()

    if(error) {
        next(error)
    }

    res.json({
        success: true,
        categories
    })
}

export const getCategoryPost = async (req: Request, res: Response, next: NextFunction) => {

    const { id } = req.params

    const [posts, error] = await categoryService.getCategoryPosts(Number(id))

    if(error) {
        next(error)
    }

    res.json({
        success: true,
        posts
    })
}

export const addCategory = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body

    const [_, error] = await categoryService.addCategory({name})

    if(error) {
        next(error)
    }

    res.json({
        success: true,
        message: "Category added successfully"
    })
}