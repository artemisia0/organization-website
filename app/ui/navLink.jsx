'use client'

import {usePathname} from 'next/navigation'
import Link from 'next/link'


export default function NavLink(props) {
	const path = usePathname()

	return (
		<Link {...props} className={`${path === props.href ? 'underline decoration-red-700' : ''}`}>
		</Link>
	)
}

