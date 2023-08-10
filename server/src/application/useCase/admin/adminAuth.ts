import { adminDbInterface } from "../../repositories/admin/adminRepositoryInf";
import { AdminAuthServiceInterface } from "../../services/admin/adminAuthServiceInt";

export const checkAdmin = async (
  admin: { email: string; password: string },
  adminRepository: ReturnType<adminDbInterface>,
  adminAuthService: ReturnType<AdminAuthServiceInterface>
) => {
  let credentials = {
    email: "mohammedriyazriyaz04@gmail.com",
    password: "123",
  };
  if (
    admin.password == credentials.password &&
    admin.email == credentials.email
  ) {
    let id = 1516239022;
    const token = await adminAuthService.generateAdminToken(id.toString());
    return { status: true, admin, token };
  } else {
    return { status: false };
  }

  return {
    checkAdmin,
  };
};
