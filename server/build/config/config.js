"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const configKeys = {
    MONGO_URL: "mongodb+srv://mohammedriyazriyaz04:7b7z0wpEFRslnCSD@cluster0.balviqn.mongodb.net/",
    PORT: process.env.PORT || 3001,
    JWT_SECRET: "SECRET_KEY123"
};
exports.default = configKeys;
