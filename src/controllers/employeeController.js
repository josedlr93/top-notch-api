import mongoose from 'mongoose';
import { EmployeeSchema } from '../models/employeeModel.js';
import { handleDuplicateKey } from '../lib/errorHandler.js';

const Employee = mongoose.model('Employee', EmployeeSchema);

export const addNewEmployee = (req, res) => {
  let newEmployee = new Employee(req.body);

  newEmployee.save((err, employee) => {
    if (err) {
      // MongoError: Duplicate key error
      if (err.code === 11000) {
        handleDuplicateKey(res, err);
      } else {
        res.send(err);
      }
    }
    res.json(employee);
  });
};

export const getEmployees = (req, res) => {
  Employee.find({}, (err, employee) => {
    if (err) {
      res.send(err);
    }
    res.json(employee);
  });
};

export const getEmployeeWithID = (req, res) => {
  Employee.findById(req.params.employeeID, (err, employee) => {
    if (err) {
      res.send(err);
    }
    res.json(employee);
  });
};

export const updateEmployee = (req, res) => {
  Employee.findOneAndUpdate(
    { _id: req.params.employeeID },
    req.body,
    {
      new: true,
      useFindAndModify: false
    },
    (err, employee) => {
      if (err) {
        res.send(err);
      }
      res.json(employee);
    });
};

export const deleteEmployee = (req, res) => {
  Employee.findByIdAndDelete({ _id: req.params.employeeID }, (err, employee) => {
    if (err) {
      res.send(err);
    }
    console.log(employee);
    res.json({
      employee,
      message: employee ? 'Successfully deleted employee' : `No employee with ID: ${req.params.employeeID}`
    });
  });
};