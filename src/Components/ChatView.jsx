import { Box, Typography } from "@mui/material"
import React from "react"
import { useSelector } from "react-redux"

const ChatView = ({ chatMessages }) => {
  const loggedUser = useSelector((state) => state.loggedUserReducer.user)
  const { id } = loggedUser
  let secondSender = ""
  if (chatMessages.users[0].id === id)
    secondSender = chatMessages.users[1].username
  else secondSender = chatMessages.users[0].username

  return (
    <div>
      {chatMessages.messages.map(({ user_message, text }, index) => {
        if (user_message.id === id) {
          return (
            <Box
              key={index}
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
                  width: "auto",
                  maxWidth: "40%",
                  marginLeft: "60%",
                  borderRadius: 3,
                }}
              >
                <Typography variant="body1" padding={2} textAlign={"right"}>
                  {text}
                </Typography>
              </Box>
              <Typography variant="caption" fontStyle={"oblique"}>
                you
              </Typography>
            </Box>
          )
        }
        return (
          <Box
            key={index}
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
              key={index}
              sx={{
                backgroundColor: "#d4d4d4",
                display: "flex",
                flexDirection: "column",
                width: "auto",
                maxWidth: "40%",
                marginRight: "60%",
                justifyContent: "space-between",
                alignItems: "flex-start",
                borderRadius: 3,
              }}
            >
              <Typography variant="body1" padding={2} textAlign={"left"}>
                {text}
              </Typography>
            </Box>

            <Typography variant="caption" fontStyle={"oblique"}>
              {secondSender}
            </Typography>
          </Box>
        )
      })}
    </div>

    // <div>
    //   <Box
    //     sx={{
    //       backgroundColor: (theme) =>
    //         theme.palette.mode === "light"
    //           ? theme.palette.grey[50]
    //           : theme.palette.grey[900],
    //       display: "flex",
    //       flexDirection: "column",
    //       width: "auto",
    //       maxWidth: "40%",
    //       marginRight: "60%",
    //       justifyContent: "space-between",
    //       alignItems: "flex-start",
    //       marginLeft: 2,
    //       paddingLeft: 3,
    //       borderRadius: 5,
    //     }}
    //   >
    //     <Typography variant="body1" gutterBottom>
    //       siemkafghfghfg fhfghfgh
    //     </Typography>
    //   </Box>
    //   <Box
    //     sx={{
    //       backgroundColor: (theme) =>
    //         theme.palette.mode === "light"
    //           ? theme.palette.grey[300]
    //           : theme.palette.grey[900],
    //       display: "flex",
    //       flexDirection: "column-reverse",
    //       justifyContent: "space-between",
    //       alignItems: "flex-end",
    //       width: "auto",
    //       maxWidth: "40%",
    //       marginLeft: "60%",
    //       marginRight: 2,
    //       paddingRight: 3,
    //       borderRadius: 5,
    //     }}
    //   >
    //     <Typography variant="body1" gutterBottom>
    //       hej
    //     </Typography>
    //   </Box>
    // </div>
  )
}

export default ChatView
