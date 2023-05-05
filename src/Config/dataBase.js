export const chatList = [
  {
    id: 0,
    users: [
      {
        id: 2,
        username: "User1",
      },
      {
        id: 3,
        username: "User2",
      },
    ],
    messages: [
      {
        id_message: 0,
        user_message: { id: 2 },
        text: "hello",
      },
      {
        id_message: 1,
        user_message: { id: 3 },
        text: "hi",
      },
      {
        id_message: 2,
        user_message: { id: 2 },
        text: "fsfsfsdfs",
      },
      {
        id_message: 3,
        user_message: { id: 3 },
        text: "jytuytu",
      },
    ],
  },
  {
    id: 1,
    users: [
      {
        id: 2,
        username: "User1",
      },
      {
        id: 4,
        username: "User3",
      },
    ],
    messages: [
      {
        id_message: 0,
        user_message: { id: 2 },
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
    id: 2,
    users: [
      {
        id: 2,
        username: "User1",
      },
      {
        id: 5,
        username: "User4",
      },
    ],
    messages: [
      {
        id_message: 0,
        user_message: { id: 2 },
        text: "W polskiej myśli geopolitycznej można wyróżnić trzy główne metakoncepcje: krainy przejściowej, krainy pomostowej oraz przedmurza. Autorem pierwszej z nich jest Wacław Nałkowski (1851-1911), warszawski geograf, który uważał, że terytorium Polski charakteryzuje się nieokreślonością, brakiem stałości i charakteru. Ta przejściowość ma być dla nas zagrożeniem, szczególnie ze strony wrogich sąsiadów (Niemiec i Rosji). Koncepcja ta sugeruje, że dla wzmocnienia pozycji Polski warto szukać silnych sojuszy międzynarodowych, a jednocześnie budować sprawne państwo. Wyrazem tej wizji zdaje się być uczestnictwo Polski w wielkich projektach politycznych, wojskowych i gospodarczych, szczególnie w NATO i UE, ale też sojusz z USA.",
      },
      {
        id_message: 1,
        user_message: { id: 5 },
        text: "siemka",
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
    username: "User1",
    password: "user",
    isAdmin: false,
    isLogged: false,
    chatList: [chatList[0], chatList[1], chatList[2]],
  },
  {
    id: 3,
    username: "User2",
    password: "user2",
    isAdmin: false,
    isLogged: false,
    chatList: [chatList[0]],
  },
  {
    id: 4,
    username: "User3",
    password: "user3",
    isAdmin: false,
    isLogged: false,
    chatList: [chatList[1]],
  },
  {
    id: 5,
    username: "User4",
    password: "user3",
    isAdmin: false,
    isLogged: false,
    chatList: [chatList[2]],
  },
  {
    id: 6,
    username: "User5",
    password: "user3",
    isAdmin: false,
    isLogged: false,
    chatList: [chatList[1]],
  },
  {
    id: 7,
    username: "User6",
    password: "user3",
    isAdmin: false,
    isLogged: false,
    chatList: [chatList[1]],
  },
]
