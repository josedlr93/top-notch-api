import mongoose from 'mongoose';

import DB_URI from '../config/databaseConfig.js';

mongoose.Promise = global.Promise;
mongoose.connection.on('open', () => console.log('DB - connected'));

export const connect = () => {
  return mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
    .catch(console.error);
};

export const disconnect = () => {
  return mongoose.connection.close();
};

export default mongoose;