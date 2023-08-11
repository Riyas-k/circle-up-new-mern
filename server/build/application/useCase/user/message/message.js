"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessage = exports.messageAdd = void 0;
const httpstatuscodes_1 = require("../../../../types/httpstatuscodes");
const appError_1 = __importDefault(require("../../../../utilities/appError"));
const messageAdd = async (chatId, senderId, message, repository) => {
    const messages = await repository.createMessage(chatId, senderId, message);
    if (!messages) {
        throw new appError_1.default("user not found", httpstatuscodes_1.HttpStatus.UNAUTHORIZED);
    }
    return messages;
};
exports.messageAdd = messageAdd;
const getMessage = async (chatId, repository) => {
    const messages = await repository.getMessage(chatId);
    if (!messages) {
        throw new appError_1.default("user not found", httpstatuscodes_1.HttpStatus.UNAUTHORIZED);
    }
    return messages;
};
exports.getMessage = getMessage;
