import { adminRepositoryMongodb } from "../../../framework/database/mongodb/repositories/admin/adminAuthRepository";

export const adminDbRepository = (
  repository: ReturnType<adminRepositoryMongodb>
) => {};
export type adminDbInterface = typeof adminDbRepository;
