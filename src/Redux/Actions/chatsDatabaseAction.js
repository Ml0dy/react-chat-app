export const chatsDatabaseAction = () => {
  return {
    type: "GET_CHATSDATABASE",
  }
}

export const sendMessageAction = (
  chatId,
  nextId,
  currentUserId,
  value,
  dateOfMessage
) => {
  return {
    type: "SEND_MESSAGE",
    chatId,
    nextId,
    currentUserId,
    value,
    dateOfMessage,
  }
}
export const addUserToGroupChatAction = (id, username) => {
  return {
    type: "ADD_NEW_TO_GROUP",
    id: id,
    username: username,
  }
}

export const changeGroupNameActon = (
  newName,
  chatId,
  nextMessageId,
  dateOfMessage
) => {
  return {
    type: "CHANGE_GROUP_NAME",
    newName,
    chatId,
    nextMessageId,
    dateOfMessage,
  }
}

export const createChatWithSingleUserAction = (
  nextChatId,
  userId,
  username,
  currentUserId,
  currentUsername,
  dateOfMessage
) => {
  return {
    type: "CREATE_CHAT",
    nextChatId,
    userId,
    username,
    currentUserId,
    currentUsername,
    dateOfMessage,
  }
}

export const createGroupChatAction = (
  nextChatId,
  chatName,
  usersInChat,
  dateOfMessage
) => {
  return {
    type: "CREATE_GROUP_CHAT",
    nextChatId,
    chatName,
    usersInChat,
    dateOfMessage,
  }
}
