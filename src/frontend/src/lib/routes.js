import React from 'react';

import HomePageRoute from '../library/routes/HomePage/HomePage.route';
import LoginRoute from '../library/routes/Login/Login.route';

// If your application locks functionality behind a user login
// the following array can be implemented to ensure only authenticated
// users have access to the right areas
const adminRoutes = [
  {
    path: "/admin",
    exact: true,
    render: () => (<p>Admin route</p>)
  },
];

const unAuthenticatedRoutes = [
  {
    path: "/",
    exact: true,
    render: () => <HomePageRoute />
  },
  {
    path: "/login",
    exact: true,
    render: () => <LoginRoute />
  },
  {
    path: "/register",
    exact: true,
    render: () => (<p>Register</p>)
  },
];

export {
  adminRoutes,
  unAuthenticatedRoutes,
};