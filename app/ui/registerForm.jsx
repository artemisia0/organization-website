'use client'

import {register} from '@/app/actions/auth'
import {useFormState} from 'react-dom'
import RegisterButton from '@/app/ui/registerButton'


export default function RegisterForm() {
	const [state, formAction] = useFormState(register);

	let usernameErrors = null
	if (state?.errors?.username) {
		usernameErrors = (
			<div>
				<ul>
					{state.errors.username.map(
						err =>
							<li className="p-1 m-2 card bg-base-100" key={err}>{err}</li>
					)}
				</ul>
			</div>
		)
	}

	let passwordErrors = null
	if (state?.errors?.password) {
		passwordErrors = (
			<div>
				<ul>
					{state.errors.password.map(
						err =>
							<li className="p-1 m-2 card bg-base-100" key={err}>{err}</li>
					)}
				</ul>
			</div>
		)
	}

	const errorMessage = state?.errorMessage

	return (
		<form className="flex flex-col items-center" action={formAction}>
			<div className="p-4 m-3 card bg-base-200 shadow-xl">
				<label htmlFor="username">Username</label>
				<input className="card shadow-lg" id="username" name="username" type="text" />
			{usernameErrors && usernameErrors}
			</div>

			<div className="p-4 m-3 card bg-base-200 shadow-xl">
				<label htmlFor="Password">Password</label>
				<input className="card shadow-lg" id="password" name="password" type="password" />
			{passwordErrors && passwordErrors}
			</div>

			{errorMessage &&
				<div className="p-4 m-3 card bg-base-200 shadow-xl">
					{errorMessage}
				</div>
			}

			<RegisterButton />
		</form>
	)
}
