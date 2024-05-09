'use client'

import React from 'react'
import {usePathname} from 'next/navigation'
import Link from 'next/link'


export default function NavLink(props) {
	const path = usePathname()

	const underlineStyle = ` ${path === props?.href ? 'underline decoration-black' : ''} `
	if (!props.className) {
		props.className = " "
	}
	return (
		<Link className={props.className + underlineStyle} href={props.href}>
			{props.children}
		</Link>
	)
}

