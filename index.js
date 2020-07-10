import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import contactRoutes from './src/routes/contactRoutes';
import truckRoutes from './src/routes/truckRoutes';
import employeeRoutes from './src/routes/employeeRoutes';
import DB_URI from './databaseConfig';

const app = express();
const PORT = process.env.PORT || 4000;

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

// serving static files
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send(`Node and express server running on ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Server Running - Port ${PORT}`);
});