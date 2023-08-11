"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRepositoryImp = void 0;
const chatModel_1 = __importDefault(require("../../models/userModels/chatModel"));
const chatRepositoryImp = () => {
    const createChat = async (senderId, receiverId) => {
        console.log("repo called", senderId, receiverId);
        try {
            const existingChat = await chatModel_1.default.findOne({
                members: { $all: [senderId, receiverId] },
            });
            if (existingChat) {
                return existingChat;
            }
            else {
                const newChat = new chatModel_1.default({
                    members: [senderId, receiverId],
                });
                const savedChat = await newChat.save();
                return savedChat;
            }
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    };
    const getAllChat = async (userId) => {
        return await chatModel_1.default.find({
            members: { $in: [userId] },
        });
    };
    const getChat = async (firsId, secondId) => {
        return await chatModel_1.default.find({
            members: { $all: [firsId, secondId] },
        });
    };
    return {
        createChat,
        getAllChat,
        getChat,
    };
};
exports.chatRepositoryImp = chatRepositoryImp;
