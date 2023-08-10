import express from "express";
import userControllers from "../../../../adapters/controller/user/userController";
import { userDbRepository } from "../../../../application/repositories/user/userRepositoryInf";
import { userRepositoryMongoDB } from "../../../database/mongodb/repositories/user/userAuthRepositoryImp";

const userRouter = () => {
  const router = express.Router();

  const controllers: any = userControllers(
    userDbRepository,
    userRepositoryMongoDB
  );

  
  router.get("/view-users", controllers.getAllUsers);

  // router.get("/:friendId", controllers.getUser);
  

  return router;
};
export default userRouter;
