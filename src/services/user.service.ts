import prismaClient from "../utils/prisma"
import { comparePassword, hashPassword } from "../utils/user"
import * as jwt from 'jsonwebtoken'
import { User } from "@prisma/client"
import * as dotenv from 'dotenv'
import CustomHTTPError from "../utils/error"

dotenv.config()

export const createUser = async ({name, password}: Pick<User, "name"|"password">) => {

    try {

        const user = await prismaClient.user.findUnique({
            where: {
                name
            }        
        })

        if(user) {
            throw new CustomHTTPError("", "user already exists!", 400)
        }

        const hashedPassword = await hashPassword(password)

        await prismaClient.user.create({
            data: {
                name,
                password: hashedPassword
            }
        })
        return [true, null]

    } catch(err: any) {
        return [null, err]
    }
}

export const authenticateUser = async ({name, password}: Pick<User, "name"|"password">) => {
    try {
        
        const user = await prismaClient.user.findUnique({
            where: {
                name,
            },
    
        })
        
        if(!user || !await comparePassword(password, user.password)) {
            throw new CustomHTTPError("", "Invalid Credentials!", 402)
        }
        const accessToken = jwt.sign(user, process.env.JWT_SECRET as string)

        const userData = {
            data: {
                id: user.id,
                name: user.name
            },
            accessToken
        }

        return [userData, null]

    } catch(err: any) {
        return [null, err]
    }
}