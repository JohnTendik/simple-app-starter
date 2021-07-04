import Axios from 'axios';
import { getCurrentUserFromStorage } from './helpers';

const authHeader = () => {
  const user = getCurrentUserFromStorage();
  if (user && user.accessToken) {
    // for Node.js Express back-end
    return { 'x-access-token': user.accessToken };
  } else {
    return {};
  }
};

const apiClient = Axios.create({
  baseURL: '//localhost:3001',
  headers: {
    ...authHeader(),
    'X-MVP-App-Header': 'mvpApp',
  }
});

export const postLoginRequest = ({username, password}) => {
  return apiClient.post('/api/auth/signin', {
    username,
    password
  })
  .then(response => {
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data;
  });
};