import express, { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';

// Dummy database
type Planet = {
  id: number;
  name: string;
};

type Planets = Planet[];

let planets: Planets = [
  {
    id: 1,
    name: 'Earth',
  },
  {
    id: 2,
    name: 'Mars',
  },
];

// Express router
const planetRouter = express.Router();

// Validation schema
const planetSchema = Joi.object({
  id: Joi.number().integer().required(),
  name: Joi.string().required(),
});

// Middleware for validating planet
const validatePlanet = (req: Request, res: Response, next: NextFunction) => {
  const { error } = planetSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

// Routes
planetRouter.get('/api/planets', (req, res) => {
  res.json(planets);
});

planetRouter.get('/api/planets/:id', (req, res) => {
  const planetId = parseInt(req.params.id, 10);
  const planet = planets.find((p) => p.id === planetId);

  if (!planet) {
    return res.status(404).json({ error: 'Planet not found' });
  }

  res.json(planet);
});

planetRouter.post('/api/planets', validatePlanet, (req, res) => {
  const newPlanet: Planet = req.body;
  planets.push(newPlanet);

  res.status(201).json({ msg: 'Planet created successfully' });
});

planetRouter.put('/api/planets/:id', validatePlanet, (req, res) => {
  const planetId = parseInt(req.params.id, 10);
  const planetIndex = planets.findIndex((p) => p.id === planetId);

  if (planetIndex === -1) {
    return res.status(404).json({ error: 'Planet not found' });
  }

  planets[planetIndex] = req.body;

  res.json({ msg: 'Planet updated successfully' });
});

planetRouter.delete('/api/planets/:id', (req, res) => {
  const planetId = parseInt(req.params.id, 10);
  const planetIndex = planets.findIndex((p) => p.id === planetId);

  if (planetIndex === -1) {
    return res.status(404).json({ error: 'Planet not found' });
  }

  planets.splice(planetIndex, 1);

  res.json({ msg: 'Planet deleted successfully' });
});

export default planetRouter;
