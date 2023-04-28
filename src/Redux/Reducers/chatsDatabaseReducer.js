import { chatList } from "../../Config/dataBase"

const initialState = chatList

export const chatsDatabaseReducer = (state = initialState, action, chatId) => {
  switch (action.type) {
    case "GET_CHATSDATABASE":
      return state
    default:
      return state
  }
}
