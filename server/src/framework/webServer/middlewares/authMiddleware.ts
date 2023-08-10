import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../../../types/httpstatuscodes";
import AppError from "../../../utilities/appError";
import { authServices } from "../../services/user/userAuthServiceImp";

const userAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: string | null = null;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    // console.log('kitty');
    token = req.headers.authorization.split(" ")[1];
    token = token.replace(/"/g, "");
    // console.log(token);
  }
  if (!token) {
    throw new AppError("Token not found", HttpStatus.UNAUTHORIZED);
  }
  try {
    const { payload }: any = authServices().verifyToken(token);
    if (payload) {
      next();
    }
  } catch (error) {
    throw new AppError("Unauthorized user", HttpStatus.UNAUTHORIZED);
  }
};

export default userAuthMiddleware;
