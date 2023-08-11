"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminAuthController_1 = __importDefault(require("../../../../adapters/controller/admin/adminAuthController"));
const adminAuthServiceInt_1 = require("../../../../application/services/admin/adminAuthServiceInt");
const adminAuthServiceImp_1 = require("../../../services/admin/adminAuthServiceImp");
const adminRepositoryInf_1 = require("../../../../application/repositories/admin/adminRepositoryInf");
const adminAuthRepository_1 = require("../../../database/mongodb/repositories/admin/adminAuthRepository");
const userRepositoryInf_1 = require("../../../../application/repositories/user/userRepositoryInf");
const userAuthRepositoryImp_1 = require("../../../database/mongodb/repositories/user/userAuthRepositoryImp");
const userController_1 = __importDefault(require("../../../../adapters/controller/user/userController"));
const adminAuthRouter = () => {
    const router = express_1.default.Router();
    const adminControllers = (0, adminAuthController_1.default)(adminAuthServiceInt_1.AdminAuthServiceInterface, adminAuthServiceImp_1.adminAuthServices, adminRepositoryInf_1.adminDbRepository, adminAuthRepository_1.adminRepositoryMongodb);
    const controllers = (0, userController_1.default)(userRepositoryInf_1.userDbRepository, userAuthRepositoryImp_1.userRepositoryMongoDB);
    router.post("/login", adminControllers.loginAdmin);
    router.get("/view-users", controllers.getUsers);
    router.get("/view-posts", controllers.viewAllPosts);
    router.put("/block/:userId", controllers.blockUser);
    router.put("/unblock/:userId", controllers.unBlockUser);
    router.put("/reported-remove", controllers.reportRemove);
    router.get("/reported-posts", controllers.reportedPosts);
    router.put('/confirm-report/:postId', controllers.confirmReport);
    return router;
};
exports.default = adminAuthRouter;
