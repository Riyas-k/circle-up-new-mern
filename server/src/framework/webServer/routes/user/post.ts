import express from "express";
import postControllers from "../../../../adapters/controller/user/postController";
import { postRepository } from "../../../../application/repositories/user/postDbRepositoryInterface";
import { postRepositoryMongoDb } from "../../../database/mongodb/repositories/user/postRepositoryImp";

const postRouter = () => {
  const router = express.Router();

  const controllers: any = postControllers(
    postRepository,
    postRepositoryMongoDb
  );

  router.post("/edit_post", controllers.editPost);

  router.post("/:userId", controllers.addPost);

  router.get("/posts/:userId", controllers.fetchPosts);

  router.get("/post/:userId", controllers.fetchUserPosts);

  router.delete("/:postId/post", controllers.deletePost);

  router.put("/:postId/like", controllers.likedPost);

  router.put("/:postId/unLike", controllers.unLikePost);

  router.put("/:postId/comment", controllers.addComment);

  router.put("/:postId/delete-comment", controllers.deleteComment);

  router.put('/:postId/report-post',controllers.reportPost)

  return router;
};

export default postRouter;
