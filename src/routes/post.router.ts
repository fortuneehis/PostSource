import { Router } from "express";
import { postController } from "../controllers";
import { accessControlMiddleware, authMiddleware, requestValidator } from "../middlewares";
import { postValidationSchema } from "../validationSchema";


const postRouter = Router()

postRouter.use(authMiddleware)


postRouter.get('/', 
postController.getAllPosts)

postRouter.post('/', 
postValidationSchema.addPostSchema,
postController.addPost)


postRouter.get('/:id', 
postValidationSchema.getPostSchema, 
accessControlMiddleware.postAccessControl, 
postController.getPost)


postRouter.get('/:id/comments', 
postValidationSchema.getPostCommentsSchema, 
accessControlMiddleware.postAccessControl, 
postController.getPostComments)


postRouter.post('/:id/comments', 
postValidationSchema.addPostCommentSchema,
accessControlMiddleware.postAccessControl)


postRouter.get('/:id/comments/:commentId', 
postValidationSchema.getPostCommentSchema, 
accessControlMiddleware.postAccessControl, 
postController.getPostComment)


postRouter.get('/:id/ratings', 
postValidationSchema.getPostRatingSchema, 
accessControlMiddleware.postAccessControl,
postController.getPostRating)


postRouter.post('/:id/ratings', 
postValidationSchema.ratePostSchema, 
accessControlMiddleware.postAccessControl)


export default postRouter