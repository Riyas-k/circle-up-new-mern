"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const message_1 = require("../../../application/useCase/user/message/message");
const messageController = (messageDbInterface, messageDbImp) => {
    const dbRepositoryMessage = messageDbInterface(messageDbImp());
    const addMessage = (0, express_async_handler_1.default)(async (req, res) => {
        const { chatId, senderId, message } = req.body;
        const messages = await (0, message_1.messageAdd)(chatId, senderId, message, dbRepositoryMessage);
        res.json({
            status: "success",
            messages,
        });
    });
    const getMessages = (0, express_async_handler_1.default)(async (req, res) => {
        const { chatId } = req.params;
        const messages = await (0, message_1.getMessage)(chatId, dbRepositoryMessage);
        res.json({
            status: "success",
            messages,
        });
    });
    return {
        addMessage, getMessages
    };
};
exports.default = messageController;
