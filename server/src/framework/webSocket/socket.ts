import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

let activeUsers: any = [];
let onlineUsers: any = [];

const addNewUser = (userName: string, socketId: string) => {
  !onlineUsers.some((user: any) => user.userName === userName) &&
    onlineUsers.push({ userName, socketId });
  console.log(onlineUsers, "::::::::");
};
const removeUser = (socketId: string) => {
  onlineUsers = onlineUsers.filter((user: any) => user.socketId !== socketId);
};
const getUser = (userName:string)=>{
  return onlineUsers.find((user:any)=>user.userName==userName)
}

const socketConfig = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  io.on("connection", (socket) => {
    socket.on("new-user-add", (newUserId) => {
      console.log(newUserId, "new");
      if (!activeUsers.some((user: any) => user.userId == newUserId)) {
        activeUsers.push({ userId: newUserId, socketId: socket.id });
      }
      console.log(activeUsers, "push");
      //send all active users to new user
      io.emit("get-users", activeUsers);
    });
    socket.on("newUser", (user) => {
      console.log(user, "userName");
      addNewUser(user?.userName, socket.id);
    });
    socket.on('sendNotification',(data)=>{
        const {receiverId} = data;
        const user = activeUsers.find((user:any)=>user.userId==receiverId);
        console.log("Sending from socket to:", receiverId);
        if(user){
          io.to(user.socketId).emit('getNotifications',data)
        }

    })
    socket.on("disconnect", () => {
      activeUsers = activeUsers.filter(
        (user: any) => user.socketId !== socket.id
      );
      //send all active users to new user
      io.emit("get-users", activeUsers);
    });
    socket.on("send-message", (data) => {
      const { receiverId } = data;
      console.log(activeUsers);
      const user = activeUsers.find((user: any) => user?.userId == receiverId);
      console.log(user, "user");
      console.log("Sending from socket to:", receiverId);
      console.log("Data:", data);
      if (user) {
        console.log(user);
        io.to(user?.socketId).emit("receive-message", data);
      }
    });
  });
};

export default socketConfig;
