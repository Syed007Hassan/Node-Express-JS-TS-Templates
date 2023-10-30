// import sgMail from "@sendgrid/mail";

// sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

// export const sendVerificationEmail = async (to: string, token: string) => {

// 	const msg = {
// 		to: to,
// 		from: process.env.SENDGRID_SENDER_EMAIL as string,
// 		subject: "Verify your email address",
// 		text: `Please verify your email address by clicking the link below:
// 		 	${process.env.CLIENT_URL}/login/verify/${token}`,
// 		html: `<p>Please verify your email address by clicking the link below:</p>
// 		<a href="${process.env.CLIENT_URL}/login/verify/${token}">Verify Email</a>`,
// 	};

// 	try {
// 		await sgMail.send(msg);
// 	} catch (err) {
// 		console.log(err);
// 	}

// };
