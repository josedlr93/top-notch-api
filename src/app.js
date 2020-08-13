import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import contactRoutes from './routes/contactRoutes.js';
import truckRoutes from './routes/truckRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import DB_URI from '../config/databaseConfig.js';

const app = express();

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
  .then(console.log('DB - Connected'))
  .catch(console.error);

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

contactRoutes(app);
truckRoutes(app);
employeeRoutes(app);
jobRoutes(app);

// serving static files
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.status(200).send(`Node and express server running`);
});

export default app;