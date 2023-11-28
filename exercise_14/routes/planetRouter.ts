// routes/planetRouter.ts
import express from 'express';
import * as planetsController from '../controllers/planets';

const planetRouter = express.Router();

planetRouter.get('/', planetsController.getAll);
planetRouter.get('/:id', planetsController.getOneById);
planetRouter.post('/', planetsController.create);
planetRouter.put('/:id', planetsController.updateById);
planetRouter.delete('/:id', planetsController.deleteById);

export default planetRouter;
