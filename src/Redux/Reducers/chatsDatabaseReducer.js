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
    case "ADD_NEW_TO_GROUP":
      return state.map((chat) => {
        if (chat.id === 0)
          return {
            ...chat,
            users: [
              ...chat.users,
              { id: action.id, username: action.username },
            ],
          }
        return chat
      })
    case "CHANGE_GROUP_NAME":
      return state.map((chat) => {
        if (chat.id === 0)
          return {
            ...chat,
            chatName: action.newName,
          }
        return chat
      })

    case "CREATE_CHAT":
      return [
        ...state,
        {
          id: action.nextChatId,
          isGroupChat: false,
          users: [
            { id: action.currentUserId, username: action.currentUsername },
            { id: action.userId, username: action.username },
          ],
          id_message: 0,
          messages: [
            {
              id_message: 0,
              user_message: { id: -1 },
              text: "hello, you can start your conversation now :)",
            },
          ],
        },
      ]

    default:
      return state
  }
}
