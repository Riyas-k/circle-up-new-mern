"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRepository = void 0;
const postRepository = (repository) => {
    const addPost = async (userId, text, image, userName) => {
        return repository.addPostDetails(userId, text, image, userName);
    };
    const fetchPosts = async (userId) => {
        return repository.getPosts(userId);
    };
    const fetchUserPosts = async (userId) => {
        return repository.fetchUserPost(userId);
    };
    const deletePost = async (postId) => {
        return repository.postDelete(postId);
    };
    const editPost = async (postId, text) => {
        return repository.postEdit(postId, text);
    };
    const likePost = async (postId, userId) => {
        return repository.postLike(postId, userId);
    };
    const unLikePost = async (postId, userId) => {
        return repository.unLike(postId, userId);
    };
    const addComment = async (postId, userId, comment, firstName) => {
        return repository.putComment(postId, userId, comment, firstName);
    };
    const deleteComment = async (postId, userId, index) => {
        return repository.postDeleteComment(postId, userId, index);
    };
    const reportPost = async (postId, userId, reason) => {
        return repository.addReport(postId, userId, reason);
    };
    return {
        addPost,
        fetchPosts,
        deleteComment,
        fetchUserPosts,
        deletePost,
        editPost,
        likePost,
        unLikePost,
        addComment,
        reportPost,
    };
};
exports.postRepository = postRepository;
