
import prismaClient from "../prisma";

class GetLast3MessagesService {
	async execute() {
        const messages = await prismaClient.message.findMany({
            orderBy: {
                created_at: 'desc'
            },
            take: 3,
            include: {
                user: true
            }
        });

        return messages;
	}
}

export { GetLast3MessagesService };
