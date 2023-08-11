"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserWithId = exports.getUserProfile = exports.getUserFetch = exports.changePassword = exports.checkEmail = exports.profileUpdate = exports.checkUser = exports.addUser = exports.userLogin = exports.userRegister = void 0;
const userRegister = async (
//business logic
user, userRepository, authService) => {
    user.email = user.email.toLowerCase();
    const isEmailExist = await userRepository.getUserByEmail(user.email);
    if (isEmailExist) {
        return { status: false };
    }
    let encryptPassword = await authService.encryptPassword(user.password);
    user.password = encryptPassword;
    const { _id: userId } = await userRepository.addUser(user);
    const token = await authService.generateToken(userId.toString());
    return { status: true, token };
};
exports.userRegister = userRegister;
const userLogin = async (user, userRepository, authService) => {
    let userExist = await userRepository.getUserValid(user.email);
    if (!userExist) {
        return { status: false };
    }
    let checkPassword = await authService.comparePassword(user.password, userExist.password);
    const token = await authService.generateToken("1234567890".toString());
    if (checkPassword) {
        return { status: true, userExist, token };
    }
    else {
        return { status: false };
    }
};
exports.userLogin = userLogin;
const addUser = async (user, userRepository, authService) => {
    // user.email = user.email.toLowerCase();
    const isEmailExist = await userRepository.getUserByEmail(user.email);
    if (isEmailExist) {
        return { status: false };
    }
    let newUser = await userRepository.newUserGoogle(user);
    if (newUser) {
        const { _id: userId } = await userRepository.addUser(user);
        const token = await authService.generateToken(userId.toString());
        return { status: true, token };
    }
    return { status: false };
};
exports.addUser = addUser;
const checkUser = async (email, userRepository, authService) => {
    const isEmailExist = await userRepository.getUserByEmail(email);
    if (isEmailExist) {
        return { status: true, isEmailExist };
    }
    else {
        return { status: false };
    }
};
exports.checkUser = checkUser;
const profileUpdate = async (username, name, phoneNumber, email, location, bio, dp, userId, userRepository, authService) => {
    const updateUser = await userRepository.updateUser(username, name, phoneNumber, email, location, bio, dp, userId);
    return updateUser;
};
exports.profileUpdate = profileUpdate;
const checkEmail = async (email, userRepository, authService) => {
    const emailCheck = await userRepository.correctEmail(email);
    return emailCheck;
};
exports.checkEmail = checkEmail;
const changePassword = async (email, password, userRepository, authService) => {
    let encryptPassword = await authService.encryptPassword(password);
    const details = await userRepository.changeNew(email, encryptPassword);
    return details;
};
exports.changePassword = changePassword;
const getUserFetch = async (friendId, userRepository) => {
    try {
        const data = await userRepository.getUserById(friendId);
        return data;
    }
    catch (error) {
        console.log(error);
    }
};
exports.getUserFetch = getUserFetch;
const getUserProfile = async (userId, userRepository) => {
    try {
        const data = await userRepository.getProfile(userId);
        return data;
    }
    catch (error) {
        console.log(error);
    }
};
exports.getUserProfile = getUserProfile;
const getUserWithId = async (userId, userRepository) => {
    try {
        const data = await userRepository.getUserIdProfile(userId);
        return data;
    }
    catch (error) {
        console.log(error);
    }
};
exports.getUserWithId = getUserWithId;
