"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRepositoryImp = void 0;
const messageModel_1 = __importDefault(require("../../models/userModels/messageModel"));
const messageRepositoryImp = () => {
    const createMessage = async (chatId, senderId, message) => {
        const newMessage = new messageModel_1.default({
            chatId, senderId, message
        });
        return await newMessage.save();
    };
    const getMessage = async (chatId) => {
        return await messageModel_1.default.find({ chatId });
    };
    return {
        createMessage, getMessage
    };
};
exports.messageRepositoryImp = messageRepositoryImp;
