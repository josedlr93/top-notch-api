import request from 'supertest';

import mongoose, { connect, disconnect } from '../../lib/database.js';
import app from '../../app.js';
import { TruckSchema } from '../../models/truckModel.js';

const Truck = mongoose.model('Truck', TruckSchema);

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
    await Truck.deleteMany({});
  });

  afterAll(async done => {
    await disconnect();
    await server.close(done);
  });

  describe('GET /truck', () => {
    it('can get trucks, responds with status 200', async () => {
      await request(server).get('/truck').expect(200);
    });
  });

  const truckInfo = {
    truck_num: 1,
    vin: '12345678901234567',
    plate_num: '012cd3',
    cdl_required: false
  }

  describe('POST /truck', () => {
    it('adds a truck, responds with status 200', async () => {
      await request(server)
        .post('/truck')
        .send(truckInfo)
        .expect(200)
        .then((res) => {
          expect(res.body.truck_num).toBe(truckInfo.truck_num);
          expect(res.body.vin).toBe(truckInfo.vin);
          expect(res.body.plate_num).toBe(truckInfo.plate_num);
          expect(res.body.cdl_required).toBe(truckInfo.cdl_required);
        });
    });

    it('returns duplicate key error, responds with status 400', async () => {
      const truck = await new Truck(truckInfo).save();

      await request(server)
        .post('/truck')
        .send(truckInfo)
        .expect(400)
        .then((res) => {
          expect(res.body.duplicate.truck_num).toBe(truckInfo.truck_num);
        });
    });

    it('missing truck number, responds with status 400', async () => {
      await request(server)
        .post('/truck')
        .send({
          vin: '12345678901234567',
          plate_num: '012cd3',
          cdl_required: false
        })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe('key required: truck_num');
        });
    });

    it('missing vin, responds with status 400', async () => {
      await request(server)
        .post('/truck')
        .send({
          truck_num: 1,
          plate_num: '012cd3',
          cdl_required: false
        })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe('key required: vin');
        });
    });

    it('missing plate number, responds with status 400', async () => {
      await request(server)
        .post('/truck')
        .send({
          truck_num: 1,
          vin: '12345678901234567',
          cdl_required: false
        })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe('key required: plate_num');
        });
    });

    it('missing key: cdl_required, responds with status 400', async () => {
      await request(server)
        .post('/truck')
        .send({
          truck_num: 1,
          vin: '12345678901234567',
          plate_num: '012cd3',
        })
        .expect(400)
        .then((res) => {
          expect(res.body.message).toBe('key required: cdl_required');
        });
    });
  });

  describe('GET /truck/:truckID', () => {
    it('gets a truck with id, responds with status 200', async () => {
      const truck = await new Truck(truckInfo).save();

      await request(server)
        .get('/truck/' + truck._id)
        .expect(200)
        .then((res) => {
          expect(res.body.truck_num).toBe(truckInfo.truck_num);
          expect(res.body.vin).toBe(truckInfo.vin);
          expect(res.body.plate_num).toBe(truckInfo.plate_num);
          expect(res.body.cdl_required).toBe(truckInfo.cdl_required);
        });
    });
  });

  describe('PUT /truck/:truckID', () => {
    it('updates a truck', async () => {
      const truck = await new Truck(truckInfo).save();
      const newVin = '12345678901234568';

      await request(server)
        .put('/truck/' + truck._id)
        .send({
          vin: newVin
        })
        .expect(200)
        .then((res) => {
          expect(res.body.vin).toBe(newVin);
        });
    });
  });

  describe('DELETE /truck/:truckID', () => {
    it('deletes a truck', async () => {
      const truck = await new Truck(truckInfo).save();

      await request(server)
        .delete('/truck/' + truck._id)
        .expect(200)
        .then(async () => {
          expect(await Truck.findById(truck._id)).toBeFalsy()
        });
    });
  });

});

