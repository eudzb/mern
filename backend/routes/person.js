import express from 'express';
import { signIn, signUp, getAllPerson } from '../controllers/personController';
let personRouter = express.Router();

personRouter.post('/signUp', signUp);
personRouter.post('/signIn', signIn);
personRouter.get('/', getAllPerson);

export default personRouter;
