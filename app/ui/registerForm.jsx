'use client'

import React from 'react'
import {register} from '@/app/actions/auth'
import {useFormState} from 'react-dom'
import SubmitFormButton from '@/app/ui/submitFormButton'


export default function RegisterForm() {
	const [state, formAction] = useFormState(register, null);

	let usernameErrors = null
	if (state?.errors?.username) {
		usernameErrors = (
			<div>
				<ul>
					{state.errors.username.map(
						err =>
							<li className="p-1 m-2 card shadow-lg" key={err}>{err}</li>
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
							<li className="p-1 m-2 card shadow-lg" key={err}>{err}</li>
					)}
				</ul>
			</div>
		)
	}

	const errorMessage = state?.errorMessage

	return (
		<form className="flex flex-col items-center card shadow-lg p-8"
			action={formAction}>
			<input className="input input-bordered input-sm shadow-lg m-3"
				name="username" placeholder="Username" type="none" />
			{usernameErrors && usernameErrors}

			<input className="input input-bordered input-sm shadow-lg m-3"
				name="password" type="password" placeholder="Password" />
			{passwordErrors && passwordErrors}

			{errorMessage &&
				<div className="p-4 m-3 card shadow-lg">
					{errorMessage}
				</div>
			}

			<SubmitFormButton>Register</SubmitFormButton>
		</form>
	)
}

