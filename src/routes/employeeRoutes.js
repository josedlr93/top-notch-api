import {
  getEmployees,
  addNewEmployee,
  getEmployeeWithID,
  updateEmployee,
  deleteEmployee
} from '../controllers/employeeController.js';

export const employeeRoutes = (app) => {
  app.route('/employee')
    .get(getEmployees)

    .post(addNewEmployee);

  app.route('/employee/:employeeID')
    .get(getEmployeeWithID)

    .put(updateEmployee)

    .delete(deleteEmployee);
};