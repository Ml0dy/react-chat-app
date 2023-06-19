export const loggedUserAction = (currentUser) => {
  return {
    type: "GET_USER",
    user: currentUser,
  }
}

export const updateUserChats = (updatedChats) => {
  return {
    type: "UPDATE_USER_CHATS",
    updatedChats,
  }
}

export const logoutUserAction = () => {
  return {
    type: "LOGOUT",
  }
}
