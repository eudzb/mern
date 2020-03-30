import express from 'express';
import { add, getAll } from '../controllers/playerController';
let playerRouter = express.Router();

playerRouter.post('/', add);
playerRouter.get('/', getAll);

export default playerRouter;
