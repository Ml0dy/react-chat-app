import SendIcon from "@mui/icons-material/Send"
import { Box, Button, TextField } from "@mui/material"
import axios from "axios"
import React, { useState } from "react"
import { useSelector } from "react-redux"

const MESSAGES_URL = "http://localhost:8080/chat"

const MessageSender = ({ currentChat }) => {
  const { id } = useSelector((state) => state.loggedUserReducer)
  const [messageValue, setMessageValue] = useState("")

  const handleSendMessage = () => {
    if (messageValue === "") return false
    axios
      .post(`${MESSAGES_URL}/message`, {
        message_text: messageValue,
        sender_id: id,
        chat_id: currentChat.id,
      })
      .catch((error) => console.log(error))
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
