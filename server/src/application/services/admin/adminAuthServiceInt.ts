import { adminAuthServiceReturn } from "../../../framework/services/admin/adminAuthServiceImp";

export const AdminAuthServiceInterface = (service: adminAuthServiceReturn) => {
  const generateAdminToken = async (id: string) => {
    return service.generateAdminToken(id);
  };
  return { generateAdminToken };
};

export type AdminAuthServiceInterface = typeof AdminAuthServiceInterface;
