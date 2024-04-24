'use server'

import {decrypt} from '@/app/lib/session'
import {cookies} from 'next/headers'
import {profile} from '@/app/actions/profile'


export async function GET(request) {
	return Response.json(await profile())
	const session = cookies().get('session')?.value
	if (!session) {
		return Response.json(
			{
				errorMessage: "No session"
			}
		)
	}

	const payload = await decrypt(session)
	const username = payload.username
	return Response.json(
		{
			username
		}
	)
}

