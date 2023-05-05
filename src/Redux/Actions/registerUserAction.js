export const registerUserAction = (username, password, nextId) => {
  return {
    type: "REGISTER_USER",
    username,
    password,
    nextId,
  }
}
