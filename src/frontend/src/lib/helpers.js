export const getCurrentUserFromStorage = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken) {
    return user;
  } else {
    return null;
  }
};
