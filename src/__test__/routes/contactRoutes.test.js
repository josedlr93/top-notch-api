import request from 'supertest';

import mongoose, { connect, disconnect } from '../../lib/database.js';
import app from '../../app.js';
import { ContactSchema } from '../../models/contactModel.js';

const Contact = mongoose.model('Contact', ContactSchema);

describe('Routes test', () => {
  it('has a module', () => {
    expect(app).toBeDefined();
  });

  let server;

  beforeAll(async ()=> {
    await connect();
    server = app.listen();
  });

  beforeEach(async () => {
    await Contact.deleteMany({});
  });

  afterAll(async done => {
    await disconnect();
    await server.close(done);
  });

  describe('GET /contact', () => {
    it('can get contacts, responds with status 200', async () => {
      await request(server).get('/contact').expect(200);
    });
  });

  const contactInfo = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'John.Doe@email.com'
  }
  
  describe('POST /contact', () => {
    it('adds a contact, responds with status 200', async () => {
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

    it('missing last name, responds with status 400', async () => {
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
    
    it('missing first name, responds with status 400', async () => {
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
    it('gets a contact with id, responds with status 200', async () => {
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

