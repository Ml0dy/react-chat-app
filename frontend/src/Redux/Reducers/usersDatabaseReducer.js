import { chatList } from "../../Config/dataBase"
import axios from "axios"

const URL = "http://localhost:8080/users"

const getAllUsers = () => {
  return axios
    .get(URL)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
    })
}

const initialState = getAllUsers()

export const userDatabaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USERDATABASE":
      return state
    case "DELETE_USER":
      return state.filter((user) => (user.id !== action.id ? user : false))
    case "REGISTER_USER":
      return [
        ...state,
        {
          id: action.nextId,
          username: action.username,
          password: action.password,
          isAdmin: false,
          isLogged: false,
          chatList: [chatList[0]],
        },
      ]
    case "ADD_NEW_CHAT_TO_USER":
      return state.map((user) => {
        if (user.id === action.currentId)
          return { ...user, chatList: [...user.chatList, action.newChat] }
        return user
      })
    default:
      return state
  }
}
