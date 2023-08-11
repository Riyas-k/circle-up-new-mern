"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = __importDefault(require("../../../../adapters/controller/user/postController"));
const postDbRepositoryInterface_1 = require("../../../../application/repositories/user/postDbRepositoryInterface");
const postRepositoryImp_1 = require("../../../database/mongodb/repositories/user/postRepositoryImp");
const postRouter = () => {
    const router = express_1.default.Router();
    const controllers = (0, postController_1.default)(postDbRepositoryInterface_1.postRepository, postRepositoryImp_1.postRepositoryMongoDb);
    router.post("/edit_post", controllers.editPost);
    router.post("/:userId", controllers.addPost);
    router.get("/posts/:userId", controllers.fetchPosts);
    router.get("/post/:userId", controllers.fetchUserPosts);
    router.delete("/:postId/post", controllers.deletePost);
    router.put("/:postId/like", controllers.likedPost);
    router.put("/:postId/unLike", controllers.unLikePost);
    router.put("/:postId/comment", controllers.addComment);
    router.put("/:postId/delete-comment", controllers.deleteComment);
    router.put('/:postId/report-post', controllers.reportPost);
    return router;
};
exports.default = postRouter;
