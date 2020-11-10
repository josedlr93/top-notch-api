import dotenv from 'dotenv';

console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') {
  const result = dotenv.config();
  
  if(result.error) {
    throw result.error;
  }
  console.log('databaseConfig.js: Development');
}

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

let DB_URI = '';

if (process.env.NODE_ENV === 'production') {
  DB_URI = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0-ascvt.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
} else if(process.env.NODE_ENV === 'development') {
  DB_URI = `mongodb://localhost:27017/test`;
} else {
  throw new Error('NODE_ENV environment variable not set');
}

export default DB_URI;