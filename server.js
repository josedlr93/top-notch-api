import app from './src/app.js';
import mongoose from 'mongoose';
import DB_URI from './config/databaseConfig.js';

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
  .then(console.log('DB - Connected'))
  .catch(console.error);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server Running - Port: ${PORT}`);
});