"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAuthServiceInterface = void 0;
const AdminAuthServiceInterface = (service) => {
    const generateAdminToken = async (id) => {
        return service.generateAdminToken(id);
    };
    return { generateAdminToken };
};
exports.AdminAuthServiceInterface = AdminAuthServiceInterface;
