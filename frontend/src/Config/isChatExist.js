export const isChatExist = (userId, seconduserId, chatList) => {
  for (const element of chatList) {
    if (!element.is_group_chat)
      if (
        (element.users[0] === userId || element.users[1] === userId) &&
        (element.users[0] === seconduserId || element.users[1] === seconduserId)
      )
        return false
  }

  return true
}
