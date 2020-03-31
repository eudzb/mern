import express from 'express';
import { add } from '../controllers/messageController';
let messageRouter = express.Router();

messageRouter.post('/', add);

export default messageRouter;
