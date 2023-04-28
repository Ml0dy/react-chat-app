const initialUser = {
  id: -1,
  username: " ",
  password: " ",
  isAdmin: false,
  isLogged: false,
  chatList: [
    {
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
    },
  ],
}

const loggedUserReducer = (state = { user: initialUser }, action) => {
  switch (action.type) {
    case "GET_USER":
      return (state.user = action.payload)
    case "LOGOUT":
      return (state.user = {})
    default:
      return state
  }
}

export default loggedUserReducer
