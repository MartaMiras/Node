import express from 'express';
import planetRouter from './planetRouter';

const app = express();

app.use(express.json());

// Use the planet router
app.use(planetRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
