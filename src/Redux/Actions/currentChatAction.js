export const currentChatAction = (currentChat) => {
  return {
    type: "GET_CURRENT_CHAT",
    payload: { chat: currentChat },
  }
}
