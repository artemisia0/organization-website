import {User} from '@/app/models/user';
import {connectDB} from '@/app/lib/connectDB';


export async function GET(request) {
	await connectDB();

	return Response.json(
		{
			data: await User.find()
		}
	)
}

