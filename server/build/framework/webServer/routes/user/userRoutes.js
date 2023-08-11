"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userAuthController_1 = __importDefault(require("../../../../adapters/controller/user/userAuthController"));
const userRepositoryInf_1 = require("../../../../application/repositories/user/userRepositoryInf");
const userAuthRepositoryImp_1 = require("../../../database/mongodb/repositories/user/userAuthRepositoryImp");
const userAuthServiceInt_1 = require("../../../../application/services/user/userAuthServiceInt");
const userAuthServiceImp_1 = require("../../../services/user/userAuthServiceImp");
const authRouter = () => {
    const router = express_1.default.Router();
    const controllers = (0, userAuthController_1.default)(userAuthServiceInt_1.AuthServiceInterface, userAuthServiceImp_1.authServices, userRepositoryInf_1.userDbRepository, userAuthRepositoryImp_1.userRepositoryMongoDB);
    router.post("/sign-up", controllers.registerUser);
    router.post("/sign-in", controllers.loginUser);
    router.post("/google", controllers.googleUser);
    router.get("/verify-google-user/:email", controllers.verifyGoogleUser);
    router.put("/:userId", controllers.updateUser);
    router.get("/forgot-password/:email", controllers.emailCheck);
    router.put("/new-password/:email", controllers.newPassword);
    router.get("/:friendId", controllers.getUser);
    router.get("/profile/:userId", controllers.getProfile);
    router.get("/:userId/user", controllers.getUserDetails);
    router.get("/:name/search", controllers.searchUser);
    router.put("/:userId/follow", controllers.putFollower);
    router.put("/:userId/unFollow", controllers.putUnFollow);
    router.get("/:userId/follower", controllers.getFollowers);
    router.get("/:userId/following", controllers.getFollowing);
    router.get("/find-suggest/:userId", controllers.findSuggest);
    return router;
};
exports.default = authRouter;
