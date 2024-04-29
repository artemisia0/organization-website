import {NextResponse} from 'next/server'
import {userRole} from '@/app/lib/session'


export async function middleware(request) {
	if (await userRole() == null
		&& (request.nextUrl.pathname.startsWith('/profile')
			|| request.nextUrl.pathname.startsWith('/logout'))) {
		return NextResponse.rewrite(new URL('/login', request.url))
	}
	if (await userRole() !== 'admin'
		&& (request.nextUrl.pathname.startsWith('/editpost')
			|| request.nextUrl.pathname.startsWith('/addpost'))) {
		return NextResponse.rewrite(new URL('/', request.url))
	}
}

