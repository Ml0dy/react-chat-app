import { isChatExist } from "../Config/isChatExist"
import { updateUserChats } from "../Redux/Actions/loggedUserAction"
import ActiveChatList from "./ActiveChatList"
import ChatHeader from "./ChatHeader"
import ChatListContainer from "./ChatListContainer"
import ChatView from "./ChatView"
import ChatsNavigationList from "./ChatsNavigationList"
import MessageSender from "./MessageSender"
import { Typography, Box, Divider } from "@mui/material"
import axios from "axios"
import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const USER_URL = "http://localhost:8080/users"
const CHATS_URL = "http://localhost:8080/chats"
const MESSAGES_URL = "http://localhost:8080/chat"

const ChatContainer = () => {
  const loggedUser = useSelector((state) => state.loggedUserReducer)

  const [userListFromDatabase, setUserListFromDatabase] = useState([])
  const [allChatsFromDatabase, setAllChatsFromDatabase] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [currentChatMessages, setCurrentChatMessages] = useState(null)
  const [currentChatName, setCurrentChatName] = useState("")

  const { id, username } = loggedUser
  const dispatch = useDispatch()
  const container = useRef(null)

  const handleScroll = () => {
    const { scrollHeight } = container.current
    container.current?.scrollTo(0, scrollHeight)
  }
  const handleCreateSingleChat = async (userId, secondUsername) => {
    if (isChatExist(id, userId, allChatsFromDatabase)) {
      const response = await axios
        .post(`${CHATS_URL}/${id}`, {
          chat_name: `Chat between ${username} and ${secondUsername}`,
          is_group_chat: false,
          users: [userId],
        })
        .catch((error) => console.log(error))

      setCurrentChat(response.data)
      setAllChatsFromDatabase(getAllChats())
      getChatMessages(response.data.id)
      getCurrentUserChats(id)
      setCurrentChatName(secondUsername)
    }
  }

  const getCurrentUserChats = async (currentUserId) => {
    const response = await axios
      .get(`${USER_URL}/${currentUserId}`)
      .catch((error) => console.log(error))
    await dispatch(updateUserChats(response.data))
    return response.data
  }

  const getAllUsers = () => {
    axios
      .get(USER_URL)
      .then(({ data }) => {
        setUserListFromDatabase(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const getAllChats = async () => {
    const response = await axios
      .get(CHATS_URL)
      .catch((error) => console.log(error))

    setAllChatsFromDatabase(response.data)
    return response.data
  }

  const getSingleChat = async (chatId) => {
    const response = await axios
      .get(`${CHATS_URL}/${chatId}`)
      .catch((error) => console.log(error))

    setCurrentChat(response.data)
  }

  const getChatMessages = (chatId) => {
    axios
      .get(`${MESSAGES_URL}/${chatId}/messages`)
      .then(({ data }) => setCurrentChatMessages(data))
      .catch((error) => console.log(error))
  }

  useEffect(() => {
    getAllUsers()
    getAllChats()
    getSingleChat(0)
    getChatMessages(0)
  }, [])

  useEffect(() => {
    handleScroll()
  }, [currentChatMessages])

  useEffect(() => {
    getAllChats()
  }, [userListFromDatabase])

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
        <ChatListContainer
          currentChat={currentChat}
          setCurrentChat={setCurrentChat}
          setCurrentChatMessages={setCurrentChatMessages}
        />
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
            currentChat={currentChat}
            setCurrentChat={setCurrentChat}
            setCurrentChatName={setCurrentChatName}
            setCurrentChatMessages={setCurrentChatMessages}
          />
          <Divider />
          <ChatsNavigationList
            handleCreateSingleChat={handleCreateSingleChat}
            userListFromDatabase={userListFromDatabase}
          />
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
        <ChatHeader
          currentChat={currentChat}
          currentChatName={currentChatName}
          setCurrentChatName={setCurrentChatName}
        />
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
            <ChatView
              chatMessages={currentChatMessages}
              currenChat={currentChat}
            />
          </Typography>
        </Box>
        <MessageSender
          currentChat={currentChat}
          setCurrentChatMessages={setCurrentChatMessages}
        />
      </Box>
    </Box>
  )
}

export default ChatContainer
