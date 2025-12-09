import employeeJson from '@/data/employees.json';

export const getListEmployees = async () => {
  return employeeJson.employees;
};
