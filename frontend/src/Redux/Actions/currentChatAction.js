export const currentChatAction = (currentChat) => {
  return {
    type: "GET_CURRENT_CHAT",
    chat: currentChat,
  }
}
