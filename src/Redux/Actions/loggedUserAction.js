export const loggedUserAction = (currentUser) => {
  return {
    type: "GET_USER",
    payload: { user: currentUser },
  }
}

export const logoutUserAction = () => {
  return {
    type: "LOGOUT",
  }
}

export const updateLoggedUserAction = (payload) => {
  return {
    type: "UPDATE_USER",
    payload,
  }
}
