import express from 'express';
import 'dotenv/config';
import morgan from 'morgan';

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

// Create Express App
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Middleware to log requests
app.use(morgan('dev'));

// Define routes
app.get('/planets', (req, res) => {
  res.json(planets);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection: ${err}`);
  process.exit(1);
});
