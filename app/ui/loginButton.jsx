'use client'

import {useFormState} from 'react-dom'


export default function LoginButton() {
	const {pending} = useFormState()
	return (
		<button disabled={pending}>{pending ? 'Submitting...' : 'Login'}</button>
	)
}

