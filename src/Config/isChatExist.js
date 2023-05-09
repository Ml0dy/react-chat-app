export const isChatExist = (userId, seconduserId, chatList) => {
  for (let i = 1; i < chatList.length; i++) {
    if (!chatList[i].isGroupChat)
      if (
        (chatList[i].users[0].id === userId ||
          chatList[i].users[1].id === userId) &&
        (chatList[i].users[0].id === seconduserId ||
          chatList[i].users[1].id === seconduserId)
      )
        return false
  }

  return true
}
