import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import HttpError from "../util/HttpError";

export interface CustomJwtPayload extends JwtPayload {
	id: string;
}

export interface CustomRequest extends Request {
	token: CustomJwtPayload;
}

const auth = (req: Request, res: Response, next: NextFunction) => {
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer ")
	) {
		const token = req.headers.authorization.split(" ")[1];

		if (!token) {			
			return next(new HttpError("Authentication failed!", 401));
		}

		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as CustomJwtPayload;
			(req as CustomRequest).token = decoded;
			next();
		} catch (err) {
			return next(new HttpError("Authentication failed!", 401));
		}
	} else {
		return next(new HttpError("Authentication failed!", 401));
	}
};

export default auth;
