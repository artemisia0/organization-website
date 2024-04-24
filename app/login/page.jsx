'use client'

import {login} from '@/app/actions/auth'
import {useFormState} from 'react-dom'
import LoginButton from '@/app/ui/loginButton'


export default function LoginPage() {
	const [state, formAction] = useFormState(login)
	return (
		<form action={formAction}>
			<input type="text" name="username" placeholder="Username" />
			<input type="password" name="password" placeholder="Password" />
			<LoginButton></LoginButton>
		</form>
	)
}

