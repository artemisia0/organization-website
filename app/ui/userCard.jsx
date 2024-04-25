import React from 'react'


export default function UserCard(props) {
	const userData = Object.entries(props)
	const fields = []
	for (const [key, value] of userData) {
		fields.push(
			<li key={key} className="card bg-base-100 shadow-lg p-2 m-3">
				<p><span className="font-bold">{key}</span>: {value}</p>
			</li>
		)
	}
	return (
		<div className="card shadow-xl bg-base-200 p-8">
			{fields.length &&
				<ul>
					{fields}
				</ul>
			}
			{props?.children && props.children}
		</div>
	)
}

