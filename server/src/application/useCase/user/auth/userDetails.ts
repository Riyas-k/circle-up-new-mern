import { UserDbInterface, userDbRepository } from "../../../repositories/user/userRepositoryInf";
// import { AuthServiceInterface } from "../../../services/user/userAuthServiceInt";

export const getAllUsers = async (
  userRepository: ReturnType<UserDbInterface>
) => {
  try {
    const details = await userRepository.getAllUsers();
    return details;
  } catch (err) {
    console.log(err, "err is in use case");
  }
};
export const blockCurrUser = async (
  userId: string,
  userRepository: ReturnType<UserDbInterface>
) => {
  try {
    const status = await userRepository.blockCurrUser(userId);
    return status;
  } catch (error) {
    console.log(error);
  }
};

export const unBlockCurrUser = async (
  userId: string,
  userRepository: ReturnType<UserDbInterface>
) => {
  try {
    const status = await userRepository.unBlockCurrUser(userId);
    return status;
  } catch (error) {
    console.log(error);
  }
};

export const getUserData = async (
  userId: string,
  userRepository: ReturnType<UserDbInterface>
) => {
  try {
    const details = await userRepository.getUserName(userId);
  } catch (error) {
    console.log(error);
  }
};

export const getUserSearch = async (
  name: string,
  userRepository: ReturnType<UserDbInterface>
) => {
  try {
    const data = await userRepository.getUserName(name);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addFollower = async (
  friendId: string,
  userId: string,
  userRepository: ReturnType<UserDbInterface>
) => {
  try {
    const data = await userRepository.putFollower(friendId, userId);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const removeFollower = async (
  friendId: string,
  userId: string,
  userRepository: ReturnType<UserDbInterface>
) => {
  try {
    const data = await userRepository.removeFollow(friendId, userId);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const followerList = async (
  userId: string,
  userRepository: ReturnType<UserDbInterface>
) => {
  try {
    const data = await userRepository.getFollowers(userId);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const followingList = async (
  userId: string,
  userRepository: ReturnType<UserDbInterface>
) => {
  try {
    const data = await userRepository.getFollowings(userId);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const suggestFriend = async(userId:string,userRepository: ReturnType<UserDbInterface>)=>{
  try {
    const data = await userRepository.findSuggest(userId)
    return data;
  } catch (error) {
    console.log(error);
  }
}

export const fetchPosts = async(userRepository:ReturnType<UserDbInterface>)=>{
  try {
      const data = await userRepository.fetchPosts()
      return data
  } catch (error) {
    console.log(error);
  }
}

export const removeReport = async(postId:string,index:number,userRepository:ReturnType<UserDbInterface>)=>{
  try {
    const data = await userRepository.reportRemove(postId,index);
    return data
  } catch (error) {
    console.log(error);
  }
}
export const getReportedPosts = async(userRepository:ReturnType<UserDbInterface>)=>{
  try {
    const data = await userRepository.getPostsReported();
    return data
  } catch (error) {
    console.log(error);
  }
}
export const reportConfirm = async(postId:string,userRepository:ReturnType<UserDbInterface>)=>{
  try {
     const data = await userRepository.confirmReport(postId)
      return data
  } catch (error) {
    console.log(error);
  }
}