import mongoose from 'mongoose'


const postSchema = new mongoose.Schema({
	title: String,
	desc: String,
	date: String,
	username: String,
	postID: Number,
})

export const Post = mongoose.models.Post || mongoose.model('Post', postSchema)

