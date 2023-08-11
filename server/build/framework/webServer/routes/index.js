"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRoutes_1 = __importDefault(require("./user/userRoutes"));
const adminRoutes_1 = __importDefault(require("./admin/adminRoutes"));
const post_1 = __importDefault(require("./user/post"));
const chat_1 = __importDefault(require("./user/chat"));
const message_1 = __importDefault(require("./user/message"));
const routes = (app) => {
    app.use("/api", (0, userRoutes_1.default)());
    app.use("/api/chat", (0, chat_1.default)());
    app.use("/api/admin", (0, adminRoutes_1.default)());
    app.use("/api/message", (0, message_1.default)());
    app.use("/api", (0, post_1.default)());
};
exports.default = routes;
