"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageDbInterface = void 0;
const messageDbInterface = (repository) => {
    const createMessage = async (chatId, senderId, message) => {
        return await repository.createMessage(chatId, senderId, message);
    };
    const getMessage = async (chatId) => {
        return await repository.getMessage(chatId);
    };
    return {
        createMessage, getMessage
    };
};
exports.messageDbInterface = messageDbInterface;
