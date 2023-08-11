"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../config/config"));
const authServices = () => {
    const encryptPassword = async (password) => {
        const salt = await bcrypt_1.default.genSalt(10);
        password = await bcrypt_1.default.hash(password, salt);
        return password;
    };
    const generateToken = async (userId) => {
        if (config_1.default.JWT_SECRET) {
            const token = jsonwebtoken_1.default.sign({ userId }, config_1.default.JWT_SECRET, {
                expiresIn: "30d",
            });
            return token;
        }
        else {
            throw new Error("JWT TOKEN is not defined");
        }
    };
    const comparePassword = async (password, bodyPassword) => {
        const passwordMatch = await bcrypt_1.default.compare(password, bodyPassword);
        return passwordMatch;
    };
    const verifyToken = (token) => {
        if (config_1.default.JWT_SECRET) {
            const isVerify = jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET);
            return isVerify;
        }
    };
    return {
        encryptPassword,
        generateToken,
        comparePassword,
        verifyToken,
    };
};
exports.authServices = authServices;
