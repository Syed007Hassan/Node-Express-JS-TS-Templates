import jwt, { VerifyErrors } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface User {
  username: string;
  password: string;
  email: string;
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.token as string;

  if (authHeader) {
    const token = authHeader.split(" ")[1]; // Bearer <token>
    console.log(token);

    await jwt.verify(
      token,
      process.env.SECRET_KEY_FOR_CRYPTOJS as string,
      (err: VerifyErrors | null, user: User | undefined) => {
        if (err) {
          // console.log(err);
          return res.status(403).json("Token is not valid!");
        }
        const users = req.user as User;

        next();
      }
    );
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

export default verifyToken;
