'use server'

import {Post} from '@/app/models/post'
import {connectDB} from '@/app/lib/connectDB'
import {redirect} from 'next/navigation'


export async function postsData(currentPage, pageSize) {
	await connectDB()

	return JSON.stringify(
		await Post
		.find({}, 'title desc date author postID contents')
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
	const contents = formData.get('contents')

	const newPost = new Post({
		title, 
		desc, 
		date, 
		author,
		contents,
		postID: await biggestPostID() + 1
	})
	await newPost.save()
	redirect('/')
}

export async function editPost(currentState, formData) {
	await connectDB()

	const title = formData.get('title')
	const desc = formData.get('desc')
	const contents = formData.get('contents')
	const postID = parseInt(formData.get('postID'))

	const newPostData = {
		title, 
		desc, 
		contents,
	}

	await Post.updateOne({postID}, newPostData)
	redirect('/')
}

export async function deletePost(postID) {
	await connectDB()

	await Post.deleteOne({postID})
}

export async function postData(postID) {
	await connectDB()

	return JSON.stringify(await Post.findOne({postID}))
}

