import { Request, Response } from "express";
import AsyncHandler from "express-async-handler";
import { adminAuthServices } from "../../../framework/services/admin/adminAuthServiceImp";
import { AdminAuthServiceInterface } from "../../../application/services/admin/adminAuthServiceInt";
import { adminRepositoryMongodb } from "../../../framework/database/mongodb/repositories/admin/adminAuthRepository";
import { adminDbInterface } from "../../../application/repositories/admin/adminRepositoryInf";
import { checkAdmin } from "../../../application/useCase/admin/adminAuth";

const adminAuthController = (
  AdminAuthServiceInterface: AdminAuthServiceInterface,
  adminAuthService: adminAuthServices,
  adminDbInterface: adminDbInterface,
  adminDbService: adminRepositoryMongodb
) => {
  const dbAdminRepository = adminDbInterface(adminDbService());
  const adminAuthServices = AdminAuthServiceInterface(adminAuthService());
  const loginAdmin = AsyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const admin = { email, password };
    const data = await checkAdmin(admin, dbAdminRepository, adminAuthServices);
    if (data.status) {
      res.json({ status: true, data });
    } else {
      res.json({ status: false });
    }
  });

  return {
    loginAdmin,
  };
};
export default adminAuthController;
