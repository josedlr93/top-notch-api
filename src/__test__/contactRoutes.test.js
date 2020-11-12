import mongoose from 'mongoose';
import request from 'supertest';

import app from '../app.js';
import DB_URI from '../../config/databaseConfig.js';

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
  .catch(console.error);

mongoose.connection.on('open', () => console.log('DB - connected'));

describe('App test', () => {
  it('has a module', () => {
    expect(app).toBeDefined();
  });

  let server;

  beforeAll(()=> {
    server = app.listen(3001);
  });

  afterAll(done => {
    mongoose.connection.close();
    server.close(done);
  });

  describe('GET /contact', () => {
    it('can get contacts', async () => {
      await request(server).get('/contact').expect(200);
    });
  });

});

