"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userAuth_1 = require("../../../application/useCase/user/auth/userAuth");
const userAuth_2 = require("../../../application/useCase/user/auth/userAuth");
const userDetails_1 = require("../../../application/useCase/user/auth/userDetails");
const authController = (authServiceInterface, authService, UserDbInterface, userDbService) => {
    const dbUserRepository = UserDbInterface(userDbService());
    const authServices = authServiceInterface(authService());
    const registerUser = (0, express_async_handler_1.default)(async (req, res) => {
        const { firstName, lastName, UserName, phone, email, password } = req.body;
        const user = {
            firstName,
            lastName,
            UserName,
            phone,
            email,
            password,
        };
        const token = await (0, userAuth_1.userRegister)(user, dbUserRepository, authServices);
        console.log(token);
        if (token.status == true) {
            res.json({ status: true, message: "User registered", token });
        }
        else {
            res.json({ status: false });
        }
    });
    const loginUser = (0, express_async_handler_1.default)(async (req, res) => {
        const { email, password } = req.body;
        const userDetails = { email, password };
        const user = await (0, userAuth_1.userLogin)(userDetails, dbUserRepository, authServices);
        if (user.status) {
            const { userExist } = user;
            const { token } = user;
            if (userExist.isBlock) {
                res.json({ blocked: "Blocked by Admin" });
            }
            else {
                res.json({ status: true, userExist: userExist, token: token });
            }
        }
        else {
            res.json({ status: false });
        }
    });
    const googleUser = (0, express_async_handler_1.default)(async (req, res) => {
        const { email, displayName, photoURL } = req.body;
        console.log(req.body);
        const values = { email, displayName, photoURL };
        console.log(values);
        const userGoogle = await (0, userAuth_1.addUser)(values, dbUserRepository, authServices);
        console.log(userGoogle);
        if (userGoogle.status == true) {
            res.json({ status: true, message: "User registered", userGoogle });
        }
        else {
            res.json({ status: false });
        }
    });
    const verifyGoogleUser = (0, express_async_handler_1.default)(async (req, res) => {
        const { email } = req.params;
        const data = await (0, userAuth_1.checkUser)(email, dbUserRepository, authServices);
        res.json({ data: data });
    });
    const updateUser = (0, express_async_handler_1.default)(async (req, res) => {
        const { username, name, phoneNumber, email, location, bio, dp } = req.body;
        const { userId } = req.params;
        const userUpdate = await (0, userAuth_1.profileUpdate)(username, name, phoneNumber, email, location, bio, dp, userId, dbUserRepository, authServices);
        res.json({ userExist: userUpdate });
    });
    const emailCheck = (0, express_async_handler_1.default)(async (req, res) => {
        const { email } = req.params;
        const data = await (0, userAuth_1.checkEmail)(email, dbUserRepository, authServices);
        if (data) {
            res.json(true);
        }
        else {
            res.json(false);
        }
    });
    const newPassword = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const { password } = req.body;
            const { email } = req.params;
            const data = await (0, userAuth_1.changePassword)(email, password, dbUserRepository, authServices);
            if (data) {
                res.json(true);
            }
        }
        catch (error) {
            console.log(error);
        }
    });
    const getUser = (0, express_async_handler_1.default)(async (req, res) => {
        const { friendId } = req.params;
        const data = await (0, userAuth_2.getUserFetch)(friendId, dbUserRepository);
        res.json(data);
    });
    const getProfile = (0, express_async_handler_1.default)(async (req, res) => {
        const { userId } = req.params;
        const data = await (0, userAuth_1.getUserProfile)(userId, dbUserRepository);
        res.json(data);
    });
    const getUserDetails = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            console.log(req.params, "mol");
            const { userId } = req.params;
            const data = await (0, userAuth_1.getUserWithId)(userId, dbUserRepository);
            res.json(data);
        }
        catch (error) {
            console.log(error);
        }
    });
    const searchUser = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const { name } = req.params;
            if (!name) {
                res.json({ data: [] });
            }
            const data = await (0, userDetails_1.getUserSearch)(name, dbUserRepository);
            res.json({ status: "success", data });
        }
        catch (error) {
            console.log(error);
        }
    });
    const putFollower = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const { id } = req.body;
            const { userId } = req.params;
            const data = await (0, userDetails_1.addFollower)(id, userId, dbUserRepository);
            console.log(data, "noy");
            if (data)
                res.json(data);
        }
        catch (error) {
            console.log(error);
        }
    });
    const putUnFollow = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const { id } = req.body;
            const { userId } = req.params;
            const data = await (0, userDetails_1.removeFollower)(id, userId, dbUserRepository);
            if (data)
                res.json(data);
        }
        catch (error) {
            console.log(error);
        }
    });
    const getFollowers = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const { userId } = req.params;
            const data = await (0, userDetails_1.followerList)(userId, dbUserRepository);
            res.json(data);
        }
        catch (error) {
            console.log(error);
        }
    });
    const getFollowing = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const { userId } = req.params;
            const data = await (0, userDetails_1.followingList)(userId, dbUserRepository);
            res.json(data);
        }
        catch (error) {
            console.log(error);
        }
    });
    const findSuggest = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const { userId } = req.params;
            const data = await (0, userDetails_1.suggestFriend)(userId, dbUserRepository);
            res.json(data);
        }
        catch (error) {
            console.log(error);
        }
    });
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
exports.default = authController;
