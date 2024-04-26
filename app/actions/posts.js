'use server'

import {Post} from '@/app/models/post'
import {connectDB} from '@/app/lib/connectDB'


export async function postsData(currentPage, pageSize) {
	await connectDB()

	const startIndex = (currentPage-1)*pageSize
	const endIndex = currentPage*pageSize
	return JSON.stringify(
		await Post
		.find({}, 'title desc date author postID')
		.sort({postID: -1})
		.skip(startIndex)
		.limit(endIndex)
	)
}

export async function postsCount() {
	await connectDB()

	return await Post.countDocuments()
}

async function biggestPostID() {
	await connectDB()

	let result = await Post
		.findOne({}, 'postID')
		.sort({postID: -1})
		.limit(1)

	if (!result) {
		return 0
	}

	result = parseInt(result.postID)

	return result
}

export async function addPost(currentState, formData) {
	await connectDB()

	const title = formData.get('title')
	const desc = formData.get('desc')
	const date = formData.get('date')
	const author = formData.get('author')

	const newPost = new Post({
		title, 
		desc, 
		date, 
		author,
		postID: await biggestPostID() + 1
	})
	await newPost.save()
}

export async function deletePost(postID) {
	await connectDB()

	await Post.deleteMany({postID})
}

