import { postDbInterface } from "../../../repositories/user/postDbRepositoryInterface";

export const putData = async (
  userId: string,
  text: string,
  image: string,
  userName: string,
  postDbRepository: ReturnType<postDbInterface>
) => {
  const data: any = await postDbRepository.addPost(
    userId,
    text,
    image,
    userName
  );
  //    console.log(data,'data');
  return data;
};

export const postData = async (userId:string,
  postDbRepository: ReturnType<postDbInterface>
) => {
  const data: any = await postDbRepository.fetchPosts(userId);
  return data;
};

export const dataUserPosts = async (
  userId: string,
  postDbRepository: ReturnType<postDbInterface>
) => {
  const data: any = await postDbRepository.fetchUserPosts(userId);
  return data;
};

export const postDelete = async (
  postId: string,
  postDbRepository: ReturnType<postDbInterface>
) => {
  const data: any = await postDbRepository.deletePost(postId);
  return data;
};

export const postEdit = async (
  postId: string,
  text: string,
  postDbRepository: ReturnType<postDbInterface>
) => {
  await postDbRepository.editPost(postId, text);
  return true;
};

export const putLike = async (
  postId: string,
  userId: string,
  postDbRepository: ReturnType<postDbInterface>
) => {
  try {
    const data = await postDbRepository.likePost(postId, userId);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const putUnLike = async (
  postId: string,
  userId: string,
  postDbRepository: ReturnType<postDbInterface>
) => {
  try {
    const data = await postDbRepository.unLikePost(postId, userId);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const putComment = async (
  postId: string,
  userId: string,
  comment: string,
  firstName:string,
  postDbRepository: ReturnType<postDbInterface>
) => {
  try {
    const data = await postDbRepository.addComment(postId, userId, comment,firstName);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const deletePostComment = async (
  postId: string,
  userId: string,
  index: number,
  postDbRepository: ReturnType<postDbInterface>
) => {
  try {
    const data = await postDbRepository.deleteComment(postId, userId, index);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addReport =async(postId:string,userId:string,reason:string, postDbRepository: ReturnType<postDbInterface>)=>{
   try {
       const data = await postDbRepository.reportPost(postId,userId,reason)
       return data
   } catch (error) {
       console.log(error);
   }
}