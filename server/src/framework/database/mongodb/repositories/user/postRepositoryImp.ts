import mongoose from "mongoose";
import Post from "../../models/userModels/postModel";
import User from "../../models/userModels/userModel";

export const postRepositoryMongoDb = () => {
  const addPostDetails = async (
    userId: string,
    text: string,
    image: string,
    userName: string
  ) => {
    const post = {
      userId: userId,
      description: text,
      image: image,
      userName: userName,
    };
    const newPost = new Post(post);
    return newPost.save();
  };
  const getPosts = async (userId:string) => {
    const user:any = await User.findById(userId);
    const followingIds = user.following;
    followingIds.push(userId)
    const data = await Post.find({userId:{$in:followingIds}});
    return data;
  };
  const getUser = async (friendId: string) => {
    const data = await Post.findOne({ userId: friendId });
    return data;
  };

  const fetchUserPost = async (userId: string) => {
    const data = await Post.find({ userId: userId });
    return data;
  };
  const postDelete = async (postId: string) => {
    try {
      await Post.deleteOne({ _id: postId });
      return true;
    } catch (error) {
      console.log(error);
    }
  };
  const postEdit = async (postId: string, text: string) => {
    try {
      await Post.updateOne(
        { _id: postId },
        {
          $set: {
            description: text,
          },
        }
      ).then((res) => {
        return true;
      });
    } catch (error) {
      console.log(error);
    }
  };
  const postLike = async (postId: string, userId: string) => {
    console.log(postId, userId, "jello");
    const data: any = await Post.updateOne(
      { _id: postId, likes: { $ne: userId } },
      {
        $addToSet: {
          likes: userId,
        },
      }
    );
    return true;
  };
  const unLike = async (postId: string, userId: string) => {
    const data: any = await Post.updateOne(
      { _id: postId },
      {
        $pull: {
          likes: userId,
        },
      },
      {
        new: true,
      }
    );
    return true;
  };

  const putComment = async (
    postId: string,
    userId: string,
    comment: string,
    firstName:string
  ) => {
    const newId = postId.replace(/:/g, "");
    try {
      const post = await Post.findByIdAndUpdate(
        { _id: newId },
        { $push: { comments: { userId: userId, comment: comment,firstName:firstName } } }
      );
      return post;
    } catch (error) {
      console.log(error);
    }
  };
  const postDeleteComment = async (
    postId: string,
    userId: string,
    index: number
  ) => {
    const newId = postId.replace(/:/g, "");
    try {
      const post = await Post.findById(newId);
      if (!post) {
        return;
      }
      post.comments.splice(index, 1);
      await post.save();
      return post;
    } catch (error) {
      console.log(error);
    }
  };
  const addReport = async (postId: string, userId: string, reason: string) => {
    try {
      const newId = postId.replace(/:/g, "");
      const post = await Post.findById(newId);
  
      if (post) {
        const isUserReported = post?.report?.some((report) => report?.userId === userId);
  
        if (!isUserReported) {
          // If the user is not already reported, push the new report
          post?.report?.push({ userId:userId, reason:reason });
          const updatedPost = await post.save();
          return updatedPost;
        } else {
          // If the user is already reported, you can handle it here if needed
          // For example, you can return a message indicating the user is already reported
          return false;
        }
      } else {
        // Post not found with the given postId
        return false;
      }
    } catch (error) {
      console.log(error);
      return null; // Handle the error appropriately, such as throwing an exception or returning an error message
    }
  };
  return {
    addPostDetails,
    addReport,
    getPosts,
    getUser,
    fetchUserPost,
    postDelete,
    postEdit,
    postLike,
    unLike,
    putComment,
    postDeleteComment,
  };
};

export type postRepositoryMongoDb = typeof postRepositoryMongoDb;
