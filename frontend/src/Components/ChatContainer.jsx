import { currentTime } from "../Config/GlobalVariables"
import { isChatExist } from "../Config/isChatExist"
import { createChatWithSingleUserAction } from "../Redux/Actions/chatsDatabaseAction"
import { currentChatAction } from "../Redux/Actions/currentChatAction"
import { addNewChatToUserAction } from "../Redux/Actions/usersDatabaseAction"
import ActiveChatList from "./ActiveChatList"
import ChatHeader from "./ChatHeader"
import ChatListContainer from "./ChatListContainer"
import ChatView from "./ChatView"
import ChatsNavigationList from "./ChatsNavigationList"
import MessageSender from "./MessageSender"
import { Typography, Box, Divider } from "@mui/material"
import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const ChatContainer = () => {
  const usersList = useSelector((state) => state.userDatabaseReducer)

  const loggedUser = useSelector((state) => state.loggedUserReducer)
  const chatDatabase = useSelector((state) => state.chatsDatabaseReducer)

  const [currentChat, setCurrentChat] = useState(0)
  const [currentChatName, setCurrentChatName] = useState("")
  const [secondUserId, setSecondUserId] = useState(-1)

  const { id, username, chatList } = loggedUser
  const dispatch = useDispatch()
  const container = useRef(null)

  const handleScroll = () => {
    const { scrollHeight } = container.current
    container.current?.scrollTo(0, scrollHeight)
  }
  const handleCreateSingleChat = (userId, secondUsername) => {
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
      setSecondUserId(userId)
      setCurrentChatName(secondUsername)
    }
  }

  useEffect(() => {
    dispatch(currentChatAction(chatDatabase[currentChat]))
  }, [currentChat])

  useEffect(() => {
    if (secondUserId !== -1) {
      dispatch(addNewChatToUserAction(id, chatDatabase[currentChat]))
      dispatch(addNewChatToUserAction(secondUserId, chatDatabase[currentChat]))
    }
  }, [secondUserId])

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
        <ChatListContainer
          handleCreateSingleChat={handleCreateSingleChat}
          setCurrentChatName={setCurrentChatName}
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
            chatList={chatList}
            setCurrentChat={setCurrentChat}
            setCurrentChatName={setCurrentChatName}
          />
          <Divider />
          <ChatsNavigationList
            handleCreateSingleChat={handleCreateSingleChat}
            usersList={usersList}
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
              chatMessages={chatDatabase[currentChat]}
              setCurrentChat={setCurrentChat}
            />
          </Typography>
        </Box>
        <MessageSender />
      </Box>
    </Box>
  )
}

export default ChatContainer
