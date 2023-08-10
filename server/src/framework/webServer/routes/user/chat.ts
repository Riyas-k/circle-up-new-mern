import express from "express";
import chatController from "../../../../adapters/controller/user/chatController";
import { chatDbInterface } from "../../../../application/repositories/user/chatDbRepostitoryInterface";
import { chatRepositoryImp } from "../../../database/mongodb/repositories/user/chatRepository";

const chatRouter = () => {
  const router = express.Router();
  const controller = chatController(chatDbInterface, chatRepositoryImp);
  router.post("/", controller.createChat);
  router.get("/:userId", controller.userChats);
  router.get("/find/:firstId/:secondId", controller.findChat);
  return router;
};

export default chatRouter;
