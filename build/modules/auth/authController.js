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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const typeorm_1 = require("typeorm");
const user_1 = require("../../entity/user");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class authController {
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield (0, typeorm_1.getRepository)(user_1.User).findOne({ email: req.body.email });
                if (user) {
                    const isPasswordMatch = yield bcryptjs_1.default.compareSync(req.body.password, user.password);
                    if (isPasswordMatch) {
                        const token = jsonwebtoken_1.default.sign({ user }, process.env.SECRET_KEY, { expiresIn: '1800s' });
                        const data = {
                            user,
                            token
                        };
                        return (0, responseHandler_1.default)(res, "Logged in ", 200, data);
                    }
                    return (0, responseHandler_1.default)(res, "Invalid login credentials ", 200, "Invalid login credentials");
                }
                return (0, responseHandler_1.default)(res, "User not found ", 404, "User not found");
            }
            catch (error) {
                console.error(error);
                return (0, errorHandler_1.default)(error.message, 500, res);
            }
        });
    }
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield (0, typeorm_1.getRepository)(user_1.User).findOne({ email: req.body.email });
                if (user) {
                    return (0, responseHandler_1.default)(res, "User already with email ", 400, "User already with email");
                }
                const saltedPassword = bcryptjs_1.default.hashSync(req.body.password, 10);
                const newUser = new user_1.User();
                newUser.username = req.body.username;
                newUser.email = req.body.email;
                newUser.password = saltedPassword;
                yield (0, typeorm_1.getRepository)(user_1.User).save(newUser);
                return (0, responseHandler_1.default)(res, "Added successfully", 201, newUser);
            }
            catch (error) {
                return (0, errorHandler_1.default)(error.message, 500, res);
            }
        });
    }
    static profile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return (0, responseHandler_1.default)(res, "Added successfully", 200, req.user);
            }
            catch (error) {
                console.log(error);
                return (0, errorHandler_1.default)(error.message, 500, res);
            }
        });
    }
}
exports.default = authController;
