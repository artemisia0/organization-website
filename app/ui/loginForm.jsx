'use client'

import React from 'react'
import {useFormState} from 'react-dom'
import {login} from '@/app/actions/auth'
import SubmitFormButton from '@/app/ui/submitFormButton'


export default function LoginForm() {
	const [, formAction] = useFormState(login, null)

	return (
		<form action={formAction} className="flex items-center flex-col card shadow-lg p-8">
			<input name="username" placeholder="Username" type="none"
				className="input input-bordered input-sm shadow-lg m-3"/>
			<input type="password" name="password" placeholder="Password"
				className="input input-bordered input-sm shadow-lg m-3"/>
			<SubmitFormButton>Login</SubmitFormButton>
		</form>
	)
}

