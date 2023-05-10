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
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const ActiveChatList = ({ chatList, setCurrentChatName, setCurrentChat }) => {
  const chatDatabase = useSelector((state) => state.chatsDatabaseReducer)
  const loggedUser = useSelector((state) => state.loggedUserReducer.user)
  const usersList = useSelector((state) => state.userDatabaseReducer)

  const dispatch = useDispatch()
  const { id } = loggedUser

  const getSecondUser = (chat) => {
    if (chat.isGroupChat) return
    else if (chat.users[0].id !== id) return chat.users[0].username
    return chat.users[1].username
  }

  const handlePickChat = (chat) => {
    setCurrentChat(chat.id)
    if (chat.isGroupChat) setCurrentChatName(chat.chatName)
    else setCurrentChatName(getSecondUser(chat))
  }

  useEffect(() => {
    if (usersList[id]) dispatch(loggedUserAction(usersList[id]))
  }, [usersList])

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
      {chatList.map((chat, index) => {
        let secondUsername = ""
        if (chat.users[0].id === id) secondUsername = chat.users[1].username
        else secondUsername = chat.users[0].username
        return (
          <ListItem key={index} disablePadding>
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
              <ListItemText
                primary={
                  chat.isGroupChat
                    ? chatDatabase[chat.id].chatName
                    : secondUsername
                }
              />
            </ListItemButton>
          </ListItem>
        )
      })}
    </List>
  )
}

export default ActiveChatList
