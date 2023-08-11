"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const adminAuth_1 = require("../../../application/useCase/admin/adminAuth");
const adminAuthController = (AdminAuthServiceInterface, adminAuthService, adminDbInterface, adminDbService) => {
    const dbAdminRepository = adminDbInterface(adminDbService());
    const adminAuthServices = AdminAuthServiceInterface(adminAuthService());
    const loginAdmin = (0, express_async_handler_1.default)(async (req, res) => {
        const { email, password } = req.body;
        const admin = { email, password };
        const data = await (0, adminAuth_1.checkAdmin)(admin, dbAdminRepository, adminAuthServices);
        if (data.status) {
            res.json({ status: true, data });
        }
        else {
            res.json({ status: false });
        }
    });
    return {
        loginAdmin,
    };
};
exports.default = adminAuthController;
