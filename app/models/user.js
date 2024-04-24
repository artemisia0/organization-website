import 'server-only'

import mongoose from 'mongoose';


const userSchema = new mongoose.Schema(
    {
        username: String,
		hashedPassword: String,
    }
);

export const User = mongoose.models.User || mongoose.model('User', userSchema)

