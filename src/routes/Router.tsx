import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';
import { ROUTES } from 'src/constants/routes';
import Loadable from '../layouts/full/shared/loadable/Loadable';

const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const Modern = Loadable(lazy(() => import('../views/dashboards/Modern')));
const Employees = Loadable(lazy(() => import('../views/master/employee/employee')));
const EmployeeCreate = Loadable(lazy(() => import('../views/master/employee/employee-create')));
const EmployeeEdit = Loadable(lazy(() => import('../views/master/employee/employee-edit')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: ROUTES.HOME, exact: true, element: <Modern /> },
      { path: ROUTES.MASTER.EMPLOYEE.EMPLOYEE, element: <Employees /> },
      { path: ROUTES.MASTER.EMPLOYEE.EMPLOYEE_ADD, element: <EmployeeCreate /> },
      { path: ROUTES.MASTER.EMPLOYEE.EMPLOYEE_EDIT, element: <EmployeeEdit /> },
    ],
  },
];

const router = createBrowserRouter(Router);

export default router;
