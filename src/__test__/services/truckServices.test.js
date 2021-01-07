import * as truckService from '../../services/truckService.js';

describe('truckServices test #cold-test', () => {
  it('has a module', () => {
    expect(truckService).toBeDefined();
  });

  describe('getTrucks test', () => {
    it('gets trucks', () => {
      const MockModel = {
        find: jest.fn()
      };

      truckService.getTrucks(MockModel);
      expect(MockModel.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('addNewTruck test', () => {
    const truckInfo = {
      truck_num: 1,
      vin: '12345678901234567',
      plate_num: '123oc2',
      cdl_required: false
    };

    it('adds a truck', () => {
      const save = jest.fn();
      let truck_num;
      let vin;
      let plate_num;
      let cdl_required;

      const MockModel = (data) => {
        truck_num = data.truck_num;
        vin = data.vin;
        plate_num = data.plate_num;
        cdl_required = data.cdl_required;

        return {
          ...data,
          save
        };
      };

      truckService.addNewTruck(MockModel, truckInfo);

      expect(save).toHaveBeenCalledTimes(1);
      expect(truck_num).toBe(truckInfo.truck_num);
      expect(vin).toEqual(truckInfo.vin);
      expect(plate_num).toEqual(truckInfo.plate_num);
      expect(cdl_required).toBe(truckInfo.cdl_required);
    });

    it('throws an error on missing key truck_num', () => {
      expect(() => {
        truckService.addNewTruck({}, {
          vin: truckInfo.vin,
          plate_num: truckInfo.plate_num,
          cdl_required: truckInfo.cdl_required
        });
      }).toThrowError('key required: truck_num');
    });

    it('throws an error on missing key plate_num', () => {
      expect(() => {
        truckService.addNewTruck({}, {
          truck_num: truckInfo.truck_num,
          vin: truckInfo.vin,
          cdl_required: truckInfo.cdl_required
        });
      }).toThrowError('key required: plate_num');
    });

    it('throws an error on missing key vin', () => {
      expect(() => {
        truckService.addNewTruck({}, {
          truck_num: truckInfo.truck_num,
          plate_num: truckInfo.plate_num,
          cdl_required: truckInfo.cdl_required
        });
      }).toThrowError('key required: vin');
    });
    
    it('throws an error on missing key cdl_required', () => {
      expect(() => {
        truckService.addNewTruck({}, {
          truck_num: truckInfo.truck_num,
          vin: truckInfo.vin,
          plate_num: truckInfo.plate_num,
        });
      }).toThrowError('key required: cdl_required');
    });
  });

  describe('getTruckWithID test', () => {
    it('gets a truck', () => {
      const MockModel = {
        findById: jest.fn()
      };

      truckService.getTruckWithID(MockModel);
      expect(MockModel.findById).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateTruck test', () => {
    it('updates a truck', () => {
      const MockModel = {
        findOneAndUpdate: jest.fn()
      };

      truckService.updateTruck(MockModel);
      expect(MockModel.findOneAndUpdate).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteTruck test', () => {
    it('deletes a truck', () => {
      const MockModel = {
        findByIdAndDelete: jest.fn()
      };

      truckService.deleteTruck(MockModel);
      expect(MockModel.findByIdAndDelete).toHaveBeenCalledTimes(1);
    });
  })

});

