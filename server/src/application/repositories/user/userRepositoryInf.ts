import { modelNames } from "mongoose";
import { userRepositoryMongoDB } from "../../../framework/database/mongodb/repositories/user/userAuthRepositoryImp";

export const userDbRepository = (
  repository: ReturnType<userRepositoryMongoDB>
) => {
  const addUser = async (user: {
    firstName?: string;
    lastName?: string;
    UserName?: string;
    phone?: number;
    email?: string;
    password?: string;
  }) => {
    return await repository.addUser(user);
  };
  const getUserByEmail = async (email: string) => {
    return repository.getUserByEmail(email);
  };
  const getUserValid = async (email: string) => {
    return repository.getUserValid(email);
  };
  const getAllUsers = async () => {
    return repository.getAllUsers();
  };
  const blockCurrUser = async (userId: string) => {
    return repository.blockCurrUser(userId);
  };
  const unBlockCurrUser = async (userId: string) => {
    return repository.unBlockCurrUser(userId);
  };
  const newUserGoogle = async (user: {
    email: string;
    photoURL: string;
    displayName: string;
  }) => {
    return repository.newUserGoogle(user);
  };
  const getUserData = async (userId: string) => {
    return repository.getUserData(userId);
  };
  const updateUser = async (
    username: string,
    name: string,
    phoneNumber: number,
    email: string,
    location: string,
    bio: string,
    dp: string,
    userId: string
  ) => {
    return repository.updateUserData(
      username,
      name,
      phoneNumber,
      email,
      location,
      bio,
      dp,
      userId
    );
  };
  const correctEmail = async (email: string) => {
    return repository.emailCheck(email);
  };
  const changeNew = async (email: string, password: string) => {
    return repository.updatePassword(email, password);
  };
  const getUserById = async(friendId:string)=>{
    return repository.getUserPostUser(friendId)
  }
  const getProfile = async(userId:string)=>{
    return repository.getUserProfile(userId)
  }
  const getUserIdProfile = async(userId:string)=>{
   return repository.getUserWidget(userId)
  }
  const getUserName = async(name:string)=>{
    return repository.getUserSpell(name)
  }
  const putFollower = async(friendId:string,userId:string)=>{
    return repository.addFollower(friendId,userId)
  }
  const removeFollow = async(friendId:string,userId:string)=>{
    return repository.removeFollower(friendId,userId)
  }
  const getFollowers = async(userId:string)=>{
    return repository.followerList(userId)
  }
  const getFollowings = async(userId:string)=>{
    return repository.followingList(userId)
  }
  const findSuggest = async(userId:string)=>{
    return repository.suggestionUser(userId)
  }
  const fetchPosts = async()=>{
    return repository.fetchPosts()
  }
  const reportRemove = async(postId:string,index:number)=>{
    return repository.removeReport(postId,index)
  }
  const getPostsReported = async()=>{
    return repository.getReportedPosts()
  }
  const confirmReport = async(postId:string)=>{
    return repository.reportConfirm(postId)
  }

  return {
    addUser,getUserIdProfile,getUserName,getFollowers,getFollowings,
    getUserByEmail,removeFollow,
    getUserValid,reportRemove,
    getAllUsers,
    blockCurrUser,
    unBlockCurrUser,findSuggest,
    newUserGoogle,
    getUserData,
    updateUser,getPostsReported,
    correctEmail,getProfile,confirmReport,
    changeNew,getUserById,putFollower,fetchPosts
  };
};
export type UserDbInterface = typeof userDbRepository;
