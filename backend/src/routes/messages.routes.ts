import express from "express";

import { CreateMessageController } from "../controllers/CreateMessageController";
import { GetLast3MessagesController } from "../controllers/GetLast3MessagesController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const messagesRouter = express.Router();

messagesRouter.post("/", ensureAuthenticated, new CreateMessageController().handle);

messagesRouter.get("/lastThree", new GetLast3MessagesController().handle);

export default messagesRouter;
