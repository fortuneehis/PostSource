import { Comment, Post, Rating, User } from "@prisma/client"
import { connect } from "http2"
import CustomHTTPError from "../utils/error"
import prismaClient from "../utils/prisma"


export const getAllPosts = async(): Promise<[Post[]|null, CustomHTTPError|null]> => {
    try {
        const posts = await prismaClient.post.findMany({
            where: {
                status: "PUBLIC"
            }
        })

        return [posts, null]

    } catch(err: any) {

        return [null, new CustomHTTPError(err.name, 500, err.message)]
    }
}

export const addPost = async({ title, description, status, creatorId, categoriesArray }: Pick<Post, "title"|"description"|"status"|"creatorId">&{categoriesArray: string[]}): Promise<[boolean, CustomHTTPError|null]> => {
        try {
            await prismaClient.post.create({
                data: { 
                    title,
                    description,
                    status,
                    creator: {
                        connect: {
                            id: creatorId
                        }
                    },
                    categories: {
                       create: [
                           {
                               categories: {
                                   connect: {
                                       
                                   }
                               }
                           }
                       ]
                    }
                }
            })
            return [true, null]
        } catch(err: any) {
            return [false, new CustomHTTPError("", 500, err.message)]
        }
}


export const getPost = async (userId:number, postId: number): Promise<[Post|null, CustomHTTPError|null]> => {


    try {
        const post = await prismaClient.post.findFirst({
            where: {
                id: postId
            }, 
            include: {
                creator: true
            }
        })

        return [post, null]
    } catch(err: any) {
        return [null, new CustomHTTPError(err.name, 500, err.message)]
    }
}


export const getPostComments = async (postId: number): Promise<[Comment[]|null, CustomHTTPError|null]> => {

    try {

        const post = await prismaClient.post.findFirst({
            where: {
                id: postId
            }
        })


        const comments = await prismaClient.comment.findMany({
            where: {
                post: {
                    id: postId
                },
            },
            include: {
                comments: true,
                user: true
            }
        })
        return [comments, null]
    } catch(err: any) {
        return [null, new CustomHTTPError(err.name, 500, err.message)]
    }
}

export const getPostComment = async (postId: number, commentId: number): Promise<[Comment|null, CustomHTTPError|null]> => {
    try {

        const post = await prismaClient.post.findFirst({
            where: {
                id: postId
            }
        })

        const comment = await prismaClient.comment.findFirst({
            where: {
                post: {
                    id: postId
                }
            },
            include: {
                comments: true,
                user: true
            }
        })

        return [comment, null]

    } catch(err: any) {
        return [null, new CustomHTTPError(err.name, 500, err.message)]
    }
}


export const getPostAccess = async (postId: number, userId: number): Promise<[boolean, CustomHTTPError|null]> => {

    try {
        const post = await prismaClient.post.findFirst({
            where: {
                id: postId
            }, 
            include: {
                creator: true
            }
        })
        if(!post) {
            throw new CustomHTTPError("",404, "This resource does not exist!")
        }
        if(post && post.status === "PRIVATE" && post.creator.id !== userId){
            //status - 403
            throw new CustomHTTPError("Access denied!",403,"You don't have access to this resource!")
        }
    
        return [true, null]
    } catch(err: any) {
        return [false, err]
    }
    
}

export const getPostRating = async (postId: number): Promise<[(Rating&{user: User})[]|null, CustomHTTPError|null]> => {
    try {
        const rating = await prismaClient.rating.findMany({
            where: {
                postId
            },
            include: {
                user: true
            }
        })
        return [rating, null]
    } catch(err: any) {
        return [null, new CustomHTTPError(err.name, 500, err.message)]
    }
}