import { Category } from "@prisma/client"
import prismaClient from "../utils/prisma"


export const getCategories = async () => {
    try {
        const categories = await prismaClient.category.findMany()

        return [categories, null]
    } catch(err: any) {
        return [null, err.message]
    }
}

export const getCategoryPosts = async (categoryId: number) => {
    try {
        const posts = await prismaClient.category.findFirst({
            where: {
                id: categoryId
            },
            include: {
                posts: true
            }
        })

        return [posts, null]
    } catch(err: any) {
        return [null, err.message]
    }
}

export const addCategory = async({name}: Pick<Category, "name">) => {
    try {
        await prismaClient.category.create({
            data: {
                name
            }
        })
        return [true, null]
    } catch(err: any) {
        return [false, err.message]
    }
}