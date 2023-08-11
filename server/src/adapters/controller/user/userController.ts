import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { UserDbInterface } from "../../../application/repositories/user/userRepositoryInf";
import { userRepositoryMongoDB } from "../../../framework/database/mongodb/repositories/user/userAuthRepositoryImp";
import {
  blockCurrUser,
  getAllUsers,
  getUserData,
  unBlockCurrUser,
  fetchPosts,
  removeReport,
  getReportedPosts,
  reportConfirm,
} from "../../../application/useCase/user/auth/userDetails";

const userControllers = (
  userDbRepository: UserDbInterface,
  userDbRepositoryService: userRepositoryMongoDB
) => {
  const dbRepositoryUser = userDbRepository(userDbRepositoryService());
  const getUsers = asyncHandler(async (req: Request, res: Response) => {
    const data = await getAllUsers(dbRepositoryUser);
    res.json({ data });
  });
  const blockUser = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const status = await blockCurrUser(userId, dbRepositoryUser);
    console.log(status, "===");
    res.json({ status });
  });
  const unBlockUser = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const status = await unBlockCurrUser(userId, dbRepositoryUser);
    // const data = await getUserData(userId,dbRepositoryUser)
    // console.log(data);
    res.json({ status });
  });
  const viewAllPosts = asyncHandler(async (req: Request, res: Response) => {
    try {
      const data = await fetchPosts(dbRepositoryUser);
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  });
  const reportRemove = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { postId, index } = req.body;
      const data = await removeReport(postId, index, dbRepositoryUser);
      if (data) {
        res.json({ status: true });
      }
    } catch (error) {
      console.log(error);
    }
  });
  const reportedPosts = asyncHandler(async (req: Request, res: Response) => {
    try {
      const data = await getReportedPosts(dbRepositoryUser);
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  });
  const confirmReport = asyncHandler(async(req:Request,res:Response)=>{
    try {
      const {postId} = req.params
       const data = await reportConfirm(postId,dbRepositoryUser)
       res.json({status:true})
    } catch (error) {
      console.log(error);
    }
  })


  return {
    getUsers,
    blockUser,
    unBlockUser,
    viewAllPosts,
    reportRemove,
    reportedPosts,
    confirmReport,
  };
};
export default userControllers;
