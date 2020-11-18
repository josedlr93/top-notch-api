import mongoose from 'mongoose';

import { EmployeeSchema } from '../models/employeeModel.js';
import * as employeeService from '../services/employeeService.js';

const Employee = mongoose.model('Employee', EmployeeSchema);

export const addNewEmployee = async (req, res, next) => {
  try {
    const employee = await employeeService.addNewEmployee(Employee, req.body);
    res.json(employee);
  } catch (err) {
    next(err);
  }
};

export const getEmployees = async (req, res, next) => {
  try {
    const employees = await employeeService.getEmployees(Employee);
    res.json(employees);
  } catch (err) {
    next(err);
  }
};

export const getEmployeeWithID = async (req, res, next) => {
  try {
    const employee = await employeeService.getEmployeeWithID(Employee, req.params.employeeID);
    res.json(employee);
  } catch (err) {
    next(err);
  }
};

export const updateEmployee = async (req, res, next) => {
  try {
    const employee = await employeeService.updateEmployee(Employee, req.params.employeeID, req.body);
    res.json(employee);
  } catch (err) {
    next(err);
  }
};

export const deleteEmployee = async (req, res, next) => {
  try {
    const employee = await employeeService.deleteEmployee(Employee, req.params.employeeID);
    res.json({
      employee,
      message: employee ? 'Successfully deleted employee' : `No employee with ID: ${req.params.employeeID}`
    });
  } catch (err) {
    next(err);
  }
};