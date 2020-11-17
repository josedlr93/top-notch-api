import mongoose from 'mongoose';
import request from 'supertest';

import app from '../../app.js';
import DB_URI from '../../../config/databaseConfig.js';
import { ContactSchema } from '../../models/contactModel.js';

const Contact = mongoose.model('Contact', ContactSchema);

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
  .catch(console.error);

mongoose.connection.on('open', () => console.log('DB - connected'));

describe('Routes test', () => {
  it('has a module', () => {
    expect(app).toBeDefined();
  });

  let server;

  beforeAll(()=> {
    server = app.listen(3001);
  });

  beforeEach(async () => {
    await Contact.deleteMany({});
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

  const contactInfo = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'John.Doe@email.com'
  }
  
  describe('POST /contact', () => {
    it('adds a contact', async () => {
      await request(server)
        .post('/contact')
        .send(contactInfo)
        .expect(200)
        .then((res) => {
          expect(res.body.first_name).toBe(contactInfo.first_name);
          expect(res.body.last_name).toBe(contactInfo.last_name);
          expect(res.body.email).toBe(contactInfo.email);
        });
    });

    it('returns duplicate key error, responds with status 400', async () => {
      const contact = await new Contact(contactInfo).save();
      
      await request(server)
        .post('/contact')
        .send(contactInfo)
        .expect(400)
        .then((res) => {
          expect(res.body.duplicate.email).toBe(contactInfo.email);
        });
    });

    it('throws error for missing last name, responds with status 400', async () => {
      await request(server)
        .post('/contact')
        .send({
          first_name: contactInfo.first_name
        })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe('first and last name required')
        })
    });
    
    it('throws error for missing first name, responds with status 400', async () => {
      await request(server)
        .post('/contact')
        .send({
          last_name: contactInfo.last_name
        })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe('first and last name required')
        })
    });
  });

  describe('GET /contact/:contactID', () => {
    it('gets a contact with id', async () => {
      const contact = await new Contact(contactInfo).save();
      
      await request(server)
        .get('/contact/' + contact._id)
        .expect(200)
        .then((res) => {
          expect(res.body.first_name).toBe(contactInfo.first_name);
          expect(res.body.last_name).toBe(contactInfo.last_name);
          expect(res.body.email).toBe(contactInfo.email);
        });
    });
  });

  describe('PUT /contact/:contactID', () => {
    it('updates a contact', async () => {
      const contact = await new Contact(contactInfo).save();
      const newFirstName = 'Jane';

      await request(server)
        .put('/contact/' + contact._id)
        .send({
          first_name: newFirstName
        })
        .expect(200)
        .then((res) => {
          expect(res.body.first_name).toBe(newFirstName);
        });
    });
  });

  describe('DELETE /contact/:contactID', () => {
    it('deletes a contact', async () => {
      const contact = await new Contact(contactInfo).save();

      await request(server)
        .delete('/contact/' + contact._id)
        .expect(200)
        .then(async () => {
          expect(await Contact.findById(contact._id)).toBeFalsy()
        });
    });
  });

});

