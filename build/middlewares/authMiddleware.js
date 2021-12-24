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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../entity/user");
const typeorm_1 = require("typeorm");
class AuthMiddleware {
    static isAuth(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
                console.log(token);
                const data = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
                console.log(data === null || data === void 0 ? void 0 : data.user.email, "is my data");
                console.log("now now");
                const user = yield (0, typeorm_1.getRepository)(user_1.User).findOne({ email: data === null || data === void 0 ? void 0 : data.user.email });
                // const user = await User.findOne({where:{email:data.email}})
                if (!user) {
                    res.status(401).json({
                        success: false,
                        message: 'Invalid token'
                    });
                }
                else {
                    req.user = user;
                    req.token = token;
                    next();
                }
            }
            catch (err) {
                res.status(401).json({
                    success: false,
                    message: 'You seem to be logged out, kindly retry again later'
                });
            }
        });
    }
}
exports.default = AuthMiddleware;
