import { HttpStatus } from "../../../../types/httpstatuscodes"; 
import AppError from "../../../../utilities/appError"; 
import { messageDbInterfaceType } from "../../../repositories/user/messageDbRepositoryInterface";

export const messageAdd=async(  chatId: string,
    senderId: string,
    message: string,
    repository: ReturnType<messageDbInterfaceType>
  )=>{
    const messages:any = await repository.createMessage(chatId,senderId,message)
    if (!messages) {
        throw new AppError("user not found", HttpStatus.UNAUTHORIZED);
      }
      return messages;
  }

  export const getMessage = async(
    chatId: string,
    repository: ReturnType<messageDbInterfaceType>
  )=>{
    const messages:any = await repository.getMessage(chatId);
    if (!messages) {
        throw new AppError("user not found", HttpStatus.UNAUTHORIZED);
      }
      return messages;
  }