// Get all planets
app.get("/api/planets", (_req, res) => {
  res.status(200).json(planets);
});

// Get a planet by id
app.get("/api/planets/:id", (req, res) => {
  const planet = planets.find((p) => p.id === parseInt(req.params.id));
  if (!planet) return res.status(404).json({ msg: "Planet not found" });

  res.status(200).json(planet);
});

// Create a new planet
app.post("/api/planets", (req, res) => {
  const { error } = planetSchema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  const newPlanet = {
    id: req.body.id,
    name: req.body.name,
  };

  planets.push(newPlanet);
  res.status(201).json({ msg: "Planet created successfully" });
});

// Update a planet by id
app.put("/api/planets/:id", (req, res) => {
  const planet = planets.find((p) => p.id === parseInt(req.params.id));
  if (!planet) return res.status(404).json({ msg: "Planet not found" });

  const { error } = planetSchema.validate(req.body);
  if (error) return res.status(400).json({ msg: error.details[0].message });

  planet.name = req.body.name;
  res.status(200).json({ msg: "Planet updated successfully" });
});

// Delete a planet by id
app.delete("/api/planets/:id", (req, res) => {
  const planetIndex = planets.findIndex(
    (p) => p.id === parseInt(req.params.id)
  );
  if (planetIndex === -1)
    return res.status(404).json({ msg: "Planet not found" });

  planets.splice(planetIndex, 1);
  res.status(200).json({ msg: "Planet deleted successfully" });
});
