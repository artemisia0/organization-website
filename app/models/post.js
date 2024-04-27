import mongoose from 'mongoose'


const postSchema = new mongoose.Schema({
	title: String,
	desc: String,
	date: String,
	author: String,
	contents: String,
	postID: Number,
})

export const Post = mongoose.models.Post || mongoose.model('Post', postSchema)

