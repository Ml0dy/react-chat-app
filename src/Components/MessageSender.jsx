import { currentTime } from "../Config/GlobalVariables"
import { sendMessageAction } from "../Redux/Actions/chatsDatabaseAction"
import SendIcon from "@mui/icons-material/Send"
import { Box, Button, TextField } from "@mui/material"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const MessageSender = () => {
  const reducerCurrentChat = useSelector((state) => state.currentChatReducer)
  const { id } = useSelector((state) => state.loggedUserReducer)
  const [messageValue, setMessageValue] = useState("")

  const dispatch = useDispatch()

  const handleSendMessage = () => {
    if (messageValue === "") return false

    const newMessageId = reducerCurrentChat.messages.slice(-1)
    const currentMessageId = (newMessageId.id_message += 1)

    dispatch(
      sendMessageAction(
        reducerCurrentChat.id,
        currentMessageId,
        id,
        messageValue,
        currentTime()
      )
    )
    setMessageValue("")
  }

  return (
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
  )
}

export default MessageSender
