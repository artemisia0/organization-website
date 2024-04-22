import mongoose from 'mongoose';


const userSchema = new mongoose.Schema(
    {
        username: String,
        firstName: String,
        lastName: String,
        age: Number,
    }
);

const User = mongoose.model('User', userSchema);

export default User;

