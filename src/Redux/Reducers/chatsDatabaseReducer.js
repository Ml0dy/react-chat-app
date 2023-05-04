import { chatList } from "../../Config/dataBase"

const initialState = chatList

export const chatsDatabaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CHATSDATABASE":
      return state
    case "SEND_MESSAGE":
      return state.map((chat) => {
        if (action.chatId === chat.id) {
          return {
            ...chat,
            messages: [
              ...chat.messages,
              {
                id_message: action.nextId,
                user_message: { id: action.currentUserId },
                text: action.value,
              },
            ],
          }
        }
        return { ...chat }
      })
    default:
      return state
  }
}
