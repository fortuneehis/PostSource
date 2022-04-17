import { Router } from "express";
import { userController } from "../controllers"
import { userValidationSchema } from "../validationSchema";


const userRouter = Router()

//Create user
userRouter.post('/', 
userValidationSchema.createUserSchema, 
userController.createUser)

//authenticate user
userRouter.post('/authenticate', 
userValidationSchema.authenticateUserSchema, 
userController.loginUser)


export default userRouter