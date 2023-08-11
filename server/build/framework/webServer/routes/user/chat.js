"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatController_1 = __importDefault(require("../../../../adapters/controller/user/chatController"));
const chatDbRepostitoryInterface_1 = require("../../../../application/repositories/user/chatDbRepostitoryInterface");
const chatRepository_1 = require("../../../database/mongodb/repositories/user/chatRepository");
const chatRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, chatController_1.default)(chatDbRepostitoryInterface_1.chatDbInterface, chatRepository_1.chatRepositoryImp);
    router.post("/", controller.createChat);
    router.get("/:userId", controller.userChats);
    router.get("/find/:firstId/:secondId", controller.findChat);
    return router;
};
exports.default = chatRouter;
