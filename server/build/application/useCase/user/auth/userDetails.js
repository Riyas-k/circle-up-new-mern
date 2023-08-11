"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportConfirm = exports.getReportedPosts = exports.removeReport = exports.fetchPosts = exports.suggestFriend = exports.followingList = exports.followerList = exports.removeFollower = exports.addFollower = exports.getUserSearch = exports.getUserData = exports.unBlockCurrUser = exports.blockCurrUser = exports.getAllUsers = void 0;
// import { AuthServiceInterface } from "../../../services/user/userAuthServiceInt";
const getAllUsers = async (userRepository) => {
    try {
        const details = await userRepository.getAllUsers();
        return details;
    }
    catch (err) {
        console.log(err, "err is in use case");
    }
};
exports.getAllUsers = getAllUsers;
const blockCurrUser = async (userId, userRepository) => {
    try {
        const status = await userRepository.blockCurrUser(userId);
        return status;
    }
    catch (error) {
        console.log(error);
    }
};
exports.blockCurrUser = blockCurrUser;
const unBlockCurrUser = async (userId, userRepository) => {
    try {
        const status = await userRepository.unBlockCurrUser(userId);
        return status;
    }
    catch (error) {
        console.log(error);
    }
};
exports.unBlockCurrUser = unBlockCurrUser;
const getUserData = async (userId, userRepository) => {
    try {
        const details = await userRepository.getUserName(userId);
    }
    catch (error) {
        console.log(error);
    }
};
exports.getUserData = getUserData;
const getUserSearch = async (name, userRepository) => {
    try {
        const data = await userRepository.getUserName(name);
        return data;
    }
    catch (error) {
        console.log(error);
    }
};
exports.getUserSearch = getUserSearch;
const addFollower = async (friendId, userId, userRepository) => {
    try {
        const data = await userRepository.putFollower(friendId, userId);
        return data;
    }
    catch (error) {
        console.log(error);
    }
};
exports.addFollower = addFollower;
const removeFollower = async (friendId, userId, userRepository) => {
    try {
        const data = await userRepository.removeFollow(friendId, userId);
        return data;
    }
    catch (error) {
        console.log(error);
    }
};
exports.removeFollower = removeFollower;
const followerList = async (userId, userRepository) => {
    try {
        const data = await userRepository.getFollowers(userId);
        return data;
    }
    catch (error) {
        console.log(error);
    }
};
exports.followerList = followerList;
const followingList = async (userId, userRepository) => {
    try {
        const data = await userRepository.getFollowings(userId);
        return data;
    }
    catch (error) {
        console.log(error);
    }
};
exports.followingList = followingList;
const suggestFriend = async (userId, userRepository) => {
    try {
        const data = await userRepository.findSuggest(userId);
        return data;
    }
    catch (error) {
        console.log(error);
    }
};
exports.suggestFriend = suggestFriend;
const fetchPosts = async (userRepository) => {
    try {
        const data = await userRepository.fetchPosts();
        return data;
    }
    catch (error) {
        console.log(error);
    }
};
exports.fetchPosts = fetchPosts;
const removeReport = async (postId, index, userRepository) => {
    try {
        const data = await userRepository.reportRemove(postId, index);
        return data;
    }
    catch (error) {
        console.log(error);
    }
};
exports.removeReport = removeReport;
const getReportedPosts = async (userRepository) => {
    try {
        const data = await userRepository.getPostsReported();
        return data;
    }
    catch (error) {
        console.log(error);
    }
};
exports.getReportedPosts = getReportedPosts;
const reportConfirm = async (postId, userRepository) => {
    try {
        const data = await userRepository.confirmReport(postId);
        return data;
    }
    catch (error) {
        console.log(error);
    }
};
exports.reportConfirm = reportConfirm;
