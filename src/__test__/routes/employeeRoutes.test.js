import request from 'supertest';

import mongoose, { connect, disconnect } from '../../lib/database.js';
import app from '../../app.js';
import { EmployeeSchema } from '../../models/employeeModel.js';

const Employee = mongoose.model('Employee', EmployeeSchema);

describe('Routes test', () => {
  it('has a module', () => {
    expect(app).toBeDefined();
  });

  let server;

  beforeAll(async () => {
    await connect();
    server = app.listen();
  });

  beforeEach(async () => {
    await Employee.deleteMany({});
  });

  afterAll(async done => {
    await disconnect();
    await server.close(done);
  });

  describe('GET /employee', () => {
    it('can get employees, responds with status 200', async () => {
      await request(server).get('/employee').expect(200);
    });
  });

  const employeeInfo = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'John.Doe@email.com'
  }

  describe('POST /employee', () => {
    it('adds a employee, responds with status 200', async () => {
      await request(server)
        .post('/employee')
        .send(employeeInfo)
        .expect(200)
        .then((res) => {
          expect(res.body.first_name).toBe(employeeInfo.first_name);
          expect(res.body.last_name).toBe(employeeInfo.last_name);
          expect(res.body.email).toBe(employeeInfo.email);
        });
    });

    it('returns duplicate key error, responds with status 400', async () => {
      const employee = await new Employee(employeeInfo).save();

      await request(server)
        .post('/employee')
        .send(employeeInfo)
        .expect(400)
        .then((res) => {
          expect(res.body.duplicate.email).toBe(employeeInfo.email);
        });
    });

    it('missing last name, responds with status 400', async () => {
      await request(server)
        .post('/employee')
        .send({
          first_name: employeeInfo.first_name
        })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe('first and last name required')
        })
    });

    it('missing first name, responds with status 400', async () => {
      await request(server)
        .post('/employee')
        .send({
          last_name: employeeInfo.last_name
        })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe('first and last name required')
        })
    });
  });

  describe('GET /employee/:employeeID', () => {
    it('gets a employee with id, responds with status 200', async () => {
      const employee = await new Employee(employeeInfo).save();

      await request(server)
        .get('/employee/' + employee._id)
        .expect(200)
        .then((res) => {
          expect(res.body.first_name).toBe(employeeInfo.first_name);
          expect(res.body.last_name).toBe(employeeInfo.last_name);
          expect(res.body.email).toBe(employeeInfo.email);
        });
    });
  });

  describe('PUT /employee/:employeeID', () => {
    it('updates a employee', async () => {
      const employee = await new Employee(employeeInfo).save();
      const newFirstName = 'Jane';

      await request(server)
        .put('/employee/' + employee._id)
        .send({
          first_name: newFirstName
        })
        .expect(200)
        .then((res) => {
          expect(res.body.first_name).toBe(newFirstName);
        });
    });
  });

  describe('DELETE /employee/:employeeID', () => {
    it('deletes a employee', async () => {
      const employee = await new Employee(employeeInfo).save();

      await request(server)
        .delete('/employee/' + employee._id)
        .expect(200)
        .then(async () => {
          expect(await Employee.findById(employee._id)).toBeFalsy()
        });
    });
  });

});

