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
  .catch(console.error);

mongoose.connection.on('open', () => console.log('DB - connected'));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server Running - Port: ${PORT}`);
});