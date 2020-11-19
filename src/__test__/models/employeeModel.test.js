import mongoose, { connect, disconnect } from '../../lib/database.js';

import { EmployeeSchema } from '../../models/employeeModel.js';

const Employee = mongoose.model('Employee', EmployeeSchema);

describe('Employee model test', () => {
  let employeeInfo;

  beforeAll(async () => {
    await connect();
    await Employee.deleteMany({})
  });

  beforeEach(() => {
    employeeInfo = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@email.com',
      address: '1 address st, city state, 11111',
      phone: 1111111111,
      alt_phone: null,
      admin: true,
      has_cdl: true
    }
  })

  afterEach(async () => {
    await Employee.deleteMany({});
  });

  afterAll(async () => {
    await disconnect();
    console.log('DB - connection closed');
  });

  it('has a module', () => {
    expect(Employee).toBeDefined();
  });

  describe('save employee', () => {
    it('saves a employee', async () => {
      const employee = new Employee(employeeInfo);

      const savedEmployee = await employee.save();
      const foundEmployee = await Employee.findById(savedEmployee._id);

      expect(employee.first_name).toBe(foundEmployee.first_name);
      expect(employee.last_name).toBe(foundEmployee.last_name);
      expect(employee.email).toBe(foundEmployee.email);
      expect(employee.address).toBe(foundEmployee.address);
      expect(employee.phone).toBe(foundEmployee.phone);
      expect(employee.alt_phone).toBe(foundEmployee.alt_phone);
      expect(employee.admin).toBe(foundEmployee.admin);
      expect(employee.has_cdl).toBe(foundEmployee.has_cdl);
    });

    it('does not save a employee, missing key: first_name', async () => {
      employeeInfo.first_name = undefined;
      const employee = new Employee(employeeInfo);

      await employee.save((err) => {
        expect(err).toBeDefined();
        expect(err._message).toBe('Employee validation failed');
        expect(err.errors.first_name).toBeDefined();
        expect(err.errors.first_name.properties.message).toBe('Enter a first name');
      });
    });

    it('does not save a employee, missing key: last_name', async () => {
      employeeInfo.last_name = undefined;
      const employee = new Employee(employeeInfo);

      await employee.save((err) => {
        expect(err).toBeDefined();
        expect(err._message).toBe('Employee validation failed');
        expect(err.errors.last_name).toBeDefined();
        expect(err.errors.last_name.properties.message).toBe('Enter a last name');
      });
    });
  });

  describe('update employee', () => {
    it('updates a employee', async () => {
      const employee = new Employee(employeeInfo);

      const savedEmployee = await employee.save();
      const foundEmployee = await Employee.findById(savedEmployee._id);

      expect(employee.first_name).toBe(foundEmployee.first_name);

      employee.first_name = 'Jane';

      const updatedEmployee = await employee.save();

      expect(updatedEmployee.first_name).toBe(employee.first_name)

    });
  });

  describe('get employee', () => {
    it('gets a employee', async () => {
      const employee = new Employee(employeeInfo);

      const savedEmployee = await employee.save();
      const foundEmployee = await Employee.findById(savedEmployee._id);

      expect(foundEmployee).toBeDefined();
    });
  });

  describe('delete employee', () => {
    it('deletes a employee by id', async () => {
      const employee = new Employee(employeeInfo);

      const savedEmployee = await employee.save();

      const deletedEmployee = await Employee.findByIdAndDelete({ _id: savedEmployee._id });

      expect(deletedEmployee._id).toEqual(savedEmployee._id);
    });
  })
});