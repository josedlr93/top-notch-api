import mongoose, { connect, disconnect } from '../../lib/database.js';

import { JobSchema } from '../../models/jobModel.js';
import { TruckSchema } from '../../models/truckModel';
import { EmployeeSchema } from '../../models/employeeModel';

const Job = mongoose.model('Job', JobSchema);
const Truck = mongoose.model('Truck', TruckSchema);
const Employee = mongoose.model('Employee', EmployeeSchema);

describe('Job model test', () => {
  let jobInfo;

  beforeAll(async () => {
    await connect();
    await Job.deleteMany({});
  });

  beforeEach(() => {
    jobInfo = {
      name: 'Doe',
      date: new Date(),
      assigned_trucks: [],
      assigned_employees: []
    }
  });

  afterEach(async () => {
    await Job.deleteMany({});
  });

  afterAll(async () => {
    await Job.deleteMany({});
    await disconnect();
    console.log('DB - connection closed');
  });

  it('has a module', () => {
    expect(Job).toBeDefined();
  });

  describe('save job', () => {
    it('saves a job', async () => {

      const truckInfo = {
        truck_num: 99,
        vin: '12345678912345699',
        plate_num: '085c99',
        cdl_required: true,
        service_date: new Date()
      }
      const employeeInfo = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe99@email.com',
        address: '1 address st, city state, 11111',
        phone: 1111111199,
        alt_phone: null,
        admin: true,
        has_cdl: true
      };
      const truck = (await (new Truck(truckInfo).save())).toJSON();
      expect(truck).toBeDefined();
      const employee = (await (new Employee(employeeInfo).save())).toJSON();
      expect(employee).toBeDefined();

      jobInfo.assigned_trucks.push(truck);
      jobInfo.assigned_employees.push(employee);

      const job = new Job(jobInfo);

      const savedJob = await job.save();
      const foundJob = await Job.findById(savedJob._id);

      expect(foundJob.name).toBe(job.name);
      expect(foundJob.date).toBeDefined();
      expect(foundJob.assigned_trucks).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            truck_num: truck.truck_num,
            vin: truck.vin,
            plate_num: truck.plate_num,
            cdl_required: truck.cdl_required
          })
        ])
      );
      expect(foundJob.assigned_employees).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            first_name: employee.first_name,
            last_name: employee.last_name,
            email: employee.email,
          })
        ])
      );

      await Truck.deleteOne({truck_num: truck.truck_num});
      await Employee.deleteOne({email: employee.email});
    });

    it('does not save a job, missing key: name', async () => {
      jobInfo.name = undefined;
      const job = new Job(jobInfo);

      await job.save((err) => {
        expect(err).toBeDefined();
        expect(err._message).toBe('Job validation failed');
        expect(err.errors.name).toBeDefined();
        expect(err.errors.name.properties.message).toBe('Name required');
      });
    });

    it('does not save a job, missing key: date', async () => {
      jobInfo.date = undefined;
      const job = new Job(jobInfo);

      await job.save((err) => {
        expect(err).toBeDefined();
        expect(err._message).toBe('Job validation failed');
        expect(err.errors.date).toBeDefined();
        expect(err.errors.date.properties.message).toBe('Date required');
      });
    });
  });

  describe('update job', () => {
    it('updates a job', async () => {
      const job = new Job(jobInfo);

      const savedJob = await job.save();
      const foundJob = await Job.findById(savedJob._id);

      expect(job.name).toEqual(foundJob.name);

      job.name = 'Smith';

      const updatedJob = await job.save();

      expect(updatedJob.name).toBe(job.name)

    });
  });

  describe('get job', () => {
    it('gets a job', async () => {
      const job = new Job(jobInfo);

      const savedJob = await job.save();
      const foundJob = await Job.findById(savedJob._id);

      expect(foundJob).toBeDefined();
    });
  });

  describe('delete job', () => {
    it('deletes a job by id', async () => {
      const job = new Job(jobInfo);

      const savedJob = await job.save();

      const deletedJob = await Job.findByIdAndDelete({ _id: savedJob._id });

      expect(deletedJob._id).toEqual(savedJob._id);
    });
  });
});