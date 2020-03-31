import express from 'express';
import { getAll } from '../controllers/userController';
let userRouter = express.Router();

userRouter.get('/', getAll);

export default userRouter;
