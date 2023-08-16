import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import HttpError from "../util/HttpError";
import { validateLoginInput, validateSignupInput } from "../validations/Validations";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendVerificationEmail } from "../services/email";

const login = async (req: Request, res: Response, next: NextFunction) => {
	const result = validateLoginInput(req.body);

	if (result.error) {
		return next(new HttpError(result.error.details[0].message, 422));
	}

	const { email, password } = req.body;
	let existingUser;

	try {
		existingUser = await User.findOne({ email });
	} catch (error) {
		return next(new HttpError("Cannot login, please try again later.", 500));
	}

	if (!existingUser) {
		return next(new HttpError("Login failed: wrong credentials.", 401));
	}

	if (!(await existingUser.verifyPassword(password))) {
		return next(new HttpError("Login failed: wrong credentials.", 401));
	}

	if (!existingUser.verified) {
		return next(new HttpError("Please verify your email address.", 401));
	}

	let token;

	try {
		token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET as string, {
			expiresIn: "7d",
		});
	} catch (err) {
		return next(new HttpError("Cannot login, please try again.", 500));
	}

	res.status(200).json({
		id: existingUser.id,
		email: existingUser.email,
		token: token,
	});
};

const signup = async (req: Request, res: Response, next: NextFunction) => {
	const result = validateSignupInput(req.body);

	if (result.error) {
		return next(new HttpError(result.error.details[0].message, 422));
	}

	let { name, email, password } = req.body;
	let existingUser;

	try {
		existingUser = await User.findOne({ email });

		if (existingUser) {
			return next(new HttpError("Email already exists.", 409));
		}
	} catch (err) {
		return next(new HttpError("Cannot register new user, please try again later.", 500));
	}

	const newUser = new User({
		name,
		email,
		password: password,
		verified: false,
		verifyToken: crypto.randomBytes(32).toString("hex"),
	});

	try {
		await newUser.save();
		await sendVerificationEmail(newUser.email, newUser.verifyToken);
	} catch (err) {
		return next(new HttpError("Creating user failed, please try again.", 500));
	}

	res.status(201).json({
		id: newUser.id,
		email: newUser.email,
		//token: token
	});
};

const verify = async (req: Request, res: Response, next: NextFunction) => {
	const { token } = req.params;

	let user;

	try {
		user = await User.findOne({ verifyToken: token });
	} catch (err) {
		return next(new HttpError("Cannot verify email, please try again later.", 500));
	}

	if (!user) {
		return next(new HttpError("This link is invalid or has expired.", 401));
	}

	user.verified = true;
	user.verifyToken = "";

	try {
		await user.save();
	} catch (err) {
		return next(new HttpError("Cannot verify email, please try again later.", 500));
	}

	res.status(200).json({
		id: user.id,
		email: user.email,
		verified: user.verified,
	});
};

export { login, signup, verify };
