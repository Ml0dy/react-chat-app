export const chatsDatabaseAction = () => {
  return {
    type: "GET_CHATSDATABASE",
  }
}

export const sendMessageAction = (chatId, nextId, currentUserId, value) => {
  return {
    type: "SEND_MESSAGE",
    chatId,
    nextId,
    currentUserId,
    value,
  }
}
export const addUserToGroupChatAction = (id, username) => {
  return {
    type: "ADD_NEW_TO_GROUP",
    id: id,
    username: username,
  }
}
