import { chatList, userDataBase } from "../../Config/dataBase"

const initialState = { ...chatList[0], users: [...userDataBase] }
export const currentChatReducer = (state = initialState, action) => {
  if (action.type === "GET_CURRENT_CHAT") return action.chat
  else return state
}
