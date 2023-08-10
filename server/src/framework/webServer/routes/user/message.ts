import express from "express";
import messageController from "../../../../adapters/controller/user/messageController";
import { messageDbInterface } from "../../../../application/repositories/user/messageDbRepositoryInterface";
import { messageRepositoryImp } from "../../../database/mongodb/repositories/user/messageRepository";

const messageRouter = () => {
  const router = express.Router();
  const controller = messageController(messageDbInterface, messageRepositoryImp);
    router.post('/',controller.addMessage);
    router.get('/:chatId',controller.getMessages)
  return router;
};

export default messageRouter;