import React from 'react'
import {profile} from '@/app/actions/profile'
import UserCard from '@/app/ui/userCard'


export default async function ProfilePage() {
	const data = await profile()
	if (data.errorMessage) {
		return (
			<div className="p-24 flex justify-center text-xl font-bold">
				<p>Error: {data.errorMessage}</p>
			</div>
		)
	}

	return (
		<div className="flex flex-col items-center p-24">
			<UserCard
				username={data.username}
				role={data.role} />
		</div>
	)
}

