import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'development') {
  const result = dotenv.config();
  
  if(result.error) {
    throw result.error;
  }
  console.log('databaseConfig.js: Not from production');
}

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_URI = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0-ascvt.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

export default DB_URI;