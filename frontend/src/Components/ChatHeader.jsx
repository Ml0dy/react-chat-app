import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone"
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material"
import { deepOrange } from "@mui/material/colors"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const CHATS_URL = "http://localhost:8080/chats"

const ChatHeader = ({ currentChatName, setCurrentChatName, currentChat }) => {
  const { isadmin } = useSelector((state) => state.loggedUserReducer)
  const [open, setOpen] = useState(false)

  const updateChatName = (chatId) => {
    axios
      .put(`${CHATS_URL}/${chatId}`, { chat_name: currentChatName })
      .catch((error) => console.log(error))

    setOpen(false)
  }

  useEffect(() => {}, [currentChatName])

  if (currentChat === null) return false
  else
    return (
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
          {currentChat.chat_name}
          {currentChat._group_chat && isadmin ? (
            <div>
              <IconButton
                onClick={() => setOpen(true)}
                aria-label="add an alarm"
              >
                <EditTwoToneIcon fontSize="small" sx={{ color: "white" }} />
              </IconButton>
              <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Change group name</DialogTitle>
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
                  <Button onClick={() => updateChatName(currentChat.id)}>
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
    )
}

export default ChatHeader
