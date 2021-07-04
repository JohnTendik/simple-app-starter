import React, { useContext, useState } from 'react';

import { store } from '../../../lib/store';
import { postLoginRequest } from '../../../lib/api-client';

import './LoginForm.scss';

const LoginForm = () => {
  const { dispatch } = useContext(store);
  const [loginDetails, setLoginDetails] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (key, value) => {
    setLoginDetails({ ...loginDetails, [key]: value });
  };

  const handleLoginRequest = () => {
    if (!loginDetails.username || loginDetails.username === '') {
      alert('Username must be provided');
      return;
    }

    if (!loginDetails.password || loginDetails.password === '') {
      alert('Password must be provided');
      return;
    }
    
    postLoginRequest(loginDetails)
      .then((response) => {
        // User has successfully logged in
        // Handle reload / rerender here.
        alert('Login successful!');
        dispatch({type: 'updateCurrentUser', value: response});
      }).catch((err) => {
        if (!err.response) {
          console.log("Error", err);
          alert('An unknown error occured.');
        }

        if (err.response.status === 404) {
          if (err.response && err.response.data && err.response.data.message) {
            alert('User does not exist.');
          }
        }

        if (err.response.status === 401) {
          if (err.response && err.response.data && err.response.data.message) {
            alert('User or password is incorrect or user does not exist.');
          }
        }
      });
  };

  return (
    <div className='loginForm-container'>
      <label>Username</label>
      <input
        type='text'
        value={loginDetails.username}
        onChange={(evt) => handleInputChange('username', evt.target.value)}
        placeholder='username' />

      <label>Password</label>
      <input
        type='password'
        value={loginDetails.password}
        onChange={(evt) => handleInputChange('password', evt.target.value)}
        placeholder='password' />

      <button onClick={handleLoginRequest}>Login</button>
    </div>
  )
};

export default LoginForm;