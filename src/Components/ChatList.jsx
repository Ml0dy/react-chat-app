import {
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material"
import { Box } from "@mui/material"
import React, { useEffect, useRef, useState } from "react"
import SendIcon from "@mui/icons-material/Send"
import { useDispatch, useSelector } from "react-redux"
import { deepOrange } from "@mui/material/colors"
import ChatView from "./ChatView"
import { currentChatAction } from "../Redux/Actions/currentChatAction"
import { sendMessageAction } from "../Redux/Actions/chatsDatabaseAction"

const ChatList = () => {
  const [currentChat, setCurrentChat] = useState(0)
  const [messageValue, setMessageValue] = useState("")

  const loggedUser = useSelector((state) => state.loggedUserReducer.user)
  const usersList = useSelector((state) => state.userDatabaseReducer)
  const reducerCurrentChat = useSelector((state) => state.currentChatReducer)
  const chatDatabase = useSelector((state) => state.chatsDatabaseReducer)

  const { chatList, id } = loggedUser

  const dispatch = useDispatch()
  const container = useRef(null)

  const handleScroll = () => {
    const { scrollHeight } = container.current
    container.current?.scrollTo(0, scrollHeight)
  }

  const getSecondUser = (id) => {
    const [secondUser] = usersList.filter((user) => {
      if (user.id === id) return { user }
    })
    return secondUser
  }

  const userChatList = chatList.map((chat) => {
    if (chat.users[0].id === id) {
      return getSecondUser(chat.users[1].id)
    }
    return getSecondUser(chat.users[0].id)
  })
  console.log(userChatList)
  const handlePickChat = (index) => {
    console.log(index)
    setCurrentChat(index)
  }

  const handleSendMessage = () => {
    const [newMessageId] = reducerCurrentChat.chat.messages.slice(-1)
    const currentMessageId = (newMessageId.id_message += 1)

    dispatch(
      sendMessageAction(
        reducerCurrentChat.chat.id,
        currentMessageId,
        id,
        messageValue
      )
    )
    setMessageValue("")
  }

  useEffect(() => {
    dispatch(currentChatAction(chatDatabase[currentChat]))
  }, [currentChat])

  useEffect(() => {
    handleScroll()
  }, [chatDatabase[currentChat]])

  return (
    <Box
      className="chats-container"
      sx={{
        flexGrow: 1,
        height: 680,
        width: 1200,
        overflow: "hidden",
        mt: 8,
        display: "flex",
        flexDirection: "row",

        borderRadius: 4,
        paddingRight: 3,
      }}
    >
      <Box
        className="box_list"
        sx={{
          flexGrow: 1,
          height: "93%",
          width: "30%",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: 3,
          borderRadius: 4,
        }}
      >
        <Box
          sx={{
            backgroundColor: "#212766",
            height: "12%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: 2,
          }}
        >
          <Typography variant="h5" alignContent="center" mt={2} color="white">
            Chat List
          </Typography>
        </Box>
        <List>
          {chatList.map((chat) => {
            let secondUsername = ""
            if (chat.users[0].id === id) secondUsername = chat.users[1].username
            else secondUsername = chat.users[0].username
            return (
              <ListItem key={chat.id} disablePadding>
                <ListItemButton onClick={() => handlePickChat(chat.id)}>
                  <ListItemIcon>
                    <Avatar sx={{ bgcolor: deepOrange[500], boxShadow: 2 }}>
                      {secondUsername.charAt(0).toUpperCase()}
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText primary={secondUsername} />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
        <Divider />
      </Box>
      <Box
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[50]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "93%",
          width: "80%",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          mt: 3,
          borderRadius: 4,
          position: "relative",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#212766",
            height: "13%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            boxShadow: 3,
          }}
        >
          <Typography
            variant="h5"
            alignContent="center"
            mt={4}
            mr={3}
            color="white"
          >
            Username
          </Typography>
        </Box>
        <Box
          ref={container}
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[250]
                : theme.palette.grey[900],
            height: "80%",
            maxHeight: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            overflowY: "scroll",
            scrollbarWidth: "none",
            behavior: "smooth",
          }}
        >
          <Typography variant="h8" alignContent="center" mt={2}>
            <ChatView chatMessages={chatDatabase[currentChat]} />
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[900],
            height: "10%",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TextField
            id="filled-basic"
            variant="filled"
            sx={{
              width: "80%",
              height: 10,
            }}
            value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)}
            onKeyUp={(e) => (e.key === "Enter" ? handleSendMessage() : "")}
          />

          <Button
            variant="contained"
            endIcon={<SendIcon />}
            sx={{
              width: "15%",
              height: 40,
              m: 1,
            }}
            onClick={handleSendMessage}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default ChatList
