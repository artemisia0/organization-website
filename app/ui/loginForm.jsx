'use client'

import {useFormState} from 'react-dom'
import {login} from '@/app/actions/auth'
import SubmitFormButton from '@/app/ui/submitFormButton'


export default function LoginForm() {
	const [state, formAction] = useFormState(login)

	return (
		<form action={formAction} className="flex items-center flex-col card shadow-xl p-8 bg-base-200">
			<input name="username" placeholder="Username" type="none"
				className="input input-bordered input-sm shadow-lg bg-base-100 m-3"/>
			<input type="password" name="password" placeholder="Password"
				className="input input-bordered input-sm shadow-lg bg-base-100 m-3"/>
			<SubmitFormButton>Login</SubmitFormButton>
		</form>
	)
}
