"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../../../../adapters/controller/user/userController"));
const userRepositoryInf_1 = require("../../../../application/repositories/user/userRepositoryInf");
const userAuthRepositoryImp_1 = require("../../../database/mongodb/repositories/user/userAuthRepositoryImp");
const userRouter = () => {
    const router = express_1.default.Router();
    const controllers = (0, userController_1.default)(userRepositoryInf_1.userDbRepository, userAuthRepositoryImp_1.userRepositoryMongoDB);
    router.get("/view-users", controllers.getAllUsers);
    // router.get("/:friendId", controllers.getUser);
    return router;
};
exports.default = userRouter;
