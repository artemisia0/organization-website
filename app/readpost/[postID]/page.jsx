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
		<div className="p-8 m-12 card shadow-lg">
			<h2>{title}</h2>
			<p>{desc}</p>
			<div className="text-wrap m-4 p-8">{contents}</div>
			<ul>
				<li key={1}>
					<span className="font-bold">date</span>: <p>{date}</p>
				</li>
				<li key={2}>
					<span className="font-bold">author</span>: <p>{author}</p>
				</li>
			</ul>
		</div>
	)
}

