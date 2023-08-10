import { chatRepositoryType } from "../../../framework/database/mongodb/repositories/user/chatRepository";

export const chatDbInterface = (repository:ReturnType<chatRepositoryType>)=>{
     const createChat = async(senderId:string, receiverId: string)=>{
       return  await repository.createChat(senderId,receiverId)
     }
     const getAllChat = async(userId:string)=>{
        return  await repository.getAllChat(userId)
     }
     const getChat = async(firstId:string,secondId:string)=>{
        return  await repository.getChat(firstId,secondId)
     }
     return {
        createChat,getAllChat,getChat
     }
}

export type chatDbInterfaceType = typeof chatDbInterface