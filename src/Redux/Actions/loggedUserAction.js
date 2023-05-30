export const loggedUserAction = (currentUser) => {
  return {
    type: "GET_USER",
    user: currentUser,
  }
}

export const logoutUserAction = () => {
  return {
    type: "LOGOUT",
  }
}
