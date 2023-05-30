import GroupChatList from "./GroupChatList"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import { Box, Dialog, IconButton, Typography } from "@mui/material"
import React, { useState } from "react"
import { useSelector } from "react-redux"

const ChatListContainer = () => {
  const usersList = useSelector((state) => state.userDatabaseReducer)
  const { id } = useSelector((state) => state.loggedUserReducer)

  const [openModal, setOpenModal] = useState(false)
  const [currentChat, setCurrentChat] = useState(0)

  return (
    <Box
      sx={{
        backgroundColor: "#212766",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        scrollbarWidth: "none",
        boxShadow: 2,
      }}
    >
      <Typography
        variant="h5"
        alignContent="center"
        mt={2}
        mb={3}
        color="white"
      >
        Chat List
      </Typography>
      <IconButton aria-label="delete" onClick={() => setOpenModal(true)}>
        <AddCircleOutlineIcon sx={{ color: "white" }} />
      </IconButton>
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <GroupChatList
          userList={usersList}
          currentUserId={id}
          setOpenModal={setOpenModal}
          setCurrentChat={setCurrentChat}
          currentChat={currentChat}
        />
      </Dialog>
    </Box>
  )
}

export default ChatListContainer
