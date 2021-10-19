import axios from "axios";
import { sign } from "jsonwebtoken";

import prismaClient from "../prisma";

interface AccessTokenResponse {
    access_token: string;
}

interface UserResponse {
    avatar_url: string;
    login: string;
    id: number;
    name: string;
}

class AuthenticateUserService {
    async execute(code: string) {
        const url = "https://github.com/login/oauth/access_token";

        const { data: accessTokenResponse } =
            await axios.post<AccessTokenResponse>(url, null, {
                params: {
                    client_id: process.env.GITHUB_CLIENT_ID,
                    client_secret: process.env.GITHUB_CLIENT_SECRET,
                    code,
                },
                headers: {
                    Accept: "application/json",
                },
            });

        const { data: userResponse } = await axios.get<UserResponse>(
            "https://api.github.com/user",
            {
                headers: {
                    Authorization: `Bearer ${accessTokenResponse.access_token}`,
                },
            }
        );

        const { avatar_url, id, login, name } = userResponse;

        let user = await prismaClient.user.findFirst({
            where: {
                github_id: id,
            },
        });

        if (!user) {
            user = await prismaClient.user.create({
                data: {
                    github_id: id,
                    login,
                    avatar_url,
                    name,
                },
            });
        }

        const token = sign(
            {
                name: user.name,
                avatar_url: user.avatar_url,
                id: user.id,
            },
            process.env.JWT_SECRET_KEY,
            {
                subject: user.id,
            }
        );

        return { token, user };
    }
}

export { AuthenticateUserService };
