import {profile} from '@/app/actions/profile'


export default async function ProfilePage() {
	const data = await profile()
	if (data.errorMessage) {
		return (
			<div>
				<p>{data.errorMessage}</p>
			</div>
		)
	}

	return (
		<div>
			<p>Your profile page.</p>
			<p>Your username: {data.username}</p>
		</div>
	)
}

