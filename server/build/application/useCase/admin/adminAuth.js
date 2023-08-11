"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAdmin = void 0;
const checkAdmin = async (admin, adminRepository, adminAuthService) => {
    let credentials = {
        email: "mohammedriyazriyaz04@gmail.com",
        password: "123",
    };
    if (admin.password == credentials.password &&
        admin.email == credentials.email) {
        let id = 1516239022;
        const token = await adminAuthService.generateAdminToken(id.toString());
        return { status: true, admin, token };
    }
    else {
        return { status: false };
    }
    return {
        checkAdmin: exports.checkAdmin,
    };
};
exports.checkAdmin = checkAdmin;
