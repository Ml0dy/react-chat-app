import { monthNames } from "../Config/GlobalVariables"
import { isChatExist } from "../Config/isChatExist"
import {
  changeGroupNameActon,
  sendMessageAction,
} from "../Redux/Actions/chatsDatabaseAction"
import { createChatWithSingleUserAction } from "../Redux/Actions/chatsDatabaseAction"
import { currentChatAction } from "../Redux/Actions/currentChatAction"
import { addNewChatToUserAction } from "../Redux/Actions/usersDatabaseAction"
import ActiveChatList from "./ActiveChatList"
import ChatView from "./ChatView"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone"
import SendIcon from "@mui/icons-material/Send"
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material"
import { Box } from "@mui/material"
import { deepOrange } from "@mui/material/colors"
import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const ChatList = () => {
  const loggedUser = useSelector((state) => state.loggedUserReducer.user)
  const reducerCurrentChat = useSelector((state) => state.currentChatReducer)
  const chatDatabase = useSelector((state) => state.chatsDatabaseReducer)
  const usersList = useSelector((state) => state.userDatabaseReducer)

  const [currentChat, setCurrentChat] = useState(0)
  const [messageValue, setMessageValue] = useState("")
  const [currentChatName, setCurrentChatName] = useState("NOVOacademy Team")
  const [open, setOpen] = useState(false)
  const { chatList, id, isAdmin, username } = loggedUser
  const dispatch = useDispatch()
  const container = useRef(null)

  const handleScroll = () => {
    const { scrollHeight } = container.current
    container.current?.scrollTo(0, scrollHeight)
  }

  const today = new Date()

  const currentTime = () => {
    const hours = () => {
      if (today.getHours() > 9) return today.getHours()
      return "0" + today.getHours()
    }

    const minutes = () => {
      if (today.getMinutes() > 9) return today.getMinutes()
      return "0" + today.getMinutes()
    }

    const month = today.getMonth()

    const day = () => {
      if (today.getDate() <= 9) return "0" + today.getDate()
      return today.getDate()
    }
    return hours() + ":" + minutes() + ", " + day() + " of " + monthNames[month]
  }

  const handleSendMessage = () => {
    if (messageValue === "") return false

    const [newMessageId] = reducerCurrentChat.chat.messages.slice(-1)
    const currentMessageId = (newMessageId.id_message += 1)

    dispatch(
      sendMessageAction(
        reducerCurrentChat.chat.id,
        currentMessageId,
        id,
        messageValue,
        currentTime()
      )
    )
    setMessageValue("")
  }

  const handleCreateNewChat = (userId, secondUsername) => {
    if (isChatExist(id, userId, chatDatabase)) {
      const newChatsId = chatDatabase.length
      dispatch(
        createChatWithSingleUserAction(
          newChatsId,
          userId,
          secondUsername,
          id,
          username,
          currentTime()
        )
      )
      setCurrentChat(newChatsId)
      setTimeout(() => {
        dispatch(addNewChatToUserAction(id, reducerCurrentChat.chat.chat))
        dispatch(addNewChatToUserAction(userId, reducerCurrentChat.chat.chat))
      }, 10)
      setCurrentChatName(secondUsername)
    }
  }

  useEffect(() => {
    dispatch(currentChatAction(chatDatabase[currentChat]))
  }, [currentChat, currentChatName])

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
          position: "relative",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#212766",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            scrollbarWidth: "none",
            boxShadow: 2,
          }}
        >
          <Typography
            variant="h5"
            alignContent="center"
            mt={2}
            mb={3}
            color="white"
          >
            Chat List
          </Typography>
        </Box>
        <Box
          sx={{
            height: "auto",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            scrollbarWidth: "none",
            behavior: "smooth",
          }}
        >
          <ActiveChatList
            chatList={chatList}
            setCurrentChat={setCurrentChat}
            setCurrentChatName={setCurrentChatName}
          />
          <Divider />

          <List
            sx={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {usersList.map((user) => {
              if (isChatExist(id, user.id, chatDatabase)) {
                if (user.id === id) return false
                return (
                  <ListItem key={user.id}>
                    <ListItemButton
                      onClick={() =>
                        handleCreateNewChat(user.id, user.username)
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
              } else return false
            })}
          </List>
        </Box>
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
            height: "12%",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
            alignItems: "center",
            gap: 1,
            boxShadow: 3,
          }}
        >
          <Avatar
            sx={{
              bgcolor: deepOrange[500],
              boxShadow: 2,
              width: "40px",
              height: "40px",
            }}
          >
            <AccountCircleIcon
              sx={{
                height: "35px",
                width: "35px",
              }}
            />
          </Avatar>
          <Typography
            variant="h5"
            alignContent="center"
            mr={3}
            color="white"
            display="flex"
          >
            {reducerCurrentChat.chat.isGroupChat
              ? chatDatabase[0].chatName
              : currentChatName}
            {reducerCurrentChat.chat.isGroupChat && isAdmin ? (
              <div>
                <IconButton
                  onClick={() => setOpen(true)}
                  aria-label="add an alarm"
                >
                  <EditTwoToneIcon fontSize="small" sx={{ color: "white" }} />
                </IconButton>
                <Dialog open={open} onClose={() => setOpen(false)}>
                  <DialogTitle>Subscribe</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      placeholder="Change group chat name"
                      type="text"
                      value={currentChatName}
                      onChange={(e) => setCurrentChatName(e.target.value)}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => {
                        dispatch(changeGroupNameActon(currentChatName))
                        setOpen(false)
                      }}
                    >
                      Change
                    </Button>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                  </DialogActions>
                </Dialog>
              </div>
            ) : (
              false
            )}
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
            label="Write a message"
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
