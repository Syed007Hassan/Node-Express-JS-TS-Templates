import mongoose from "mongoose";

async function mongoConnect(callback?: () => void) {
	const MONGO_URI = process.env.MONGO_URI || "";

	await mongoose
		.connect(MONGO_URI)
		.then(() => {			
			console.log("MongoDB connected");
			callback?.();
		})
		.catch((err) => {
			console.log(err);
			process.exit(1);
		});
}

async function mongoDisconnect() {
	await mongoose.disconnect();
	console.log("MongoDB disconnected");
}

export { mongoConnect, mongoDisconnect };
