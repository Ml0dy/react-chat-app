const initialState = {
  id: 2,
  users: [
    {
      id: 3,
    },
    {
      id: 4,
    },
  ],
  messages: [
    {
      id_message: 0,
      user_message: { id: 3 },
      text: "hejka",
    },
    {
      id_message: 1,
      user_message: { id: 4 },
      text: "siemka",
    },
  ],
}

export const currentChatReducer = (state = { chat: initialState }, action) => {
  switch (action.type) {
    case "GET_CURRENT_CHAT":
      return (state.chat = action.payload)
    default:
      return state
  }
}
