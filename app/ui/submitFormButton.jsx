'use client'

import React from 'react'
import {useFormStatus} from 'react-dom'


export default function SubmitFormButton(props) {
	const {pending} = useFormStatus()

	return (
		<button className="btn btn-neutral btn-outline m-4 shadow-lg" disabled={pending}>{pending ? <span className="loading loading-spinner"></span> : props?.children}</button>
	)
}

