'use client'

import React from 'react'
import {addPost} from '@/app/actions/posts'
import SubmitFormButton from '@/app/ui/submitFormButton'
import {useFormState} from 'react-dom'


export default function AddPostPage() {
	const [, formAction] = useFormState(addPost, null)

	return (
		<form className="card shadow-lg bg-base-200 p-8 m-12"
			action={formAction}>
			<input name="title" placeholder="Title"
				className="input input-bordered m-4" />
			<textarea name="desc" placeholder="Description"
				className="textarea textarea-bordered m-4" />
			<input name="date" placeholder="Date"
				className="input input-bordered m-4" />
			<input name="author" placeholder="Author"
				className="input input-bordered m-4" />
			<textarea name="contents" placeholder="Contents"
				className="textarea textarea-bordered m-4" />
			<SubmitFormButton>Add</SubmitFormButton>
		</form>
	)
}

