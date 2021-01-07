import * as employeeService from '../../services/employeeService';

describe('employeeServices test #cold-test', () => {
  it('has a module', () => {
    expect(employeeService).toBeDefined();
  });

  describe('getEmployees test', () => {
    it('gets employees', () => {
      const MockModel = {
        find: jest.fn()
      };

      employeeService.getEmployees(MockModel);
      expect(MockModel.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('addNewEmployee test', () => {
    it('adds a employee', () => {
      const save = jest.fn();
      let first_name;
      let last_name;
      const MockModel = (data) => {
        first_name = data.first_name;
        last_name = data.last_name;

        return {
          ...data,
          save
        };
      };

      employeeService.addNewEmployee(MockModel, {
        first_name: 'John',
        last_name: 'Doe'
      });

      expect(save).toHaveBeenCalledTimes(1);
      expect(first_name).toEqual('John');
      expect(last_name).toEqual('Doe');
    });

    it('throws an error on missing last name', () => {
      expect(() => {
        employeeService.addNewEmployee({}, { first_name: 'John' });
      }).toThrowError('first and last name required')
    });

    it('throws an error on missing first name', () => {
      expect(() => {
        employeeService.addNewEmployee({}, { last_name: 'Doe' });
      }).toThrowError('first and last name required')
    });
  });

  describe('getEmployeeWithID test', () => {
    it('gets a employee', () => {
      const MockModel = {
        findById: jest.fn()
      };

      employeeService.getEmployeeWithID(MockModel);
      expect(MockModel.findById).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateEmployee test', () => {
    it('updates a employee', () => {
      const MockModel = {
        findOneAndUpdate: jest.fn()
      };

      employeeService.updateEmployee(MockModel);
      expect(MockModel.findOneAndUpdate).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteEmployee test', () => {
    it('deletes a employee', () => {
      const MockModel = {
        findByIdAndDelete: jest.fn()
      };

      employeeService.deleteEmployee(MockModel);
      expect(MockModel.findByIdAndDelete).toHaveBeenCalledTimes(1);
    });
  })

});

