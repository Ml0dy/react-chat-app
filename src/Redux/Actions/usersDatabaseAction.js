export const usersDatabaseAction = () => {
  return {
    type: "GET_USERDATABASE",
  }
}

export const deleteUserAction = (id) => {
  return {
    type: "DELETE_USER",
    payload: id,
  }
}

export const registerUserAction = (username, password, nextId) => {
  return {
    type: "REGISTER_USER",
    username,
    password,
    nextId,
  }
}
