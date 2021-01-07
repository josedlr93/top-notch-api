export const getEmployees = (Employee) => {
  return Employee.find({});
};

export const addNewEmployee = (Employee, data) => {
  if (!data.last_name || !data.first_name) {
    let error = new Error('first and last name required');
    error.status = 400;
    throw error;
  }
  let newEmployee = new Employee(data);
  return newEmployee.save();
};

export const getEmployeeWithID = (Employee, employeeID) => {
  return Employee.findById(employeeID);
};

export const updateEmployee = (Employee, employeeID, data) => {
  return Employee.findOneAndUpdate(
    { _id: employeeID },
    data,
    {
      new: true,
      useFindAndModify: false
    });
};

export const deleteEmployee = (Employee, employeeID) => {
  return Employee.findByIdAndDelete({ _id: employeeID });
};