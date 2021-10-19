import express from "express";

import { AuthenticateUserController } from "../controllers/AuthenticateUserController";

const authRouter = express.Router();

authRouter.get("/github", (request, response) => {
    return response.redirect(
        `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
    );
});

authRouter.get("/github/callback", (request, response) => {
    const { code } = request.query;

    return response.json(code);
});

authRouter.post("/authenticate", new AuthenticateUserController().handle);

export default authRouter;
