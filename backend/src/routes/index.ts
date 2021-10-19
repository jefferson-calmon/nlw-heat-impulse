import express from 'express';

import authRouter from './auth.routes';
import messagesRouter from './messages.routes';
import userRouter from './users.routes';

const routes = express.Router();

routes.use('/auth', authRouter);
routes.use('/messages', messagesRouter);
routes.use('/user', userRouter);

export default routes;