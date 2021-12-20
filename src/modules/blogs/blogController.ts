import { Request,Response} from 'express'
import errorHandler from '../../middlewares/errorHandler'
import responseHandler from '../../middlewares/responseHandler'
import { Blog } from '../../entity/blog'
import { getRepository } from 'typeorm'

class blogController {
    static async getBlog(req:Request,res:Response){
        try{
            // const blogs = await Blog.find()
            const blogs = await getRepository(Blog).find()
            return responseHandler(res,"Loaded successfully",200,blogs)
        } catch(error:any){
            return errorHandler(error!.message,500,res)
        }
    }

    static async addBlog(req:Request,res:Response){
        try{
            const {title, description,content,likes } = req.body;
            const blog = new Blog()
            blog.title = title
            blog.description = description
            blog.content = content 
            const blogs = await getRepository(Blog)
            await blogs.save(blog);
            return responseHandler(res,"Loaded successfully",200,blog)
        } catch(error:any){
            // console.log(error)
            return errorHandler(error!.message,500,res)
        }
    }

    static async findBlog(req:Request,res:Response){
        try{
            const blog = await getRepository(Blog).findOne(req.params.id)
            return responseHandler(res,"Loaded successfully",200,blog)
        } catch(error:any){
            return errorHandler(error!.message,500,res)
        }        
    }

    static async updateBlogLike(req:Request,res:Response){
        try{
            const blog = await getRepository(Blog).findOne(req.params.id)
            // blog.merge(blog,req.body)
            console.log(blog)
            blog!.likes++ 
            const result = await getRepository(Blog).save(blog!)
            return responseHandler(res,"Loaded successfully",200,result)
        } catch(error:any){
            console.log(error)
            return errorHandler(error!.message,500,res)
        }        
    }
}

export default blogController