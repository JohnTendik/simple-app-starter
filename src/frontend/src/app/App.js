import React, { useContext } from 'react';
import { Switch, Route, Link } from "react-router-dom";

import AppHeader from '../library/modules/AppHeader/AppHeader';
import AppFooter from '../library/modules/AppFooter/AppFooter';
import { store } from '../lib/store';
import { adminRoutes, userRoutes, baseRoutes, unAuthenticatedRoutes } from '../lib/routes';

function App() {
  const {state} = useContext(store);

  const getUserRoutes = () => {
    let availableRoutes = [...baseRoutes];

    if (state.currentUser.roles.includes('ROLE_USER')) {
      availableRoutes = [...availableRoutes, ...userRoutes];
    }

    if (state.currentUser.roles.includes('ROLE_ADMIN')) {
      availableRoutes = [...availableRoutes, ...adminRoutes];
    }

    return availableRoutes;
  };

  const renderRoutes = (routes) => (
    routes.map((route, index) => (
      <Route
        key={index}
        path={route.path}
        exact={route.exact}
        children={<route.render />}
      />
    ))
  );

  const Page404 = () => {
    return (
      <p>404 Page not found</p>
    );
  };

  return (
    <div className='app'>
      <AppHeader />

      <section>
        <Switch>
          {state.currentUser === null 
            ? renderRoutes([...baseRoutes, ...unAuthenticatedRoutes])
            : renderRoutes(getUserRoutes())}
          <Route path="*">
            <Page404 />
          </Route>
        </Switch>
      </section>

      <AppFooter />
    </div>
  );
}

export default App;
