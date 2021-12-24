"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../../middlewares/authMiddleware"));
const authController_1 = __importDefault(require("./authController"));
const router = express_1.default.Router();
router.post('/login', authController_1.default.login);
router.post('/register', authController_1.default.register);
router.get('/profile', authMiddleware_1.default.isAuth, authController_1.default.profile);
exports.default = router;
