import {type} from 'os';
import Message from '../../models/userModels/messageModel';

export const messageRepositoryImp = ()=>{
   const createMessage = async(chatId:string,senderId:string,message:string)=>{
        const newMessage = new Message({
            chatId,senderId,message
        })
        return await newMessage.save()
   }
   const getMessage = async(chatId:string)=>{
    return await Message.find({chatId})
   }
   return{
    createMessage,getMessage
   }
}

export type messageRepositoryType = typeof messageRepositoryImp