import {connectDB} from '@/app/lib/connectDB';
import User from '@/app/models/user';


export async function GET(request, context) {
	await connectDB();
	return Response.json(
		{
			data: await User.findOne(
				{
					username: context.params.username,
				}
			)
		}
	)
}

