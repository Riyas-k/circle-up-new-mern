import { Application } from "express";
import authRouter from "./user/userRoutes";
import adminAuthRouter from "./admin/adminRoutes";
import postRouter from "./user/post";
import chatRouter from "./user/chat";
import messageRouter from "./user/message";

const routes = (app: Application) => {
  app.use("/api", authRouter());
  app.use("/api/chat", chatRouter());
  app.use("/api/admin", adminAuthRouter());
  app.use("/api/message", messageRouter());
  app.use("/api", postRouter());
};

export default routes;
