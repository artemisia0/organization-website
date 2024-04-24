import {useFormStatus} from 'react-dom'


export default function RegisterButton() {
	const {pending} = useFormStatus()

	return (
		<button className="m-4 btn btn-neutral btn-outline shadow-lg" disabled={pending} type="submit">
			{pending ? 'Submitting...' : 'Register'}
		</button>
	)
}
