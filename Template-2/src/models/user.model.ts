import mongoose, { InferSchemaType } from "mongoose";
import bcrypt from "bcryptjs";

// export interface UserDocument extends Document {

// 	id: string;
// 	name: string;
// 	email: string;
// 	password: string;
// 	verified: boolean;
// 	verifyToken: string;
// 	comparePasswords: (password: string) => Promise<boolean>;

// }

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			minLength: 2,
			maxLength: 60,
		},

		email: {
			type: String,
			required: true,
			minLength: 5,
			maxLength: 100,
			unique: true,
		},

		password: {
			type: String,
			required: true,
			minLength: 5,
			maxLength: 100,
		},

		verified: {
			type: Boolean,
			default: false,
		},

		verifyToken: {
			type: String,
			default: null,
		},
	},
	{ timestamps: true }
);

userSchema.pre("save", async function () {

	if (this.isModified("password")) {
		this.password = await bcrypt.hash(this.password, 12);
	}

});

userSchema.methods.verifyPassword = async function (password: string) {
	
	const result: boolean = await bcrypt.compare(password, this.password);
	return result;

};

declare interface IUser extends InferSchemaType<typeof userSchema> {
	
	verifyPassword(password: string): boolean;

}

export default mongoose.model<IUser>("User", userSchema);
