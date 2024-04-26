'use client'

import React from 'react'
import {logout} from '@/app/actions/auth'
import {useFormState} from 'react-dom'
import SubmitFormButton from '@/app/ui/submitFormButton'


export default function LogoutPage() {
	const [, formAction] = useFormState(logout)

	return (
		<div className="p-24 flex justify-center">
			<form action={formAction} className="p-12 card bg-base-200 shadow-lg">
				<SubmitFormButton>Logout</SubmitFormButton>
			</form>
		</div>
	)
}

