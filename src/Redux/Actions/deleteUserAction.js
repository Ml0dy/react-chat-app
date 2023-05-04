export const deleteUserAction = (id) => {
  return {
    type: "DELETE_USER",
    payload: id,
  }
}
