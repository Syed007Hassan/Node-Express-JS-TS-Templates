import Joi from "joi";

export const validateSignupInput = (user: any) => {
	const schema = Joi.object({
		name: Joi.string().min(2).max(60).required(),
		email: Joi.string().min(5).max(100).required().email(),
		password: Joi.string().min(5).max(100).required(),
	});

	return schema.validate(user, {
		errors: {
			wrap: {
				label: ""
			},
		},
	});
};


export const validateLoginInput = (user: any) => {

	const schema = Joi.object({
		email: Joi.string().min(5).max(100).required().email(),
		password: Joi.string().min(5).max(100).required(),
	});

	return schema.validate(user, {
		errors: {
			wrap: {
				label: ""
			},
		},
	});
	
}