import React from 'react'
import {userRole} from '@/app/lib/session'
import {useEffect, useState} from 'react'
import {deletePost} from '@/app/actions/posts'
import Link from 'next/link'


export default function PostCard({title, desc, date, author, postID,
	setPostCardsCount, postCardsCount}) {
	const [role, setRole] = useState(null)

	useEffect(() => {
		userRole().then(res => setRole(res))
	}, [setRole])

	const deleteButtonCallback = async () => {
		setPostCardsCount(postCardsCount - 1)
		await deletePost(postID)
	}

	return (
		<div className="flex justify-between card  shadow-lg p-8 m-6 w-96">
			<div className="flex flex-col w-auto">
				<h2 className="flex justify-center text-lg font-bold">
					{title}
				</h2>
				<p className="mt-3 mb-3 text-wrap">{desc}</p>
				<div className="text-wrap">
					<span className="font-bold">
						date
					</span>: {date}
				</div>
				<div className="text-wrap">
					<span className="font-bold">
						author
					</span>: {author}
				</div>
				<div className="text-wrap">
					<span className="font-bold">
						ID
					</span>: {postID}
				</div>
			</div>
			<div className="flex flex-row justify-evenly mt-6">
				<Link className="btn btn-primary btn-outline"
					href={"/readpost/" + postID}>
					Read
				</Link>
				{role === 'admin' &&
					<>
						<Link className="btn btn-secondary btn-outline"i
							href={"/editpost/" + postID}>
							Edit
						</Link>
						<button className="btn btn-secondary btn-outline"
							onClick={deleteButtonCallback}>
							Delete
						</button>
					</>
				}
			</div>
		</div>
	)
}
