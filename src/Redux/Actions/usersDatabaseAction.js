export const usersDatabaseAction = () => {
  return {
    type: "GET_USERDATABASE",
  }
}

export const deleteUserAction = (id) => {
  return {
    type: "DELETE_USER",
    id,
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

export const addNewChatToUserAction = (currentId, newChat) => {
  return {
    type: "ADD_NEW_CHAT_TO_USER",
    currentId,
    newChat,
  }
}
