'use server'

import {cookies} from 'next/headers'
import {decrypt} from '@/app/lib/session'


export async function profile() {
	const session = cookies().get('session')?.value
	if (!session) {
		return {
			errorMessage: "No session"
		}
	}

	const payload = await decrypt(session)
	const username = payload.username
	const role = payload.role
	return {
		username,
		role,
	}
}

