import MemoryServer from '../MemoryServer.js';
import { EmployeeSchema } from '../../models/employeeModel.js';

describe('Employee model test', () => {
  const db = new MemoryServer();
  const validationFailureMsg = 'Employee validation failed';
  let Employee;
  let employeeInfo;

  beforeAll(async () => {
    await db.connect();
    Employee = db.connection.model('Employee', EmployeeSchema);
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
    };
  });

  afterEach(async () => {
    await db.clearDatabase();
  });

  afterAll(async () => {
    await db.disconnect();
  });

  it('has a module', () => {
    expect(Employee).toBeDefined();
  });

  describe('save employee', () => {
    it('saves a employee', async () => {
      const employee = new Employee(employeeInfo);

      const savedEmployee = await employee.save();
      const foundEmployee = await Employee.findById(savedEmployee._id);

      expect(foundEmployee.first_name).toBe(employee.first_name);
      expect(foundEmployee.last_name).toBe(employee.last_name);
      expect(foundEmployee.email).toBe(employee.email);
      expect(foundEmployee.address).toBe(employee.address);
      expect(foundEmployee.phone).toBe(employee.phone);
      expect(foundEmployee.alt_phone).toBe(employee.alt_phone);
      expect(foundEmployee.admin).toBe(employee.admin);
      expect(foundEmployee.has_cdl).toBe(employee.has_cdl);
    });

    it('does not save a employee, missing key: first_name', async () => {
      employeeInfo.first_name = undefined;
      const employee = new Employee(employeeInfo);

      await employee.save((err) => {
        expect(err).toBeDefined();
        expect(err._message).toBe(validationFailureMsg);
        expect(err.errors.first_name).toBeDefined();
        expect(err.errors.first_name.properties.message).toBe('Enter a first name');
      });
    });

    it('does not save a employee, missing key: last_name', async () => {
      employeeInfo.last_name = undefined;
      const employee = new Employee(employeeInfo);

      await employee.save((err) => {
        expect(err).toBeDefined();
        expect(err._message).toBe(validationFailureMsg);
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

      expect(foundEmployee.first_name).toBe(employee.first_name);

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