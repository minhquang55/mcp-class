import employeeJson from '@/data/employees.json';

export const getListEmployees = async () => {
  return employeeJson.employees;
};

export const getEmployeeById = async (id: string) => {
  const employees = employeeJson.employees;
  return employees.find((employee) => employee.id === id);
};
