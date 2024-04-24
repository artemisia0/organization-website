'use client'

import {logout} from '@/app/actions/auth'


export default function LogoutPage() {
	return (
		<button
			className="btn btn-neutral btn-outline shadow-lg"
			onClick={async () => logout()}
		>
			Logout
		</button>
	)
}

