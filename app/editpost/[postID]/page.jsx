'use client'

import React from 'react'
import {editPost, postData} from '@/app/actions/posts'
import SubmitFormButton from '@/app/ui/submitFormButton'
import {useFormState} from 'react-dom'
import {useState, useEffect} from 'react'


export default function EditPostPage({params}) {
	const [, formAction] = useFormState(editPost, null)
	const [title, setTitle] = useState("Loading...")
	const [desc, setDesc] = useState("Loading...")
	const [contents, setContents] = useState("Loading...")

	useEffect(
		() => {
			postData(params.postID).then(
				data => {
					data = JSON.parse(data)
					setTitle(data.title)
					setDesc(data.desc)
					setContents(data.contents)
				}
			)
		},
		[params.postID, setTitle, setDesc, setContents]
	)

	const handleTitleChange = event => {
		setTitle(event.target.value)
	}

	const handleDescChange = event => {
		setDesc(event.target.value)
	}

	const handleContentsChange = event => {
		setContents(event.target.value)
	}

	return (
		<form className="card shadow-lg bg-base-200 p-8 m-12"
			action={formAction}>
			<input name="postID" type="hidden" defaultValue={params.postID} />
			<input name="title" placeholder="Title"
				className="input input-bordered m-4" 
				onChange={handleTitleChange}
				value={title} />
			<textarea name="desc" placeholder="Description"
				className="textarea textarea-bordered m-4"
				onChange={handleDescChange}
				value={desc} />
			<textarea name="contents" placeholder="Contents"
				className="textarea textarea-bordered m-4"
				onChange={handleContentsChange}
				value={contents} />
			<SubmitFormButton>Edit</SubmitFormButton>
		</form>
	)
}

