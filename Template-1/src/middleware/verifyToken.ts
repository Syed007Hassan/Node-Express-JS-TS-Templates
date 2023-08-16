import jwt, { VerifyErrors } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface User {
  _id: string;
  username: string;
  password: string;
  email: string;
  isAdmin: boolean;
}

interface ExtendedRequest extends Request {
  user: User | undefined;
}

const verifyToken = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.token as string;

  if (authHeader) {
    const token = authHeader.split(" ")[1]; // Bearer <token>
    // console.log(token);

    await jwt.verify(
      token,
      process.env.SECRET_KEY_FOR_CRYPTOJS as string,
      (err: VerifyErrors | null, user: User | undefined) => {
        if (err) {
          // console.log(err);
          return res.status(403).json("Token is not valid!");
        }
        req.user = user;

        next();
      }
    );
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

export default verifyToken;
