"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../../middlewares/authMiddleware"));
const blogController_1 = __importDefault(require("./blogController"));
const router = express_1.default.Router();
router.get('/', blogController_1.default.getBlog);
router.get('/blog/:id', blogController_1.default.findBlog);
router.put('/blog/like/:id', blogController_1.default.updateBlogLike);
router.post('/', authMiddleware_1.default.isAuth, blogController_1.default.addBlog);
exports.default = router;
