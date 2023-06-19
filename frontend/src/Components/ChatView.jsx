import { Box, Typography } from "@mui/material"
import React from "react"
import { useSelector } from "react-redux"

const ChatView = ({ chatMessages }) => {
  const loggedUser = useSelector((state) => state.loggedUserReducer)

  let secondSender = ""
  console.log(chatMessages)
  if (chatMessages === null) return false
  return (
    <>
      {chatMessages.map(({ sender_id, message_text, message_date, id }) => {
        if (sender_id < 0) {
          return (
            <Box
              key={id}
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              mt={2}
              mb={2}
            >
              <Typography variant="caption" fontStyle={"oblique"}>
                {id === 0 ? `New group ${chatMessages.chat_name} created,` : ""}
                {id === -2
                  ? `Admin changed group name to: ${message_text},`
                  : ""}
              </Typography>
              <Typography variant="caption" fontStyle={"oblique"}>
                {message_date}
              </Typography>
            </Box>
          )
        } else if (sender_id === loggedUser.id) {
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
              {secondSender === "" ? "Message from developers" : secondSender},
              {` ${message_date}`}
            </Typography>
          </Box>
        )
      })}
    </>
  )
}

export default ChatView
