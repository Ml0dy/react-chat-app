export const loggedUserAction = (currentUser) => {
  return {
    type: "GET_USER",
    payload: { user: currentUser },
  };
};

export const logoutUserAction = () => {
  return {
    type: "LOGOUT",
  };
};
