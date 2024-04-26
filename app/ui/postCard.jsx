import React from 'react'
import {userRole} from '@/app/lib/session'
import {useEffect, useState} from 'react'
import {deletePost} from '@/app/actions/posts'
import Link from 'next/link'


export default function PostCard({title, desc, date, author, postID}) {
	const [role, setRole] = useState(null)

	useEffect(() => {
		userRole().then(res => setRole(res))
	}, [setRole])

	return (
		<div className="flex justify-between card bg-base-200 shadow-lg p-8 m-6 w-96">
			<div>
				<h2 className="flex justify-center text-lg font-bold">
					{title}
				</h2>
				<p className="mt-3 mb-3">{desc}</p>
				<ul>
					<li key={1}>
						<span className="font-bold">
							date
						</span>: {date}
					</li>
					<li key={2}>
						<span className="font-bold">
							author
						</span>: {author}
					</li>
					<li key={3}>
						<span className="font-bold">
							ID
						</span>: {postID}
					</li>
				</ul>
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
							onClick={async () => await deletePost(postID)}>
							Delete
						</button>
					</>
				}
			</div>
		</div>
	)
}
