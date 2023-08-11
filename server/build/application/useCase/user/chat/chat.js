"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChat = exports.getAllChats = exports.chatCreate = void 0;
const httpstatuscodes_1 = require("../../../../types/httpstatuscodes");
const appError_1 = __importDefault(require("../../../../utilities/appError"));
const chatCreate = async (senderId, receiverId, repository) => {
    const chat = await repository.createChat(senderId, receiverId);
    if (!chat) {
        throw new appError_1.default("user not found", httpstatuscodes_1.HttpStatus.UNAUTHORIZED);
    }
    return chat;
};
exports.chatCreate = chatCreate;
const getAllChats = async (userId, repository) => {
    const getChats = await repository.getAllChat(userId);
    if (!getChats) {
        throw new appError_1.default("Posts Are not Available", httpstatuscodes_1.HttpStatus.BAD_REQUEST);
    }
    return getChats;
};
exports.getAllChats = getAllChats;
const getChat = async (firstId, secondId, repository) => {
    const getChats = await repository.getChat(firstId, secondId);
    if (!getChats) {
        throw new appError_1.default("Posts Are not Available", httpstatuscodes_1.HttpStatus.BAD_REQUEST);
    }
    return getChats;
};
exports.getChat = getChat;
