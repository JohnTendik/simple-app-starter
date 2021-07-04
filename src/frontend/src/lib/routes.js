import React from 'react';

import HomePageRoute from '../library/routes/HomePage/HomePage.route';
import LoginRoute from '../library/routes/Login/Login.route';

// If your application locks functionality behind a user login
// the following arrays can be implemented to ensure only authenticated
// users have access to the right areas
const baseRoutes = [
  {
    path: "/",
    exact: true,
    render: () => <HomePageRoute />
  }
];

const adminRoutes = [
  {
    path: "/admin",
    exact: true,
    render: () => (<p>Admin route</p>)
  },
];

const userRoutes = [
  {
    path: "/profile",
    exact: true,
    render: () => (<p>User profile</p>)
  },
];

const unAuthenticatedRoutes = [
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
  baseRoutes,
  userRoutes,
  adminRoutes,
  unAuthenticatedRoutes,
};