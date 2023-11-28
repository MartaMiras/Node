import { Request, Response } from 'express';

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

// Controller functions
export const getAll = (req: Request, res: Response) => {
  res.json(planets);
};

export const getOneById = (req: Request, res: Response) => {
  const planetId = parseInt(req.params.id, 10);
  const planet = planets.find((p) => p.id === planetId);

  if (!planet) {
    return res.status(404).json({ error: 'Planet not found' });
  }

  res.json(planet);
};

export const create = (req: Request, res: Response) => {
  const newPlanet: Planet = req.body;
  planets = [...planets, newPlanet];

  res.status(201).json({ msg: 'Planet created successfully' });
};

export const updateById = (req: Request, res: Response) => {
  const planetId = parseInt(req.params.id, 10);
  const updatedPlanet = req.body;

  planets = planets.map((p) => (p.id === planetId ? updatedPlanet : p));

  res.json({ msg: 'Planet updated successfully' });
};

export const deleteById = (req: Request, res: Response) => {
  const planetId = parseInt(req.params.id, 10);
  planets = planets.filter((p) => p.id !== planetId);

  res.json({ msg: 'Planet deleted successfully' });
};
