import User from "../../models/userModels/userModel";
import Post from "../../models/userModels/postModel";

export const userRepositoryMongoDB = () => {
  const addUser = async (user: {
    firstName?: string;
    lastName?: string;
    UserName?: string;
    phone?: number;
    email?: string;
    password?: string;
  }) => {
    const newUser = new User(user);
    return await newUser.save();
  };
  const getUserByEmail = async (email: string) => {
    const user: any = await User.findOne({ email: email });
    return user;
  };
  const getUserValid = async (email: string) => {
    const user: any = await User.findOne({ email: email });

    return user;
  };
  const getAllUsers = async () => {
    const users: any = await User.find();
    return users;
  };
  const blockCurrUser = async (userId: string) => {
    const status: any = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { isBlock: true } },
      { new: true }
    );
    return status;
  };
  const unBlockCurrUser = async (userId: string) => {
    const status: any = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { isBlock: false } },
      { new: true }
    );

    return status;
  };
  const newUserGoogle = async (user: {
    email: string;
    photoURL: string;
    displayName: string;
  }) => {
    console.log(user);
    const { email, photoURL, displayName } = user;
    try {
      const newUser = new User({
        UserName: displayName,
        email: email,
        dp: photoURL,
      });
      return await newUser.save();
    } catch (error) {
      console.log(error);
    }
  };
  const getUserData = async (userId: string) => {
    try {
      const data = await User.findOne({ _id: userId });
      console.log(data, "+++++++++++++");
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const updateUserData = async (
    username: string,
    name: string,
    phoneNumber: number,
    email: string,
    location: string,
    bio: string,
    dp: string,
    userId: string
  ) => {
    try {
      const user = await User.findOne({ _id: userId });
      if (user) {
        const newUser = await User.updateOne(
          { _id: userId },
          {
            $set: {
              firstName: name,
              UserName: username,
              phone: phoneNumber,
              email: email,
              location: location,
              bio: bio,
              dp: dp,
            },
          }
        );
      }
      const dataUser = await User.findOne({ _id: userId });
      return dataUser;
    } catch (error) {
      console.log(error);
    }
  };

  const emailCheck = async (email: string) => {
    try {
      let details = await User.findOne({ email: email });
      if (details) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const updatePassword = async (email: string, password: string) => {
    try {
      let details = await User.findOneAndUpdate(
        { email: email },
        { $set: { password: password } },
        { new: true }
      );
      console.log(details);
      return true;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserPostUser = async (friendId: string) => {
    try {
      const data = await User.find({ _id: friendId });
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const getUserProfile = async (userId: string) => {
    try {
      const data = await User.findOne({ _id: userId });

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserWidget = async (userId: string) => {
    try {
      const data = await User.findOne({ _id: userId });
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserSpell = async (name: string) => {
    try {
      const data: any = await User.find({
        UserName: { $regex: `^${name}`, $options: "i" },
      });
      console.log(data, "lol");
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const addFollower = async (friendId: string, userId: string) => {
    console.log(friendId, userId);
    try {
      const data: any = await User.findByIdAndUpdate(
        { _id: friendId, followers: { $ne: userId } },
        {
          $addToSet: {
            followers: userId,
          },
        },
        {
          new: true,
        }
      );

      const details: any = await User.findByIdAndUpdate(
        { _id: userId, following: { $ne: friendId } },
        {
          $addToSet: {
            following: friendId,
          },
        },
        {
          new: true,
        }
      );
      return { data, details };
    } catch (error) {
      console.log(error);
    }
  };
  const removeFollower = async (friendId: string, userId: string) => {
    try {
      const data = await User.findByIdAndUpdate(
        { _id: userId },
        { $pull: { following: friendId } },
        { new: true }
      );
      const details = await User.findByIdAndUpdate(
        { _id: friendId },
        { $pull: { followers: userId } },
        { new: true }
      );
      return { data, details };
    } catch (error) {
      console.log(error);
    }
  };
  const followerList = async (userId: string) => {
    try {
      const data: any = await User.findOne({ _id: userId }).select("-password");
      const followers = await Promise.all(
        data.followers.map(
          async (userId: string) =>
            await User.findById(userId).select("-password")
        )
      );
      return followers;
    } catch (error) {
      console.log(error);
    }
  };

  const followingList = async (userId: string) => {
    try {
      const data: any = await User.findOne({ _id: userId }).select("-password");
      const followings = await Promise.all(
        data.following.map(
          async (userId: string) =>
            await User.findById(userId).select("-password")
        )
      );
      //  console.log(followings,'followings');
      return followings;
    } catch (error) {
      console.log(error);
    }
  };
  const suggestionUser = async (userId: string) => {
    try {
      const data: any = await User.findById(userId);
      const followingIds: any = data.following;
      const remainingData: any = await User.find({
        $and: [{ _id: { $nin: followingIds } }, { _id: { $ne: userId } }],
      }).exec();
      return remainingData;
    } catch (error) {
      console.log(error);
    }
  };
  const fetchPosts = async () => {
    try {
      const data: any = await Post.find();
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const removeReport = async (postId: string, index: number) => {
    try {
      const post = await Post.findById(postId);
      if (!post) {
        return;
      }
      post.report.splice(index, 1);
      await post.save();
      return post;
    } catch (error) {
      console.log(error);
    }
  };
  const getReportedPosts = async () => {
    try {
      const reportedPosts = await Post.find({
        report: { $exists: true, $not: { $size: 0 } }, // $exists checks if the field exists, $not: { $size: 0 } checks if the array size is not 0
       
      });
      console.log(reportedPosts,'posts');
      return reportedPosts
    } catch (error) {
      console.log(error);
    }
  };
  const  reportConfirm = async(postId:string)=>{
    try {
       const post = await Post.findById(postId);
       if(!post) {return};
       post.adminDeleted = true;
      return   await post.save()
     
    } catch (error) {
     console.log(error); 
    }
  }
  return {
    addUser,
    fetchPosts,
    suggestionUser,
    getUserWidget,
    removeReport,
    followingList,
    followerList,
    getUserSpell,
    getUserByEmail,
    getUserValid,
    getAllUsers,
    blockCurrUser,
    unBlockCurrUser,
    removeFollower,
    newUserGoogle,
    getUserData,
    updatePassword,
    updateUserData,
    emailCheck,
    getUserPostUser,
    getUserProfile,
    addFollower,
    getReportedPosts,
    reportConfirm
  };
};

export type userRepositoryMongoDB = typeof userRepositoryMongoDB;
