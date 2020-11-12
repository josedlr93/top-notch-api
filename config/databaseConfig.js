import dotenv from 'dotenv';

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

switch(process.env.NODE_ENV) {
  case 'production':
    DB_URI = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0-ascvt.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
    break;
  default:
    DB_URI = `mongodb://localhost:27017/test`;
}

console.log(`Using DB_URI from environment: ${process.env.NODE_ENV}`);

export default DB_URI;