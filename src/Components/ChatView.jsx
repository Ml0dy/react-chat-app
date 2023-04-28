import { Box, Typography } from "@mui/material"
import React from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const ChatView = ({ chatMessages }) => {
  const { chatList } = useSelector((state) => state.loggedUserReducer)
  const loggedUser = useSelector((state) => state.loggedUserReducer.user)
  const { id, username } = loggedUser

  return (
    <div>
      {chatMessages.messages.map(({ user_message, text }, index) => {
        if (user_message.id === id) {
          return (
            <Box
              key={index}
              sx={{
                backgroundColor: (theme) =>
                  theme.palette.mode === "light"
                    ? theme.palette.grey[300]
                    : theme.palette.grey[900],
                display: "flex",
                flexDirection: "column-reverse",
                justifyContent: "space-between",
                alignItems: "flex-end",
                width: "auto",
                maxWidth: "40%",
                marginLeft: "60%",
                marginRight: 2,
                paddingRight: 3,
                borderRadius: 5,
                marginTop: 2,
              }}
            >
              <Typography variant="body1" gutterBottom>
                {text}
              </Typography>
            </Box>
          )
        }
        return (
          <Box
            key={index}
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[50]
                  : theme.palette.grey[900],
              display: "flex",
              flexDirection: "column",
              width: "auto",
              maxWidth: "40%",
              marginRight: "60%",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginLeft: 2,
              paddingLeft: 3,
              borderRadius: 5,
              marginTop: 2,
            }}
          >
            <Typography variant="body1" gutterBottom>
              {text}
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
