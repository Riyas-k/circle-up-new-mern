import { UserDbInterface } from "../../../repositories/user/userRepositoryInf";
import { AuthServiceInterface } from "../../../services/user/userAuthServiceInt";

export const userRegister = async (
  //business logic
  user: {
    firstName: string;
    lastName: string;
    UserName: string;
    phone: number;
    email: string;
    password: any;
  },
  userRepository: ReturnType<UserDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  user.email = user.email.toLowerCase();
  const isEmailExist: any = await userRepository.getUserByEmail(user.email);
  if (isEmailExist) {
    return { status: false };
  }
  let encryptPassword = await authService.encryptPassword(user.password);
  user.password = encryptPassword;
  const { _id: userId } = await userRepository.addUser(user);
  const token = await authService.generateToken(userId.toString());
  return { status: true, token };
};

export const userLogin = async (
  user: { email: string; password: string },
  userRepository: ReturnType<UserDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  let userExist: any = await userRepository.getUserValid(user.email);
  if (!userExist) {
    return { status: false };
  }
  let checkPassword = await authService.comparePassword(
    user.password,
    userExist.password
  );
  const token = await authService.generateToken("1234567890".toString());
  if (checkPassword) {
    return { status: true, userExist, token };
  } else {
    return { status: false };
  }
};

export const addUser = async (
  user: { email: string; photoURL: string; displayName: string },
  userRepository: ReturnType<UserDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  // user.email = user.email.toLowerCase();
  const isEmailExist: any = await userRepository.getUserByEmail(user.email);
  if (isEmailExist) {
    return { status: false };
  }
  let newUser: any = await userRepository.newUserGoogle(user);
  if (newUser) {
    const { _id: userId } = await userRepository.addUser(user);

    const token = await authService.generateToken(userId.toString());
    return { status: true, token };
  }
  return { status: false };
};

export const checkUser = async (
  email: string,
  userRepository: ReturnType<UserDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  const isEmailExist: any = await userRepository.getUserByEmail(email);
  if (isEmailExist) {
    return { status: true, isEmailExist };
  } else {
    return { status: false };
  }
};

export const profileUpdate = async (
  username: string,
  name: string,
  phoneNumber: number,
  email: string,
  location: string,
  bio: string,
  dp: string,
  userId: string,
  userRepository: ReturnType<UserDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  const updateUser: any = await userRepository.updateUser(
    username,
    name,
    phoneNumber,
    email,
    location,
    bio,
    dp,
    userId
  );
  return updateUser;
};

export const checkEmail = async (
  email: string,
  userRepository: ReturnType<UserDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  const emailCheck: any = await userRepository.correctEmail(email);
  return emailCheck;
};

export const changePassword = async (
  email: string,
  password: string,
  userRepository: ReturnType<UserDbInterface>,
  authService: ReturnType<AuthServiceInterface>
) => {
  let encryptPassword = await authService.encryptPassword(password);
  const details: any = await userRepository.changeNew(email, encryptPassword);
  return details
};

export const getUserFetch = async(friendId:string,userRepository:ReturnType<UserDbInterface>)=>{
  try {
    const data = await userRepository.getUserById(friendId)
    return data
  } catch (error) {
    console.log(error);
  }
}

export const  getUserProfile = async(userId:string,userRepository:ReturnType<UserDbInterface>)=>{
  try {
    const data = await userRepository.getProfile(userId)
    return data
  } catch (error) {
    console.log(error);
  }
}

export const getUserWithId = async(userId:string,userRepository:ReturnType<UserDbInterface>)=>{
    try {
      const data = await userRepository.getUserIdProfile(userId)
      return data
      
    } catch (error) {
      console.log(error);
    }
}