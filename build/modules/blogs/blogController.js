"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_1 = __importDefault(require("../../middlewares/errorHandler"));
const responseHandler_1 = __importDefault(require("../../middlewares/responseHandler"));
const blog_1 = require("../../entity/blog");
const typeorm_1 = require("typeorm");
class blogController {
    static getBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const blogs = await Blog.find()
                const blogs = yield (0, typeorm_1.getRepository)(blog_1.Blog).find();
                return (0, responseHandler_1.default)(res, "Loaded successfully", 200, blogs);
            }
            catch (error) {
                return (0, errorHandler_1.default)(error.message, 500, res);
            }
        });
    }
    static addBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description, content, likes } = req.body;
                const blog = new blog_1.Blog();
                blog.title = title;
                blog.description = description;
                blog.content = content;
                const blogs = yield (0, typeorm_1.getRepository)(blog_1.Blog);
                yield blogs.save(blog);
                return (0, responseHandler_1.default)(res, "Loaded successfully", 200, blog);
            }
            catch (error) {
                // console.log(error)
                return (0, errorHandler_1.default)(error.message, 500, res);
            }
        });
    }
    static findBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blog = yield (0, typeorm_1.getRepository)(blog_1.Blog).findOne(req.params.id);
                return (0, responseHandler_1.default)(res, "Loaded successfully", 200, blog);
            }
            catch (error) {
                return (0, errorHandler_1.default)(error.message, 500, res);
            }
        });
    }
    static updateBlogLike(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blog = yield (0, typeorm_1.getRepository)(blog_1.Blog).findOne(req.params.id);
                // blog.merge(blog,req.body)
                console.log(blog);
                blog.likes++;
                const result = yield (0, typeorm_1.getRepository)(blog_1.Blog).save(blog);
                return (0, responseHandler_1.default)(res, "Loaded successfully", 200, result);
            }
            catch (error) {
                console.log(error);
                return (0, errorHandler_1.default)(error.message, 500, res);
            }
        });
    }
}
exports.default = blogController;
