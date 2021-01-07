import MemoryServer from '../MemoryServer.js';
import { TruckSchema } from '../../models/truckModel.js';

describe('Truck model test', () => {
  const db = new MemoryServer();
  const validationFailureMsg = 'Truck validation failed';
  let Truck;
  let truckInfo;

  beforeAll(async () => {
    await db.connect();
    Truck = db.connection.model('Truck', TruckSchema);
  });

  beforeEach(() => {
    truckInfo = {
      truck_num: 1,
      vin: '12345678912345678',
      plate_num: '085cd2',
      cdl_required: true,
      service_date: new Date()
    }
  })

  afterEach(async () => {
    await db.clearDatabase();
  });

  afterAll(async () => {
    await db.disconnect();
  });

  it('has a module', () => {
    expect(Truck).toBeDefined();
  });
  describe('save truck', () => {
    it('saves a truck', async () => {
      const truck = new Truck(truckInfo);

      const savedTruck = await truck.save();
      const foundTruck = await Truck.findById(savedTruck._id);

      expect(foundTruck.truck_num).toBe(truck.truck_num);
      expect(foundTruck.vin).toEqual(truck.vin);
      expect(foundTruck.plate_num).toEqual(truck.plate_num);
      expect(foundTruck.cdl_required).toBe(truck.cdl_required);
      expect(foundTruck.service_date).toEqual(truck.service_date);
    });

    it('does not save a truck, missing key: truck_num', async () => {
      truckInfo.truck_num = undefined;
      const truck = new Truck(truckInfo);

      await truck.save((err) => {
        expect(err).toBeDefined();
        expect(err._message).toBe(validationFailureMsg);
        expect(err.errors.truck_num).toBeDefined();
        expect(err.errors.truck_num.properties.message).toBe('Enter truck number');
      });
    });

    it('does not save a truck, missing key: vin', async () => {
      truckInfo.vin = undefined;
      const truck = new Truck(truckInfo);

      await truck.save((err) => {
        expect(err).toBeDefined();
        expect(err._message).toBe(validationFailureMsg);
        expect(err.errors.vin).toBeDefined();
        expect(err.errors.vin.properties.message).toBe('Enter VIN');
      });
    });

    it('does not save a truck, missing key: plate_num', async () => {
      truckInfo.plate_num = undefined;
      const truck = new Truck(truckInfo);

      await truck.save((err) => {
        expect(err).toBeDefined();
        expect(err._message).toBe(validationFailureMsg);
        expect(err.errors.plate_num).toBeDefined();
        expect(err.errors.plate_num.properties.message).toBe('Enter plate number');
      });
    });

    it('does not save a truck, missing key: cdl_required', async () => {
      truckInfo.cdl_required = undefined;
      const truck = new Truck(truckInfo);

      await truck.save((err) => {
        expect(err).toBeDefined();
        expect(err._message).toBe(validationFailureMsg);
        expect(err.errors.cdl_required).toBeDefined();
        expect(err.errors.cdl_required.properties.message).toBe('Indicate if CDL required');
      });
    });
  });

  describe('update truck', () => {
    it('updates a truck', async () => {
      const truck = new Truck(truckInfo);

      const savedTruck = await truck.save();
      const foundTruck = await Truck.findById(savedTruck._id);

      expect(foundTruck.vin).toEqual(truck.vin);

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