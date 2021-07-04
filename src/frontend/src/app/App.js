import React from 'react';
import { Switch, Route, Link } from "react-router-dom";

import AppHeader from '../library/modules/AppHeader/AppHeader';
import AppFooter from '../library/modules/AppFooter/AppFooter';
import { unAuthenticatedRoutes } from '../lib/routes';

function App() {
  
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
          {unAuthenticatedRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              children={<route.render />}
            />
          ))}
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
