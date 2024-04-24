'use server'
import 'server-only'

import registerFormSchema from '@/app/lib/registerFormSchema'
import {User} from '@/app/models/user'
import {createSession, deleteSession} from '@/app/lib/session'
import {connectDB} from '@/app/lib/connectDB'
import bcrypt from 'bcrypt'
import {redirect} from 'next/navigation'


export async function register(currentState, formData) {
	await connectDB()

	// Validating form data
	const validatedFields = registerFormSchema.safeParse(
		{
			username: formData.get('username'),
			password: formData.get('password'),
		}
	);

	// Handling form validation errors
	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			errorMessage: "Invalid form field values."
		}
	}

	// Checking if such user already exists
	const {username, password} = validatedFields.data
	if (await User.findOne({username}).lean()) {
		return {
			errorMessage: "Such user already exists."
		}
	}

	// Saving new user to DB
	const hashedPassword = await bcrypt.hash(password, 10)
	try {
		const newUser = new User({username, hashedPassword})
		await newUser.save()
	} catch(err) {
		return {
			errorMessage: "Failed to create such a user account."
		}
	}

	await createSession(username)
	redirect('/profile')
	return null
}

export async function logout() {
	deleteSession()
	redirect('/login')
	return null
}

export async function login(currentState, formData) {
	await connectDB()

	const username = formData.get('username')
	const password = formData.get('password')
	const found = await User.findOne({username})
	if (!found) {
		return {
			errorMessage: "Invalid username"
		}
	}
	const isPasswordValid
		= await bcrypt.compare(password, found.hashedPassword)
	if (!isPasswordValid) {
		return {
			errorMessage: "Invalid password"
		}
	}
	await createSession(username)
	redirect('/profile')
	return null
}

