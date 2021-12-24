"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blogs_1 = __importDefault(require("./blogs"));
const auth_1 = __importDefault(require("./auth"));
const apiPrefix = '/api/v1';
const routes = (app) => {
    app.use(apiPrefix, blogs_1.default);
    app.use(apiPrefix, auth_1.default);
    return app;
};
exports.default = routes;
