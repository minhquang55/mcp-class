// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import { ROUTES } from 'src/constants/routes';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

// authentication

const Login2 = Loadable(lazy(() => import('../views/authentication/auth2/Login')));

const Register2 = Loadable(lazy(() => import('../views/authentication/auth2/Register')));

const Maintainance = Loadable(lazy(() => import('../views/authentication/Maintainance')));

// Dashboards
const Modern = Loadable(lazy(() => import('../views/dashboards/Modern')));

//pages
const UserProfile = Loadable(lazy(() => import('../views/pages/user-profile')));

/* ****Apps***** */
const Notes = Loadable(lazy(() => import('../views/apps/notes/Notes')));
const Form = Loadable(lazy(() => import('../views/utilities/form/Form')));
const Table = Loadable(lazy(() => import('../views/utilities/table/Table')));
const Tickets = Loadable(lazy(() => import('../views/apps/tickets/Tickets')));
const CreateTickets = Loadable(lazy(() => import('../views/apps/tickets/CreateTickets')));
const Blog = Loadable(lazy(() => import('../views/apps/blog/Blog')));
const BlogDetail = Loadable(lazy(() => import('../views/apps/blog/BlogDetail')));

const Error = Loadable(lazy(() => import('../views/authentication/Error')));

// // icons
const SolarIcon = Loadable(lazy(() => import('../views/icons/SolarIcon')));

// const SamplePage = lazy(() => import('../views/sample-page/SamplePage'));

// Master
const Employees = Loadable(lazy(() => import('../views/master/employee/employee')));
const EmployeesForm = Loadable(lazy(() => import('../views/master/employee/employee-form')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: ROUTES.HOME, exact: true, element: <Modern /> },
      // { path: '/', exact: true, element: <SamplePage /> },
      { path: ROUTES.OTHER.ERROR, element: <Navigate to={ROUTES.OTHER.AUTH_NOTFOUND} /> },

      { path: ROUTES.APPS.NOTES, element: <Notes /> },
      { path: ROUTES.PAGES.UTILITIES_FORM, element: <Form /> },
      { path: ROUTES.PAGES.UTILITIES_TABLE, element: <Table /> },
      { path: ROUTES.APPS.TICKETS, element: <Tickets /> },
      { path: ROUTES.APPS.CREATE_TICKETS, element: <CreateTickets /> },
      { path: ROUTES.APPS.BLOG_POST, element: <Blog /> },
      { path: ROUTES.APPS.BLOG_DETAIL, element: <BlogDetail /> },
      { path: ROUTES.PAGES.USER_PROFILE, element: <UserProfile /> },
      { path: ROUTES.ICONS.ICONIFY, element: <SolarIcon /> },
      { path: ROUTES.MASTER.EMPLOYEE.EMPLOYEE, element: <Employees /> },
      { path: ROUTES.MASTER.EMPLOYEE.EMPLOYEE_ADD, element: <EmployeesForm /> },
    ],
  },
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: ROUTES.AUTH.LOGIN, element: <Login2 /> },

      { path: ROUTES.AUTH.REGISTER, element: <Register2 /> },

      { path: ROUTES.AUTH.MAINTENANCE, element: <Maintainance /> },
      { path: ROUTES.OTHER.NOTFOUND, element: <Error /> },
      { path: ROUTES.OTHER.AUTH_NOTFOUND, element: <Error /> },
      { path: ROUTES.OTHER.ERROR, element: <Navigate to={ROUTES.OTHER.AUTH_NOTFOUND} /> },
    ],
  },
];

const router = createBrowserRouter(Router);

export default router;
