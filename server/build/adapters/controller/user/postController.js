"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const post_1 = require("../../../application/useCase/user/auth/post");
const postControllers = (postDbRepository, postDbRepositoryService) => {
    const postRepository = postDbRepository(postDbRepositoryService());
    const addPost = (0, express_async_handler_1.default)(async (req, res) => {
        const { text, image, userName } = req.body;
        if (!image) {
            return;
        }
        const { userId } = req.params;
        const data = await (0, post_1.putData)(userId, text, image, userName, postRepository);
        res.json(data);
    });
    const fetchPosts = (0, express_async_handler_1.default)(async (req, res) => {
        const { userId } = req.params;
        const data = await (0, post_1.postData)(userId, postRepository);
        res.json(data);
    });
    const fetchUserPosts = (0, express_async_handler_1.default)(async (req, res) => {
        const { userId } = req.params;
        const data = await (0, post_1.dataUserPosts)(userId, postRepository);
        res.json(data);
    });
    const deletePost = (0, express_async_handler_1.default)(async (req, res) => {
        const { postId } = req.params;
        await (0, post_1.postDelete)(postId, postRepository);
        res.json({ status: true });
    });
    const editPost = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const { id, text } = req.body;
            const data = await (0, post_1.postEdit)(id, text, postRepository);
            res.json(data);
        }
        catch (error) {
            console.log(error);
        }
    });
    const likedPost = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const { userId } = req.body;
            console.log(req.body);
            const { postId } = req.params;
            const data = await (0, post_1.putLike)(postId, userId, postRepository);
            if (data)
                res.json(data);
        }
        catch (error) {
            console.log(error);
        }
    });
    const unLikePost = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const { userId } = req.body;
            console.log(req.body);
            const { postId } = req.params;
            const data = await (0, post_1.putUnLike)(postId, userId, postRepository);
            if (data)
                res.json(data);
        }
        catch (error) {
            console.log(error);
        }
    });
    const addComment = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const { postId } = req.params;
            const { userId, comment, firstName } = req.body;
            const data = await (0, post_1.putComment)(postId, userId, comment, firstName, postRepository);
            res.json(data);
        }
        catch (error) {
            console.log(error);
        }
    });
    const deleteComment = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const { postId } = req.params;
            const { userId, index } = req.body;
            const data = await (0, post_1.deletePostComment)(postId, userId, index, postRepository);
            res.json(data);
        }
        catch (error) {
            console.log(error);
        }
    });
    const reportPost = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const { postId } = req.params;
            const { userId, reason } = req.body;
            const data = await (0, post_1.addReport)(postId, userId, reason, postRepository);
            res.json(data);
        }
        catch (error) {
            console.log(error);
        }
    });
    return {
        addPost,
        fetchPosts,
        deleteComment,
        fetchUserPosts,
        deletePost,
        editPost,
        likedPost,
        unLikePost, reportPost,
        addComment,
    };
};
exports.default = postControllers;
