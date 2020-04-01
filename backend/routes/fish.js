import express from 'express';
import { addFish, updateFish, deleteFish, getAllFish } from '../controllers/fishController';
let fishRouter = express.Router();

fishRouter.get('/', getAllFish);
fishRouter.post('/', addFish);
fishRouter.put('/:id', updateFish);
fishRouter.delete('/:id', deleteFish);

export default fishRouter;
