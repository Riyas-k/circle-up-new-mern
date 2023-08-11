"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRepositoryMongoDb = void 0;
const postModel_1 = __importDefault(require("../../models/userModels/postModel"));
const userModel_1 = __importDefault(require("../../models/userModels/userModel"));
const postRepositoryMongoDb = () => {
    const addPostDetails = async (userId, text, image, userName) => {
        const post = {
            userId: userId,
            description: text,
            image: image,
            userName: userName,
        };
        const newPost = new postModel_1.default(post);
        return newPost.save();
    };
    const getPosts = async (userId) => {
        const user = await userModel_1.default.findById(userId);
        const followingIds = user.following;
        followingIds.push(userId);
        const data = await postModel_1.default.find({ userId: { $in: followingIds } });
        return data;
    };
    const getUser = async (friendId) => {
        const data = await postModel_1.default.findOne({ userId: friendId });
        return data;
    };
    const fetchUserPost = async (userId) => {
        const data = await postModel_1.default.find({ userId: userId });
        return data;
    };
    const postDelete = async (postId) => {
        try {
            await postModel_1.default.deleteOne({ _id: postId });
            return true;
        }
        catch (error) {
            console.log(error);
        }
    };
    const postEdit = async (postId, text) => {
        try {
            await postModel_1.default.updateOne({ _id: postId }, {
                $set: {
                    description: text,
                },
            }).then((res) => {
                return true;
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    const postLike = async (postId, userId) => {
        console.log(postId, userId, "jello");
        const data = await postModel_1.default.updateOne({ _id: postId, likes: { $ne: userId } }, {
            $addToSet: {
                likes: userId,
            },
        });
        return true;
    };
    const unLike = async (postId, userId) => {
        const data = await postModel_1.default.updateOne({ _id: postId }, {
            $pull: {
                likes: userId,
            },
        }, {
            new: true,
        });
        return true;
    };
    const putComment = async (postId, userId, comment, firstName) => {
        const newId = postId.replace(/:/g, "");
        try {
            const post = await postModel_1.default.findByIdAndUpdate({ _id: newId }, { $push: { comments: { userId: userId, comment: comment, firstName: firstName } } });
            return post;
        }
        catch (error) {
            console.log(error);
        }
    };
    const postDeleteComment = async (postId, userId, index) => {
        const newId = postId.replace(/:/g, "");
        try {
            const post = await postModel_1.default.findById(newId);
            if (!post) {
                return;
            }
            post.comments.splice(index, 1);
            await post.save();
            return post;
        }
        catch (error) {
            console.log(error);
        }
    };
    const addReport = async (postId, userId, reason) => {
        try {
            const newId = postId.replace(/:/g, "");
            const post = await postModel_1.default.findById(newId);
            if (post) {
                const isUserReported = post?.report?.some((report) => report?.userId === userId);
                if (!isUserReported) {
                    // If the user is not already reported, push the new report
                    post?.report?.push({ userId: userId, reason: reason });
                    const updatedPost = await post.save();
                    return updatedPost;
                }
                else {
                    // If the user is already reported, you can handle it here if needed
                    // For example, you can return a message indicating the user is already reported
                    return false;
                }
            }
            else {
                // Post not found with the given postId
                return false;
            }
        }
        catch (error) {
            console.log(error);
            return null; // Handle the error appropriately, such as throwing an exception or returning an error message
        }
    };
    return {
        addPostDetails,
        addReport,
        getPosts,
        getUser,
        fetchUserPost,
        postDelete,
        postEdit,
        postLike,
        unLike,
        putComment,
        postDeleteComment,
    };
};
exports.postRepositoryMongoDb = postRepositoryMongoDb;
