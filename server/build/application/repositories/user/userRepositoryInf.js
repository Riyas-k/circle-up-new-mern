"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDbRepository = void 0;
const userDbRepository = (repository) => {
    const addUser = async (user) => {
        return await repository.addUser(user);
    };
    const getUserByEmail = async (email) => {
        return repository.getUserByEmail(email);
    };
    const getUserValid = async (email) => {
        return repository.getUserValid(email);
    };
    const getAllUsers = async () => {
        return repository.getAllUsers();
    };
    const blockCurrUser = async (userId) => {
        return repository.blockCurrUser(userId);
    };
    const unBlockCurrUser = async (userId) => {
        return repository.unBlockCurrUser(userId);
    };
    const newUserGoogle = async (user) => {
        return repository.newUserGoogle(user);
    };
    const getUserData = async (userId) => {
        return repository.getUserData(userId);
    };
    const updateUser = async (username, name, phoneNumber, email, location, bio, dp, userId) => {
        return repository.updateUserData(username, name, phoneNumber, email, location, bio, dp, userId);
    };
    const correctEmail = async (email) => {
        return repository.emailCheck(email);
    };
    const changeNew = async (email, password) => {
        return repository.updatePassword(email, password);
    };
    const getUserById = async (friendId) => {
        return repository.getUserPostUser(friendId);
    };
    const getProfile = async (userId) => {
        return repository.getUserProfile(userId);
    };
    const getUserIdProfile = async (userId) => {
        return repository.getUserWidget(userId);
    };
    const getUserName = async (name) => {
        return repository.getUserSpell(name);
    };
    const putFollower = async (friendId, userId) => {
        return repository.addFollower(friendId, userId);
    };
    const removeFollow = async (friendId, userId) => {
        return repository.removeFollower(friendId, userId);
    };
    const getFollowers = async (userId) => {
        return repository.followerList(userId);
    };
    const getFollowings = async (userId) => {
        return repository.followingList(userId);
    };
    const findSuggest = async (userId) => {
        return repository.suggestionUser(userId);
    };
    const fetchPosts = async () => {
        return repository.fetchPosts();
    };
    const reportRemove = async (postId, index) => {
        return repository.removeReport(postId, index);
    };
    const getPostsReported = async () => {
        return repository.getReportedPosts();
    };
    const confirmReport = async (postId) => {
        return repository.reportConfirm(postId);
    };
    return {
        addUser, getUserIdProfile, getUserName, getFollowers, getFollowings,
        getUserByEmail, removeFollow,
        getUserValid, reportRemove,
        getAllUsers,
        blockCurrUser,
        unBlockCurrUser, findSuggest,
        newUserGoogle,
        getUserData,
        updateUser, getPostsReported,
        correctEmail, getProfile, confirmReport,
        changeNew, getUserById, putFollower, fetchPosts
    };
};
exports.userDbRepository = userDbRepository;
