import { loggedUserAction } from "../Redux/Actions/loggedUserAction"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import {
  Avatar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import { deepOrange } from "@mui/material/colors"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const URL = "http://localhost:8080/users"
const CHATS_URL = "http://localhost:8080/chats"
const MESSAGES_URL = "http://localhost:8080/chat"

const ActiveChatList = ({
  setCurrentChatName,
  setCurrentChat,
  setCurrentChatMessages,
}) => {
  const loggedUser = useSelector((state) => state.loggedUserReducer)

  const [userListFromDatabase, setUserListFromDatabase] = useState([])
  const [allChatsFromDatabase, setAllChatsFromDatabase] = useState([])
  const [userChatList, setUserChatList] = useState(null)

  const dispatch = useDispatch()
  const { id, chats } = loggedUser

  const getSecondUser = (chat) => {
    if (chat.is_group_chat) return
    else if (chat.users[0].id !== id) return chat.users[0].username
    return chat.users[1].username
  }

  const getSingleChat = (chatId) => {
    axios
      .get(`${CHATS_URL}/${chatId}`)
      .then(({ data }) => setCurrentChat(data))
      .catch((error) => console.log(error))
  }

  const getChatMessages = (chatId) => {
    axios
      .get(`${MESSAGES_URL}/${chatId}/messages`)
      .then(({ data }) => setCurrentChatMessages(data))
      .catch((error) => console.log(error))
  }

  const handlePickChat = (chat) => {
    getSingleChat(chat.id)
    getChatMessages(chat.id)
    if (chat.is_group_chat) setCurrentChatName(chat.chat_name)
    else setCurrentChatName(getSecondUser(chat))
  }

  const getAllChats = () => {
    axios
      .get(CHATS_URL)
      .then(({ data }) => {
        setAllChatsFromDatabase(data)
      })
      .catch((error) => console.log(error))
  }

  const getAllUsers = () => {
    axios
      .get(URL)
      .then(({ data }) => {
        setUserListFromDatabase(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    if (userListFromDatabase[id])
      dispatch(loggedUserAction(userListFromDatabase[id]))
  }, [userListFromDatabase])

  useEffect(() => {
    getAllUsers()
    getAllChats()
  }, [])

  useEffect(() => {
    const userChats = []

    for (const chat in chats) {
      for (const element of allChatsFromDatabase) {
        if (chats[chat] === element.id) userChats.push(element)
      }
    }

    setUserChatList(userChats)
  }, [allChatsFromDatabase])

  return (
    <List
      sx={{
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        marginTop: "2px",
        backgroundColor: "#D4D4D4",
      }}
    >
      {userChatList === null ? (
        <ListItemText primary="No chats found, click on a person or create a new group chat" />
      ) : (
        userChatList.map((chat) => {
          return (
            <ListItem key={chat.id} disablePadding>
              <ListItemButton onClick={() => handlePickChat(chat)}>
                <ListItemIcon>
                  <Avatar
                    sx={{
                      bgcolor: deepOrange[500],
                      boxShadow: 2,
                    }}
                  >
                    <AccountCircleIcon />
                  </Avatar>
                </ListItemIcon>
                <ListItemText primary={chat.chat_name} />
              </ListItemButton>
            </ListItem>
          )
        })
      )}
    </List>
  )
}

export default ActiveChatList
