"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepositoryMongoDB = void 0;
const userModel_1 = __importDefault(require("../../models/userModels/userModel"));
const postModel_1 = __importDefault(require("../../models/userModels/postModel"));
const userRepositoryMongoDB = () => {
    const addUser = async (user) => {
        const newUser = new userModel_1.default(user);
        return await newUser.save();
    };
    const getUserByEmail = async (email) => {
        const user = await userModel_1.default.findOne({ email: email });
        return user;
    };
    const getUserValid = async (email) => {
        const user = await userModel_1.default.findOne({ email: email });
        return user;
    };
    const getAllUsers = async () => {
        const users = await userModel_1.default.find();
        return users;
    };
    const blockCurrUser = async (userId) => {
        const status = await userModel_1.default.findOneAndUpdate({ _id: userId }, { $set: { isBlock: true } }, { new: true });
        return status;
    };
    const unBlockCurrUser = async (userId) => {
        const status = await userModel_1.default.findOneAndUpdate({ _id: userId }, { $set: { isBlock: false } }, { new: true });
        return status;
    };
    const newUserGoogle = async (user) => {
        console.log(user);
        const { email, photoURL, displayName } = user;
        try {
            const newUser = new userModel_1.default({
                UserName: displayName,
                email: email,
                dp: photoURL,
            });
            return await newUser.save();
        }
        catch (error) {
            console.log(error);
        }
    };
    const getUserData = async (userId) => {
        try {
            const data = await userModel_1.default.findOne({ _id: userId });
            console.log(data, "+++++++++++++");
            return data;
        }
        catch (error) {
            console.log(error);
        }
    };
    const updateUserData = async (username, name, phoneNumber, email, location, bio, dp, userId) => {
        try {
            const user = await userModel_1.default.findOne({ _id: userId });
            if (user) {
                const newUser = await userModel_1.default.updateOne({ _id: userId }, {
                    $set: {
                        firstName: name,
                        UserName: username,
                        phone: phoneNumber,
                        email: email,
                        location: location,
                        bio: bio,
                        dp: dp,
                    },
                });
            }
            const dataUser = await userModel_1.default.findOne({ _id: userId });
            return dataUser;
        }
        catch (error) {
            console.log(error);
        }
    };
    const emailCheck = async (email) => {
        try {
            let details = await userModel_1.default.findOne({ email: email });
            if (details) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    };
    const updatePassword = async (email, password) => {
        try {
            let details = await userModel_1.default.findOneAndUpdate({ email: email }, { $set: { password: password } }, { new: true });
            console.log(details);
            return true;
        }
        catch (error) {
            console.log(error);
        }
    };
    const getUserPostUser = async (friendId) => {
        try {
            const data = await userModel_1.default.find({ _id: friendId });
            return data;
        }
        catch (error) {
            console.log(error);
        }
    };
    const getUserProfile = async (userId) => {
        try {
            const data = await userModel_1.default.findOne({ _id: userId });
            return data;
        }
        catch (error) {
            console.log(error);
        }
    };
    const getUserWidget = async (userId) => {
        try {
            const data = await userModel_1.default.findOne({ _id: userId });
            return data;
        }
        catch (error) {
            console.log(error);
        }
    };
    const getUserSpell = async (name) => {
        try {
            const data = await userModel_1.default.find({
                UserName: { $regex: `^${name}`, $options: "i" },
            });
            console.log(data, "lol");
            return data;
        }
        catch (error) {
            console.log(error);
        }
    };
    const addFollower = async (friendId, userId) => {
        console.log(friendId, userId);
        try {
            const data = await userModel_1.default.findByIdAndUpdate({ _id: friendId, followers: { $ne: userId } }, {
                $addToSet: {
                    followers: userId,
                },
            }, {
                new: true,
            });
            const details = await userModel_1.default.findByIdAndUpdate({ _id: userId, following: { $ne: friendId } }, {
                $addToSet: {
                    following: friendId,
                },
            }, {
                new: true,
            });
            return { data, details };
        }
        catch (error) {
            console.log(error);
        }
    };
    const removeFollower = async (friendId, userId) => {
        try {
            const data = await userModel_1.default.findByIdAndUpdate({ _id: userId }, { $pull: { following: friendId } }, { new: true });
            const details = await userModel_1.default.findByIdAndUpdate({ _id: friendId }, { $pull: { followers: userId } }, { new: true });
            return { data, details };
        }
        catch (error) {
            console.log(error);
        }
    };
    const followerList = async (userId) => {
        try {
            const data = await userModel_1.default.findOne({ _id: userId }).select("-password");
            const followers = await Promise.all(data.followers.map(async (userId) => await userModel_1.default.findById(userId).select("-password")));
            return followers;
        }
        catch (error) {
            console.log(error);
        }
    };
    const followingList = async (userId) => {
        try {
            const data = await userModel_1.default.findOne({ _id: userId }).select("-password");
            const followings = await Promise.all(data.following.map(async (userId) => await userModel_1.default.findById(userId).select("-password")));
            //  console.log(followings,'followings');
            return followings;
        }
        catch (error) {
            console.log(error);
        }
    };
    const suggestionUser = async (userId) => {
        try {
            const data = await userModel_1.default.findById(userId);
            const followingIds = data.following;
            const remainingData = await userModel_1.default.find({
                $and: [{ _id: { $nin: followingIds } }, { _id: { $ne: userId } }],
            }).exec();
            return remainingData;
        }
        catch (error) {
            console.log(error);
        }
    };
    const fetchPosts = async () => {
        try {
            const data = await postModel_1.default.find();
            return data;
        }
        catch (error) {
            console.log(error);
        }
    };
    const removeReport = async (postId, index) => {
        try {
            const post = await postModel_1.default.findById(postId);
            if (!post) {
                return;
            }
            post.report.splice(index, 1);
            await post.save();
            return post;
        }
        catch (error) {
            console.log(error);
        }
    };
    const getReportedPosts = async () => {
        try {
            const reportedPosts = await postModel_1.default.find({
                report: { $exists: true, $not: { $size: 0 } }, // $exists checks if the field exists, $not: { $size: 0 } checks if the array size is not 0
            });
            console.log(reportedPosts, 'posts');
            return reportedPosts;
        }
        catch (error) {
            console.log(error);
        }
    };
    const reportConfirm = async (postId) => {
        try {
            const post = await postModel_1.default.findById(postId);
            if (!post) {
                return;
            }
            ;
            post.adminDeleted = true;
            return await post.save();
        }
        catch (error) {
            console.log(error);
        }
    };
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
exports.userRepositoryMongoDB = userRepositoryMongoDB;
