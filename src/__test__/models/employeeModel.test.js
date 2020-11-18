import mongoose, { connect, disconnect } from '../../lib/database.js';

import { EmployeeSchema } from '../../models/employeeModel.js';

const Employee = mongoose.model('Employee', EmployeeSchema);

describe('Employee model test', () => {
  const employeeInfo = {
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@email.com',
    address: '1 address st, city state, 11111',
    phone: 1111111111,
    alt_phone: null,
    admin: true,
    has_cdl: true
  }

  beforeAll(async () => {
    await connect();
    await Employee.deleteMany({})
  });

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

      expect(employee.first_name).toEqual(foundEmployee.first_name);
      expect(employee.last_name).toEqual(foundEmployee.last_name);
      expect(employee.email).toEqual(foundEmployee.email);
      expect(employee.address).toEqual(foundEmployee.address);
      expect(employee.phone).toEqual(foundEmployee.phone);
      expect(employee.alt_phone).toEqual(foundEmployee.alt_phone);
      expect(employee.admin).toBe(foundEmployee.admin);
      expect(employee.has_cdl).toBe(foundEmployee.has_cdl);
      
    });
  });

  describe('update employee', () => {
    it('updates a employee', async () => {
      const employee = new Employee(employeeInfo);

      const savedEmployee = await employee.save();
      const foundEmployee = await Employee.findById(savedEmployee._id);

      expect(employee.first_name).toEqual(foundEmployee.first_name);

      employee.first_name = 'Jane';

      const updatedEmployee = await employee.save();

      expect(updatedEmployee.first_name).toEqual(employee.first_name)

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