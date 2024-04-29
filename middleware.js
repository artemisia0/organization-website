import {NextResponse} from 'next/server'
import {userRole} from '@/app/lib/session'


export async function middleware(request) {
	const role = await userRole()
	if (role == null
		&& (request.nextUrl.pathname.startsWith('/profile')
			|| request.nextUrl.pathname.startsWith('/logout'))) {
		return NextResponse.rewrite(new URL('/login', request.url))
	}
	if (role !== 'admin'
		&& (request.nextUrl.pathname.startsWith('/editpost')
			|| request.nextUrl.pathname.startsWith('/addpost'))) {
		return NextResponse.rewrite(new URL('/', request.url))
	}
}

