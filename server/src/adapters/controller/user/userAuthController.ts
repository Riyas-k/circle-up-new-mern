import { Request, Response, response } from "express";
import asyncHandler from "express-async-handler";
import { AuthServices } from "../../../framework/services/user/userAuthServiceImp";
import { AuthServiceInterface } from "../../../application/services/user/userAuthServiceInt";
import { userRepositoryMongoDB } from "../../../framework/database/mongodb/repositories/user/userAuthRepositoryImp";
import {
  UserDbInterface,
  userDbRepository,
} from "../../../application/repositories/user/userRepositoryInf";
import {
  addUser,
  changePassword,
  checkEmail,
  checkUser,
  getUserProfile,
  getUserWithId,
  profileUpdate,
  userLogin,
  userRegister,
} from "../../../application/useCase/user/auth/userAuth";
import { getUserFetch } from "../../../application/useCase/user/auth/userAuth";
import {
  addFollower,
  followerList,
  followingList,
  getUserSearch,
  removeFollower,
  suggestFriend,
} from "../../../application/useCase/user/auth/userDetails";

const authController = (
  authServiceInterface: AuthServiceInterface,
  authService: AuthServices,
  UserDbInterface: UserDbInterface,
  userDbService: userRepositoryMongoDB
) => {
  const dbUserRepository = UserDbInterface(userDbService());
  const authServices = authServiceInterface(authService());
  const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { firstName, lastName, UserName, phone, email, password } = req.body;
    const user = {
      firstName,
      lastName,
      UserName,
      phone,
      email,
      password,
    };
    const token = await userRegister(user, dbUserRepository, authServices);
    console.log(token);
    if (token.status == true) {
      res.json({ status: true, message: "User registered", token });
    } else {
      res.json({ status: false });
    }
  });
  const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const userDetails = { email, password };
    const user = await userLogin(userDetails, dbUserRepository, authServices);
    if (user.status) {
      const { userExist } = user;
      const { token } = user;
      if (userExist.isBlock) {
        res.json({ blocked: "Blocked by Admin" });
      } else {
        res.json({ status: true, userExist: userExist, token: token });
      }
    } else {
      res.json({ status: false });
    }
  });

  const googleUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, displayName, photoURL } = req.body;
    console.log(req.body);
    const values = { email, displayName, photoURL };
    console.log(values);
    const userGoogle = await addUser(values, dbUserRepository, authServices);
    console.log(userGoogle);
    if (userGoogle.status == true) {
      res.json({ status: true, message: "User registered", userGoogle });
    } else {
      res.json({ status: false });
    }
  });

  const verifyGoogleUser = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.params;
    const data = await checkUser(email, dbUserRepository, authServices);
    res.json(data );
  });
  const updateUser = asyncHandler(async (req, res) => {
    const { username, name, phoneNumber, email, location, bio, dp } = req.body;
    const { userId } = req.params;
    const userUpdate = await profileUpdate(
      username,
      name,
      phoneNumber,
      email,
      location,
      bio,
      dp,
      userId,
      dbUserRepository,
      authServices
    );
    res.json({ userExist: userUpdate });
  });

  const emailCheck = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.params;
    const data = await checkEmail(email, dbUserRepository, authServices);
    if (data) {
      res.json(true);
    } else {
      res.json(false);
    }
  });
  const newPassword = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { password } = req.body;
      const { email } = req.params;
      const data = await changePassword(
        email,
        password,
        dbUserRepository,
        authServices
      );
      if (data) {
        res.json(true);
      }
    } catch (error) {
      console.log(error);
    }
  });
  const getUser = asyncHandler(async (req: Request, res: Response) => {
    const { friendId } = req.params;
    const data = await getUserFetch(friendId, dbUserRepository);
    res.json(data);
  });

  const getProfile = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const data = await getUserProfile(userId, dbUserRepository);
    res.json(data);
  });

  const getUserDetails = asyncHandler(async (req: Request, res: Response) => {
    try {
      console.log(req.params, "mol");
      const { userId } = req.params;
      const data = await getUserWithId(userId, dbUserRepository);
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  });

  const searchUser = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { name } = req.params;
      if (!name) {
        res.json({ data: [] });
      }
      const data = await getUserSearch(name, dbUserRepository);
      res.json({ status: "success", data });
    } catch (error) {
      console.log(error);
    }
  });

  const putFollower = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { id } = req.body;
      const { userId } = req.params;
      const data = await addFollower(id, userId, dbUserRepository);
      console.log(data, "noy");
      if (data) res.json(data);
    } catch (error) {
      console.log(error);
    }
  });
  const putUnFollow = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { id } = req.body;
      const { userId } = req.params;
      const data = await removeFollower(id, userId, dbUserRepository);
      if (data) res.json(data);
    } catch (error) {
      console.log(error);
    }
  });
  const getFollowers = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const data = await followerList(userId, dbUserRepository);
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  });
  const getFollowing = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const data = await followingList(userId, dbUserRepository);
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  });
  const findSuggest = asyncHandler(async(req:Request,res:Response)=>{
    try {
      const {userId} = req.params;
      const data = await suggestFriend(userId,dbUserRepository)
      res.json(data)
    } catch (error) {
      console.log(error);
    }
  })

  return {
    registerUser,
    putUnFollow,
    loginUser,
    findSuggest,
    googleUser,
    verifyGoogleUser,
    updateUser,
    getFollowing,
    emailCheck,
    getFollowers,
    newPassword,
    getUser,
    getProfile,
    getUserDetails,
    searchUser,
    putFollower,
  };
};

export default authController;
