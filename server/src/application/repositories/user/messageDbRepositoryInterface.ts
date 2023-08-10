import { messageRepositoryType } from "../../../framework/database/mongodb/repositories/user/messageRepository";

export const messageDbInterface = (repository:ReturnType<messageRepositoryType>)=>{
    const createMessage = async(chatId:string,senderId:string,message:string)=>{
        return  await repository.createMessage(chatId,senderId,message)
    }
    const getMessage = async(chatId:string)=>{
        return   await repository.getMessage(chatId)
    }
    return {
        createMessage,getMessage
    }
}

export type messageDbInterfaceType = typeof messageDbInterface;