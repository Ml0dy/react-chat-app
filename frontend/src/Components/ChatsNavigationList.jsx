import { isChatExist } from "../Config/isChatExist"
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
import { useSelector } from "react-redux"

const CHATS_URL = "http://localhost:8080/chats"

const ChatsNavigationList = ({
  userListFromDatabase,
  handleCreateSingleChat,
}) => {
  const { id } = useSelector((state) => state.loggedUserReducer)
  const [allChatsFromDatabase, setAllChatsFromDatabase] = useState(null)

  const getAllChats = () => {
    axios
      .get(CHATS_URL)
      .then(({ data }) => {
        setAllChatsFromDatabase(data)
      })
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    getAllChats()
  }, [])

  return (
    <List
      sx={{
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {userListFromDatabase === null || allChatsFromDatabase === null
        ? false
        : userListFromDatabase.map((user) => {
            if (isChatExist(id, user.id, allChatsFromDatabase)) {
              if (user.id === id) return false
              return (
                <ListItem key={user.id}>
                  <ListItemButton
                    onClick={() =>
                      handleCreateSingleChat(user.id, user.username)
                    }
                  >
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
                    <ListItemText primary={user.username} />
                  </ListItemButton>
                </ListItem>
              )
            }
            return false
          })}
    </List>
  )
}

export default ChatsNavigationList
