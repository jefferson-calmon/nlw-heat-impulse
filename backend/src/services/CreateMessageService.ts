import { io } from "../app";
import prismaClient from "../prisma";

class CreateMessageService {
	async execute(text: string, user_id: string) {
		const message = await prismaClient.message.create({
			data: {
				text,
				user_id,
			},
			include: {
				user: true,
			},
		});

		const infoWS = {
			...message,
		};

		io.emit("new_message", infoWS);

		return message;
	}
}

export { CreateMessageService };
