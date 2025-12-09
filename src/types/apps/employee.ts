export type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
};

export type Employee = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
};

export type EmployeeRow = {
  id: string;
  name: string;
  email: string;
  position: string;
  status: string;
  rating: number;
  joinedAt: string;
};
