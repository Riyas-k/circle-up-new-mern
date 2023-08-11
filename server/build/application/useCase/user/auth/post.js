"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReport = exports.deletePostComment = exports.putComment = exports.putUnLike = exports.putLike = exports.postEdit = exports.postDelete = exports.dataUserPosts = exports.postData = exports.putData = void 0;
const putData = async (userId, text, image, userName, postDbRepository) => {
    const data = await postDbRepository.addPost(userId, text, image, userName);
    //    console.log(data,'data');
    return data;
};
exports.putData = putData;
const postData = async (userId, postDbRepository) => {
    const data = await postDbRepository.fetchPosts(userId);
    return data;
};
exports.postData = postData;
const dataUserPosts = async (userId, postDbRepository) => {
    const data = await postDbRepository.fetchUserPosts(userId);
    return data;
};
exports.dataUserPosts = dataUserPosts;
const postDelete = async (postId, postDbRepository) => {
    const data = await postDbRepository.deletePost(postId);
    return data;
};
exports.postDelete = postDelete;
const postEdit = async (postId, text, postDbRepository) => {
    await postDbRepository.editPost(postId, text);
    return true;
};
exports.postEdit = postEdit;
const putLike = async (postId, userId, postDbRepository) => {
    try {
        const data = await postDbRepository.likePost(postId, userId);
        return data;
    }
    catch (error) {
        console.log(error);
    }
};
exports.putLike = putLike;
const putUnLike = async (postId, userId, postDbRepository) => {
    try {
        const data = await postDbRepository.unLikePost(postId, userId);
        return data;
    }
    catch (error) {
        console.log(error);
    }
};
exports.putUnLike = putUnLike;
const putComment = async (postId, userId, comment, firstName, postDbRepository) => {
    try {
        const data = await postDbRepository.addComment(postId, userId, comment, firstName);
        return data;
    }
    catch (error) {
        console.log(error);
    }
};
exports.putComment = putComment;
const deletePostComment = async (postId, userId, index, postDbRepository) => {
    try {
        const data = await postDbRepository.deleteComment(postId, userId, index);
        return data;
    }
    catch (error) {
        console.log(error);
    }
};
exports.deletePostComment = deletePostComment;
const addReport = async (postId, userId, reason, postDbRepository) => {
    try {
        const data = await postDbRepository.reportPost(postId, userId, reason);
        return data;
    }
    catch (error) {
        console.log(error);
    }
};
exports.addReport = addReport;
