import express from 'express';
import { getAll, getOneById, create, updateById, deleteById } from '../controllers/planets.mjs';

const planetsRouter = express.Router();

// Rutas
planetsRouter.get('/', getAll);
planetsRouter.get('/:id', getOneById);
planetsRouter.post('/', create);
planetsRouter.put('/:id', updateById);
planetsRouter.delete('/:id', deleteById);

export default planetsRouter;
