import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { resolve } from "path";
import { messageDbInterfaceType } from "../../../application/repositories/user/messageDbRepositoryInterface";
import { messageRepositoryType } from "../../../framework/database/mongodb/repositories/user/messageRepository";
import { getMessage, messageAdd } from "../../../application/useCase/user/message/message";

const messageController = (
  messageDbInterface: messageDbInterfaceType,
  messageDbImp: messageRepositoryType
) => {
  const dbRepositoryMessage = messageDbInterface(messageDbImp());
  const addMessage = asyncHandler(async(req:Request,res:Response)=>{
      const {chatId,senderId,message} = req.body;
      const messages = await messageAdd(chatId,senderId,message,dbRepositoryMessage)
      res.json({
        status: "success",
        messages,
      });
  })
  const getMessages = asyncHandler(async(req:Request,res:Response)=>{
    const { chatId } = req.params;
    const messages = await getMessage(
      chatId,
      dbRepositoryMessage
    );
    res.json({
      status: "success",
      messages,
    });
  })
  return {
    addMessage,getMessages
  }
};
export default messageController;
