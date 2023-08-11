"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatDbInterface = void 0;
const chatDbInterface = (repository) => {
    const createChat = async (senderId, receiverId) => {
        return await repository.createChat(senderId, receiverId);
    };
    const getAllChat = async (userId) => {
        return await repository.getAllChat(userId);
    };
    const getChat = async (firstId, secondId) => {
        return await repository.getChat(firstId, secondId);
    };
    return {
        createChat, getAllChat, getChat
    };
};
exports.chatDbInterface = chatDbInterface;
