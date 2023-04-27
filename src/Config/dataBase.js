export const chatList = [
  {
    id: 1,
    users: [
      {
        id: 1,
      },
      {
        id: 2,
      },
    ],
    messages: [
      {
        id_message: 0,
        user_message: { id: 1 },
        text: "hello",
      },
      {
        id_message: 1,
        user_message: { id: 2 },
        text: "hi",
      },
    ],
  },
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
  {
    id: 3,
  },
];

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
    id: 10,
    username: "Admin2",
    password: "admin",
    isAdmin: true,
    isLogged: false,
    chatList: [...chatList],
  },
  {
    id: 1,
    username: "User1",
    password: "user",
    isAdmin: false,
    isLogged: false,
    chatList: chatList[0],
  },
  {
    id: 2,
    username: "User2",
    password: "user2",
    isAdmin: false,
    isLogged: false,
    chatList: chatList[0],
  },
  {
    id: 3,
    username: "User3",
    password: "user3",
    isAdmin: false,
    isLogged: false,
    chatList: chatList[1],
  },
  {
    id: 4,
    username: "User4",
    password: "user3",
    isAdmin: false,
    isLogged: false,
    chatList: chatList[1],
  },
  {
    id: 5,
    username: "User5",
    password: "user3",
    isAdmin: false,
    isLogged: false,
    chatList: chatList[1],
  },
  {
    id: 6,
    username: "User6",
    password: "user3",
    isAdmin: false,
    isLogged: false,
    chatList: chatList[1],
  },
];
