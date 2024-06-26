'use server'
import 'server-only'

import {SignJWT, jwtVerify} from 'jose'
import {cookies} from 'next/headers'
import {sessionLifetime} from '@/app/lib/common'


const secretKey = process.env.SESSION_SECRET
if (!secretKey) {
	console.error("SESSION_SECRET is not set!")
	throw new Error("SESSION_SECRET is not set!")
}

const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload) {
	return new SignJWT(payload)
		.setProtectedHeader({alg: "HS256"})
		.setIssuedAt()
		.setExpirationTime(parseInt((sessionLifetime/60/1000).toString())+'m')
		.sign(encodedKey)
}

export async function decrypt(session) {
	try {
		const {payload} = await jwtVerify(session, encodedKey, {
				algorithms: ['HS256'],
			}
		)
		return payload
	} catch(err) {
		console.log("Failed to verify session: " + err)
	}
}

export async function createSession(username) {
	const expiresAt = new Date(Date.now() + sessionLifetime)
	const role = (username === 'admin' ? 'admin' : 'user')
	const session = await encrypt(
		{
			username,
			expiresAt,
			role,
		}
	)

	cookies().set('session', session, {
		httpOnly: true,
		secure: true,
		expires: expiresAt,
		sameSite: 'lax',
		path: '/'
	})
}

export async function updateSession() {
	const session = cookies().get('session')?.value
	const payload = await decrypt(session)

	if (!session || !payload) {
		return
	}

	const expires = new Date(Date.now() + sessionLifetime)
	cookies().set('session', session, {
		httpOnly: true,
		secure: true,
		expires,
		sameSite: 'lax',
		path: '/',
	})
}

export async function deleteSession() {
	cookies().delete('session')
}

export async function userRole() {
	const session = cookies().get('session')?.value
	let role = null
	if (session) {
		const payload = await decrypt(session)
		role = payload?.role
	}
	return role
}

