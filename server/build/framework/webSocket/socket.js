"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let activeUsers = [];
let onlineUsers = [];
const addNewUser = (userName, socketId) => {
    !onlineUsers.some((user) => user.userName === userName) &&
        onlineUsers.push({ userName, socketId });
    console.log(onlineUsers, "::::::::");
};
const removeUser = (socketId) => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};
const getUser = (userName) => {
    return onlineUsers.find((user) => user.userName == userName);
};
const socketConfig = (io) => {
    io.on("connection", (socket) => {
        socket.on("new-user-add", (newUserId) => {
            console.log(newUserId, "new");
            if (!activeUsers.some((user) => user.userId == newUserId)) {
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
        socket.on('sendNotification', (data) => {
            const { receiverId } = data;
            const user = activeUsers.find((user) => user.userId == receiverId);
            console.log("Sending from socket to:", receiverId);
            if (user) {
                io.to(user.socketId).emit('getNotifications', data);
            }
        });
        socket.on("disconnect", () => {
            activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
            //send all active users to new user
            io.emit("get-users", activeUsers);
        });
        socket.on("send-message", (data) => {
            const { receiverId } = data;
            console.log(activeUsers);
            const user = activeUsers.find((user) => user?.userId == receiverId);
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
exports.default = socketConfig;
