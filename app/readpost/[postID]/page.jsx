'use client'

import React from 'react'
import {postData} from '@/app/actions/posts'
import {useState, useEffect} from 'react'


export default function ReadPostPage({params}) {
	const [contents, setContents] = useState("Loading...")
	const [title, setTitle] = useState('Loading...')
	const [desc, setDesc] = useState('Loading...')
	const [date, setDate] = useState('Loading...')
	const [author, setAuthor] = useState('Loading...')

	useEffect(
		() => {
			postData(params.postID).then(
				res => {
					const data = JSON.parse(res)
					setContents(data.contents)
					setTitle(data.title)
					setDesc(data.desc)
					setDate(data.date)
					setAuthor(data.author)
				}
			)
		},
		[setContents, setTitle, setDesc, setDate, setAuthor, params.postID]
	)

	return (
		<div className="p-8 m-12 card bg-base-200 shadow-lg">
			<h2>{title}</h2>
			<p>{desc}</p>
			<div>{contents}</div>
			<ul>
				<li key={1}><span className="font-bold">date</span>: {date}</li>
				<li key={2}><span className="font-bold">author</span>: {author}</li>
			</ul>
		</div>
	)
}

