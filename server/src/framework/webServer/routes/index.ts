import { Application } from "express";
import authRouter from "./user/userRoutes";
import adminAuthRouter from "./admin/adminRoutes";
import postRouter from "./user/post";
import chatRouter from "./user/chat";
import messageRouter from "./user/message";

const routes = (app: Application) => {
  app.use("/", authRouter());
  app.use("/chat", chatRouter());
  app.use("/admin", adminAuthRouter());
  app.use("/message", messageRouter());
  app.use("/", postRouter());
};

export default routes;
