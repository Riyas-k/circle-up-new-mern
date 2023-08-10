import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { postDbInterface } from "../../../application/repositories/user/postDbRepositoryInterface";
import { postRepositoryMongoDb } from "../../../framework/database/mongodb/repositories/user/postRepositoryImp";
import {
  addReport,
  dataUserPosts,
  deletePostComment,
  postData,
  postDelete,
  postEdit,
  putComment,
  putData,
  putLike,
  putUnLike,
} from "../../../application/useCase/user/auth/post";

const postControllers = (
  postDbRepository: postDbInterface,
  postDbRepositoryService: postRepositoryMongoDb
) => {
  const postRepository = postDbRepository(postDbRepositoryService());
  const addPost = asyncHandler(async (req: Request, res: Response) => {
    const { text, image, userName } = req.body;
    if (!image) {
      return;
    }
    const { userId } = req.params;
    const data = await putData(userId, text, image, userName, postRepository);
    res.json(data);
  });
  const fetchPosts = asyncHandler(async (req: Request, res: Response) => {
    const {userId} = req.params;
    const data = await postData(userId,postRepository);
    res.json(data);
  });
  const fetchUserPosts = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const data = await dataUserPosts(userId, postRepository);
    res.json(data);
  });
  const deletePost = asyncHandler(async (req: Request, res: Response) => {
    const { postId } = req.params;
    await postDelete(postId, postRepository);
    res.json({ status: true });
  });

  const editPost = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { id, text } = req.body;
      const data = await postEdit(id, text, postRepository);
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  });

  const likedPost = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { userId } = req.body;
      console.log(req.body);
      const { postId } = req.params;
      const data = await putLike(postId, userId, postRepository);
      if (data) res.json(data);
    } catch (error) {
      console.log(error);
    }
  });
  const unLikePost = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { userId } = req.body;
      console.log(req.body);
      const { postId } = req.params;
      const data = await putUnLike(postId, userId, postRepository);
      if (data) res.json(data);
    } catch (error) {
      console.log(error);
    }
  });
  const addComment = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { postId } = req.params;
      const { userId, comment,firstName } = req.body;
      const data = await putComment(postId, userId, comment,firstName, postRepository);
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  });
  const deleteComment = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { postId } = req.params;
      const { userId, index } = req.body;
      const data = await deletePostComment(
        postId,
        userId,
        index,
        postRepository
      );
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  });
  const reportPost = asyncHandler(async(req:Request,res:Response)=>{
    try {
      const {postId} = req.params;
      const {userId,reason} = req.body;
      const data = await addReport(postId,userId,reason,postRepository)
      res.json(data)
    } catch (error) {
      console.log(error);
    }
  })

  return {
    addPost,
    fetchPosts,
    deleteComment,
    fetchUserPosts,
    deletePost,
    editPost,
    likedPost,
    unLikePost,reportPost,
    addComment,
  };
};

export default postControllers;
