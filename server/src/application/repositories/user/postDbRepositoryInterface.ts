import { postRepositoryMongoDb } from "../../../framework/database/mongodb/repositories/user/postRepositoryImp";

export const postRepository = (
  repository: ReturnType<postRepositoryMongoDb>
) => {
  const addPost = async (
    userId: string,
    text: string,
    image: string,
    userName: string
  ) => {
    return repository.addPostDetails(userId, text, image, userName);
  };
  const fetchPosts = async (userId:string) => {
    return repository.getPosts(userId);
  };
  const fetchUserPosts = async (userId: string) => {
    return repository.fetchUserPost(userId);
  };

  const deletePost = async (postId: string) => {
    return repository.postDelete(postId);
  };
  const editPost = async (postId: string, text: string) => {
    return repository.postEdit(postId, text);
  };
  const likePost = async (postId: string, userId: string) => {
    return repository.postLike(postId, userId);
  };
  const unLikePost = async (postId: string, userId: string) => {
    return repository.unLike(postId, userId);
  };
  const addComment = async (
    postId: string,
    userId: string,
    comment: string,
    firstName:string
  ) => {
    return repository.putComment(postId, userId, comment,firstName);
  };
  const deleteComment = async (
    postId: string,
    userId: string,
    index: number
  ) => {
    return repository.postDeleteComment(postId, userId, index);
  };
  const reportPost = async (postId: string, userId: string, reason: string) => {
    return repository.addReport(postId,userId,reason)
  };
  return {
    addPost,
    fetchPosts,
    deleteComment,
    fetchUserPosts,
    deletePost,
    editPost,
    likePost,
    unLikePost,
    addComment,
    reportPost,
  };
};

export type postDbInterface = typeof postRepository;
