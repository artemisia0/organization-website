import 'server-only'

import mongoose from 'mongoose';


export async function disconnectDB() {
	try {
		await mongoose.disconnect();
		global.isConnectedToDB = false;
		console.log("Disconnected from DB");
	} catch(err) {
		console.error(`Failed to disconnect from DB: ${err}`);
		process.exit(1);
	}
}

global.isConnectedToDB = false;

export async function connectDB() {
	if (global.isConnectedToDB) {
		return;
	}
	try {
		const DB_URI = process.env.DB_URI;
		if (!DB_URI) {
			console.error("DB_URI environment variable is not set!");
			process.exit(1);
		}
		await mongoose.connect(DB_URI);
		global.isConnectedToDB = true;
		process.on('beforeExit', async () => await disconnectDB());
		console.log("Connected to DB");
	} catch (err) {
		console.error(`Failed to connect to DB: ${err}`);
		process.exit(1);
	}
}

