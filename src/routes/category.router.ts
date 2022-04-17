import { Router } from "express";
import { categoryController } from "../controllers";
import { authMiddleware } from "../middlewares";
import { categoryValidationSchema } from "../validationSchema";


const categoryRouter = Router()

categoryRouter.use(authMiddleware)

categoryRouter.get('/', 
categoryController.getCategories)

categoryRouter.post('/',
categoryValidationSchema.addCategorySchema,
categoryController.addCategory)

categoryRouter.get('/:id/posts', 
categoryValidationSchema.getCategoryPostsSchema,
categoryController.getCategoryPost)

export default categoryRouter