export const chatList = [
  {
    id: 0,
    isGroupChat: true,
    chatName: "Grupa NOVOakademii",
    users: [
      { id: 0, username: "Admin1" },
      { id: 1, username: "Admin2" },
      { id: 2, username: "Agnieszka" },
      { id: 3, username: "Jakub" },
    ],
    messages: [
      {
        id_message: 0,
        user_message: { id: 0 },
        text: "hello",
        message_date: "15:40, 24 of April",
      },
    ],
  },
]

export const userDataBase = [
  {
    id: 0,
    username: "Admin1",
    password: "admin",
    isAdmin: true,
    isLogged: false,
    chatList: [...chatList],
  },
  {
    id: 1,
    username: "Admin2",
    password: "admin",
    isAdmin: true,
    isLogged: false,
    chatList: [...chatList],
  },
  {
    id: 2,
    username: "Agnieszka",
    password: "user",
    isAdmin: false,
    isLogged: false,
    chatList: [chatList[0]],
  },
  {
    id: 3,
    username: "Jakub",
    password: "user",
    isAdmin: false,
    isLogged: false,
    chatList: [chatList[0]],
  },
]
