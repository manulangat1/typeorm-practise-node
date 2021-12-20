import express, {  } from 'express';
import AuthMiddleware from '../../middlewares/authMiddleware';
import blogController from './blogController';


const router = express.Router()

router.get('/',blogController.getBlog)
router.get('/blog/:id',blogController.findBlog)
router.put('/blog/like/:id',blogController.updateBlogLike)

router.post('/', AuthMiddleware.isAuth,blogController.addBlog)


export default router;

