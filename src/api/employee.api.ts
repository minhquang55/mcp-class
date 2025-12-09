import employeeJson from '@/data/employees.json';
import { EmployeeRow } from 'src/types/apps/employee';

export const getListEmployees = async (): Promise<Array<EmployeeRow>> => {
  return employeeJson.employees;
};

export const getEmployeeById = async (id: string) => {
  const employees = employeeJson.employees;
  return employees.find((employee) => employee.id === id);
};
