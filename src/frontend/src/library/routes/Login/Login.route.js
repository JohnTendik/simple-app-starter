import React from 'react';

import LoginForm from '../../components/LoginForm/LoginForm';
import PageContainer from '../../components/PageContainer/PageContainer';

const LoginRoute = () => {

  return (
    <main>
      <PageContainer>
        <h2>Login!</h2>
        <p>Use the following for below to login to your app!</p>
        <LoginForm />
      </PageContainer>
    </main>
  )
};

export default LoginRoute;