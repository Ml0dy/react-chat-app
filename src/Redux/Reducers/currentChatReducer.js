import { chatList, userDataBase } from "../../Config/dataBase"

const initialState = { ...chatList[0], users: [...userDataBase] }

export const currentChatReducer = (state = { chat: initialState }, action) => {
  switch (action.type) {
    case "GET_CURRENT_CHAT":
      return (state.chat = action.payload)
    default:
      return state
  }
}
