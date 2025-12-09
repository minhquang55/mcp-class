import customersJson from '@/data/customers.json';

export const getListCustomers = async () => {
  return customersJson.customers;
};

export const getCustomerById = async (id: string) => {
  const customers = customersJson.customers;
  return customers.find((customer) => customer.id === id);
};
