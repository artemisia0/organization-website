'use client'

import {useFormState} from 'react-dom'


export default function SubmitFormButton(props) {
	const {pending} = useFormState()
	return (
		<button className="btn btn-neutral btn-outline m-4 shadow-lg" disabled={pending}>{pending ? <span className="loading loading-spinner">'Submitting...'</span> : props.children}</button>
	)
}

