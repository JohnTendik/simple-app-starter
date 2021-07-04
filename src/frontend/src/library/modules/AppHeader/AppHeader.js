import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { store } from '../../../lib/store';

import './AppHeader.scss';
import PageContainer from '../../components/PageContainer/PageContainer';

const AppHeader = () => {
  const { state } = useContext(store);

  const renderLoginLinks = () => (
    state.currentUser === null && (
      <>
        <Link to='/login'>Login</Link>
      </>
    )
  );

  const renderUserLinks = () => (
    (state.currentUser !== null && state.currentUser.accessToken) && (
      <>
        <Link to='/profile'>My Account</Link>
      </>
    )
  );

  return (
    <header className='app-header'>
      <PageContainer>
        <h2>{state.appName}</h2>
        <nav className='main-nav'>
          <Link to='/'>Home</Link>
          {renderLoginLinks()}
          {renderUserLinks()}
        </nav>
      </PageContainer>
    </header>
  )
};

export default AppHeader;