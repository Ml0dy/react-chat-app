import { Box, Typography } from "@mui/material"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const USER_URL = "http://localhost:8080/users"

const ChatView = ({ chatMessages, currentChat }) => {
  const loggedUser = useSelector((state) => state.loggedUserReducer)
  const [userList, setUserList] = useState(null)

  useEffect(() => {
    axios
      .get(USER_URL)
      .then(({ data }) => setUserList(data))
      .catch((error) => console.log(error))
  }, [])

  const getSenderName = (sender_id) => {
    const senderName = userList.filter((user) =>
      user.id === sender_id ? user : null
    )
    return senderName[0].username
  }

  useEffect(() => {}, [currentChat, chatMessages])

  if (chatMessages === null || chatMessages === undefined) return false
  return (
    <>
      {chatMessages.map(({ sender_id, message_text, message_date, id }) => {
        if (sender_id === loggedUser.id) {
          return (
            <Box
              key={id}
              sx={{
                display: "flex",
                alignItems: "flex-end",
                flexDirection: "column",
                justifyContent: "space-between",
                marginRight: 1,
                paddingRight: 1,
                borderRadius: 3,
                marginTop: 1,
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#ffd699",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  maxWidth: "40%",
                  marginLeft: "60%",
                  borderRadius: 6,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ inlineSize: "300px", overflowWrap: "break-word" }}
                  padding={2}
                  textAlign={"right"}
                >
                  {message_text}
                </Typography>
              </Box>
              <Typography variant="caption" fontStyle={"oblique"}>
                you, {message_date}
              </Typography>
            </Box>
          )
        }
        return (
          <Box
            key={id}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              justifyContent: "space-between",
              marginLeft: 1,
              paddingRight: 1,
              borderRadius: 3,
              marginTop: 1,
            }}
          >
            <Box
              sx={{
                backgroundColor: "#d4d4d4",
                display: "flex",
                flexDirection: "column",
                width: "auto",
                maxWidth: "40%",
                marginRight: "60%",
                justifyContent: "space-between",
                alignItems: "flex-start",
                borderRadius: 6,
                boxShadow: 2,
              }}
            >
              <Typography
                variant="body1"
                sx={{ inlineSize: "300px", overflowWrap: "break-word" }}
                padding={2}
                textAlign="left"
              >
                {message_text}
              </Typography>
            </Box>
            <Typography variant="caption" fontStyle={"oblique"}>
              {userList === null
                ? "Message from developers"
                : getSenderName(sender_id)}
              ,{` ${message_date}`}
            </Typography>
          </Box>
        )
      })}
    </>
  )
}

export default ChatView
