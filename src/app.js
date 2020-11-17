import express from 'express';
import bodyParser from 'body-parser';

import contactRoutes from './routes/contactRoutes.js';
import truckRoutes from './routes/truckRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import jobRoutes from './routes/jobRoutes.js';

import { handleDuplicateKey } from './errorHandler.js';

const app = express();

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send(`Node and express server running`);
});

contactRoutes(app);
truckRoutes(app);
employeeRoutes(app);
jobRoutes(app);

// serving static files
app.use(express.static('public'));

app.use((err, req, res, next) => {
  // MongoError: Duplicate key error
  if (err.code === 11000) {
    handleDuplicateKey(res, err);
  } else if (err.status) {
    res.status(err.status).send({
      message: err.message
    });
  } else {
    res.send(err);
  }
});

export default app;