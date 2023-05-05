import { userDataBase } from "../../Config/dataBase"

const initialState = userDataBase

export const userDatabaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USERDATABASE":
      return state
    case "DELETE_USER":
      return state.filter((user) => (user.id !== action.payload ? user : false))
    case "REGISTER_USER":
      return [
        ...state,
        {
          id: action.nextId,
          username: action.username,
          password: action.password,
          isAdmin: false,
          isLogged: false,
          chatList: [],
        },
      ]

    default:
      return state
  }
}
