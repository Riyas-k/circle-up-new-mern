"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const chat_1 = require("../../../application/useCase/user/chat/chat");
const chatController = (chatDbInterface, chatDbImp) => {
    const dbRepositoryChat = chatDbInterface(chatDbImp());
    const createChat = (0, express_async_handler_1.default)(async (req, res) => {
        const { senderId, receiverId } = req.body;
        const newChat = await (0, chat_1.chatCreate)(senderId, receiverId, dbRepositoryChat);
        console.log(newChat, 'Chat');
        res.json({ status: "success", newChat });
    });
    const userChats = (0, express_async_handler_1.default)(async (req, res) => {
        const { userId } = req.params;
        console.log(req.params);
        const chats = await (0, chat_1.getAllChats)(userId, dbRepositoryChat);
        res.json({
            status: "success",
            chats,
        });
    });
    const findChat = (0, express_async_handler_1.default)(async (req, res) => {
        const { firstId, secondId } = req.params;
        const chat = await (0, chat_1.getChat)(firstId, secondId, dbRepositoryChat);
        res.json({ status: "success", chat });
    });
    return {
        createChat,
        findChat,
        userChats,
    };
};
exports.default = chatController;
