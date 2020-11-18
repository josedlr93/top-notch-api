import mongoose, { connect, disconnect } from '../../lib/database.js';

import { TruckSchema } from '../../models/truckModel.js';

const Truck = mongoose.model('Truck', TruckSchema);

describe('Truck model test', () => {
  const truckInfo = {
    truck_num: 1,
    vin: '12345678912345678',
    plate_num: '085cd2',
    cdl_required: true,
    service_date: new Date()
  }

  beforeAll(async () => {
    await connect();
    await Truck.deleteMany({})
  });

  afterEach(async () => {
    await Truck.deleteMany({});
  });

  afterAll(async () => {
    await disconnect();
    console.log('DB - connection closed');
  });

  it('has a module', () => {
    expect(Truck).toBeDefined();
  });

  describe('save truck', () => {
    it('saves a truck', async () => {
      const truck = new Truck(truckInfo);

      const savedTruck = await truck.save();
      const foundTruck = await Truck.findById(savedTruck._id);

      expect(truck.truck_num).toBe(foundTruck.truck_num);
      expect(truck.vin).toEqual(foundTruck.vin);
      expect(truck.plate_num).toEqual(foundTruck.plate_num);
      expect(truck.cdl_required).toBe(foundTruck.cdl_required);
      expect(truck.service_date).toEqual(foundTruck.service_date);
    });
  });

  describe('update truck', () => {
    it('updates a truck', async () => {
      const truck = new Truck(truckInfo);

      const savedTruck = await truck.save();
      const foundTruck = await Truck.findById(savedTruck._id);

      expect(truck.vin).toEqual(foundTruck.vin);

      truck.vin = '12345678912345679';

      const updatedTruck = await truck.save();

      expect(updatedTruck.vin).toEqual(truck.vin);

    });
  });

  describe('get truck', () => {
    it('gets a truck', async () => {
      const truck = new Truck(truckInfo);

      const savedTruck = await truck.save();
      const foundTruck = await Truck.findById(savedTruck._id);

      expect(foundTruck).toBeDefined();
    });
  });

  describe('delete truck', () => {
    it('deletes a truck by id', async () => {
      const truck = new Truck(truckInfo);

      const savedTruck = await truck.save();

      const deletedTruck = await Truck.findByIdAndDelete({ _id: savedTruck._id });

      expect(deletedTruck._id).toEqual(savedTruck._id);
    });
  })
});