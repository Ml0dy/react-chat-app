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
