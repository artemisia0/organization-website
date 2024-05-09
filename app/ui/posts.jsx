'use client'

import React from 'react'
import PostCard from '@/app/ui/postCard'
import {userRole} from '@/app/lib/session'
import Link from 'next/link'
import {useEffect, useState} from 'react'
import {postsData, postsCount} from '@/app/actions/posts'


export default function Posts() {
	const [currentPage, setCurrentPage] = useState(1)
	const [pageSize,] = useState(8)
	const [maxPage, setMaxPage] = useState(1)
	const [role, setRole] = useState(null)
	const [postCardsData, setPostCardsData] = useState([])
	const [postCardsCount, setPostCardsCount] = useState(0)

	useEffect(() => {
		userRole().then(res => setRole(res))
	}, [setRole])

	useEffect(() => {
		postsData(currentPage, pageSize).then(res => {
				setPostCardsData(JSON.parse(res))
			}
		) 
	}, [setPostCardsData, currentPage, pageSize, postCardsCount])

	useEffect(() => {
		postsCount().then(
			res =>
			{
				setPostCardsCount(res)
				setMaxPage(
					Math.ceil(
						postCardsCount/Number.parseFloat(pageSize.toString())
					)
				)
			}
		)
		}, [setMaxPage, pageSize, setPostCardsCount, postCardsCount])

	const postCards = postCardsData.map(
		({title, desc, date, author, postID}) => (
			<PostCard
				key={postID}
				title={title}
				desc={desc}
				date={date}
				author={author}
				postID={postID}
				postCardsCount={postCardsCount}
				setPostCardsCount={setPostCardsCount} />
		)
	)

	return (
		<div className="flex flex-col items-center pt-16">
			{role === 'admin' && currentPage === 1 &&
				<div className="flex justify-center  card shadow-lg p-8 m-8">
					<Link className="btn btn-secondary btn-outline"
						href="/addpost">
						Add
					</Link>
				</div>
			}
			{postCards?.length !== 0 &&
				<div className="flex flex-wrap justify-center">
					{postCards}
				</div>
			}
			{maxPage > 1 &&
				<div className="join m-12 p-8 shadow-lg">
					<button className="join-item btn btn-accent btn-outline"
						onClick={() => setCurrentPage(currentPage - 1)}
						disabled={currentPage <= 1}>
						&#8592;
					</button>
					<button className="join-item btn btn-accent btn-outline">
						{currentPage}
					</button>
					<button className="join-item btn btn-accent btn-outline"
						onClick={() => setCurrentPage(currentPage + 1)}
						disabled={currentPage >= maxPage}>
						&#8594;
					</button>
				</div>
			}
		</div>
	)
}

