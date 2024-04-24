import {z} from 'zod';


const registerFormSchema = z.object(
	{
		username: z
			.string()
			.min(5, {message: "Username must be at least 5 characters long."})
			.trim(),
		password: z
			.string()
			.min(8, {message: "Password must be at least 8 characters long."})
			.regex(/[a-zA-Z]/,{message: "Should contain at least one letter."})
			.regex(/[0-9]/, {message: "Should contain at least one digit."})
			.trim(),
	}
);

export default registerFormSchema;

