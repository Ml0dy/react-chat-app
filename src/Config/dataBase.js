export const chatList = [
  {
    id: 1,
  },
  {
    id: 2,
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
    username: "Admin1",
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
    id: 3,
    username: "User3",
    password: "user3",
    isAdmin: false,
    isLogged: false,
    chatList: chatList[1],
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
    id: 3,
    username: "User3",
    password: "user3",
    isAdmin: false,
    isLogged: false,
    chatList: chatList[1],
  },
];
