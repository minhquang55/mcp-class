export const ROUTES = {
  HOME: '/',

  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    MAINTENANCE: '/maintenance',
  },
  MASTER: {
    EMPLOYEE: {
      EMPLOYEE: '/master/employee',
      EMPLOYEE_ADD: '/master/employee/add',
    },
  },
  PAGES: {
    UTILITIES_TABLE: '/utilities/table',
    UTILITIES_FORM: '/utilities/form',
    USER_PROFILE: '/user-profile',
  },
  APPS: {
    NOTES: '/apps/notes',
    TICKETS: '/apps/tickets',
    CREATE_TICKETS: '/apps/tickets/create',
    BLOG_POST: '/apps/blog/post',
    BLOG_DETAIL: '/apps/blog/detail/:id',
  },
  ICONS: {
    ICONIFY: '/icons/iconify',
  },
  FORBIDDEN: '/403',
  OTHER: {
    NOTFOUND: '/404',
    AUTH_NOTFOUND: '/auth/404',
    ERROR: '*',
  },
};
