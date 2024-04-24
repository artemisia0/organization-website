import 'server-only'

import {SignJWT, jwtVerify} from 'jose'
import {cookies} from 'next/headers'
import {redirect} from 'next/navigation'


const secretKey = process.env.SESSION_SECRET
if (!secretKey) {
	console.error("SESSION_SECRET is not set!")
	process.exit(1)
}

const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload) {
	return new SignJWT(payload)
		.setProtectedHeader({alg: "HS256"})
		.setIssuedAt()
		.setExpirationTime('5m')
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
		console.log("Failed to verify session")
	}
}

export async function createSession(username) {
	const expiresAt = new Date(Date.now() + 5 * 60 * 1000)
	const session = await encrypt({username, expiresAt})

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

	const expires = new Date(Date.now() + 5 * 60 * 1000)
	cookies().set('session', session, {
		httpOnly: true,
		secure: true,
		expires,
		sameSite: 'lax',
		path: '/',
	})
}

export function deleteSession() {
	cookies().delete('session')
}

