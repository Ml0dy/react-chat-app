export const loggedUserAction = (currentUser) => {
  return {
    type: "GET_USER",
    payload: { id: currentUser },
  };
};
