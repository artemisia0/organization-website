'use server'

import {Post} from '@/app/models/post'
import {connectDB} from '@/app/lib/connectDB'


export async function postsData(currentPage, pageSize) {
	await connectDB()

	return JSON.stringify(
		await Post
		.find({}, 'title desc date author postID')
		.sort({postID: -1})
		.skip(currentPage*pageSize - pageSize)
		.limit(pageSize)
	)
}

export async function postsCount() {
	await connectDB()

	const arr = await Post.find()
	return arr.length
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

