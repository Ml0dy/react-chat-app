import { Box, Typography } from "@mui/material"
import React from "react"
import { useSelector } from "react-redux"

const ChatView = ({ chatMessages }) => {
  const loggedUser = useSelector((state) => state.loggedUserReducer)

  const { id } = loggedUser
  let secondSender = ""
  return (
    <div>
      {chatMessages.messages.map(
        ({ user_message, text, message_date, id_message }, index) => {
          chatMessages.users.forEach((user) => {
            if (user.id === user_message.id) secondSender = user.username
          })
          if (user_message.id < 0) {
            return (
              <Box
                key={id_message}
                width="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                mt={2}
                mb={2}
              >
                <Typography variant="caption" fontStyle={"oblique"}>
                  {id_message === 0
                    ? `New group ${chatMessages.chatName} created,`
                    : ""}
                  {user_message.id === -2
                    ? `Admin changed group name to: ${text},`
                    : ""}
                </Typography>
                <Typography variant="caption" fontStyle={"oblique"}>
                  {message_date}
                </Typography>
              </Box>
            )
          } else if (user_message.id === id) {
            return (
              <Box
                key={id_message}
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
                    {text}
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
              key={id_message}
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
                  {text}
                </Typography>
              </Box>

              <Typography variant="caption" fontStyle={"oblique"}>
                {secondSender === "" ? "Message from developers" : secondSender}
                ,{` ${message_date}`}
              </Typography>
            </Box>
          )
        }
      )}
    </div>
  )
}

export default ChatView
