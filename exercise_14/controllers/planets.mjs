import pgp from 'pg-promise';
const db = pgp('postgres://username:password@localhost:5432/space_database'); 

// Controller functions
export const getAll = async (req, res) => {
  try {
    const planets = await db.any('SELECT * FROM planets;');
    res.json(planets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getOneById = async (req, res) => {
  try {
    const planet = await db.oneOrNone('SELECT * FROM planets WHERE id=$1;', req.params.id);
    if (!planet) {
      return res.status(404).json({ error: 'Planet not found' });
    }
    res.json(planet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const create = async (req, res) => {
  try {
    const newPlanet = await db.one('INSERT INTO planets (name) VALUES ($1) RETURNING *;', req.body.name);
    res.status(201).json({ msg: 'Planet created successfully', planet: newPlanet });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateById = async (req, res) => {
  try {
    const updatedPlanet = await db.oneOrNone('UPDATE planets SET name=$2 WHERE id=$1 RETURNING *;', [req.params.id, req.body.name]);
    if (!updatedPlanet) {
      return res.status(404).json({ error: 'Planet not found' });
    }
    res.json({ msg: 'Planet updated successfully', planet: updatedPlanet });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteById = async (req, res) => {
  try {
    const deletedPlanet = await db.oneOrNone('DELETE FROM planets WHERE id=$1 RETURNING *;', req.params.id);
    if (!deletedPlanet) {
      return res.status(404).json({ error: 'Planet not found' });
    }
    res.json({ msg: 'Planet deleted successfully', planet: deletedPlanet });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAll,
  getOneById,
  create,
  updateById,
  deleteById,
};
