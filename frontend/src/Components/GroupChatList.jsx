import { updateUserChats } from "../Redux/Actions/loggedUserAction"
import {
  Autocomplete,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material"
import axios from "axios"
import React, { useState } from "react"
import { useDispatch } from "react-redux"

const USER_URL = "http://localhost:8080/users"
const CHATS_URL = "http://localhost:8080/chats"
const MESSAGES_URL = "http://localhost:8080/chat"

const GroupChatList = ({
  userListFromDatabase,
  currentUserId,
  setOpenModal,
  setCurrentChat,
  setCurrentChatMessages,
}) => {
  const [usersInNewGroup, setUsersInNewGroup] = useState()
  const [newChatName, setNewChatName] = useState("")
  const [newChatId, setNewChatId] = useState(null)

  const dispatch = useDispatch()

  const handleCreateGroupChat = async (e) => {
    e.preventDefault()
    if (newChatName === "") return false

    createNewChat(currentUserId)
    setOpenModal(false)
    const response = axios
      .get(`${MESSAGES_URL}/${newChatId}`)
      .catch((error) => console.log(error))
    setCurrentChatMessages(response.data)
  }

  const createNewChat = async (creatorId) => {
    const response = await axios
      .post(`${CHATS_URL}/${creatorId}`, {
        chat_name: newChatName,
        _group_chat: true,
        users: usersInNewGroup.map((user) => user.id),
      })
      .catch((error) => console.log(error))

    await setCurrentChat(response.data)
    await setNewChatId(response.data.id)
    getCurrentUserChats(currentUserId)
  }

  const getCurrentUserChats = async (currentUserId) => {
    const response = await axios
      .get(`${USER_URL}/${currentUserId}`)
      .catch((error) => console.log(error))
    await dispatch(updateUserChats(response.data))
    return response.data
  }

  return (
    <div>
      <Stack spacing={3} sx={{ width: 500 }}>
        <DialogTitle>Create new group chat</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            placeholder="Set new group chat name"
            type="text"
            value={newChatName}
            onChange={(e) => setNewChatName(e.target.value)}
          />
          <Autocomplete
            multiple
            id="tags-standard"
            options={userListFromDatabase.filter(
              (user) => user.id !== currentUserId
            )}
            getOptionLabel={(user) => user.username}
            onChange={(e, data) => {
              setUsersInNewGroup(data)
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Multiple values"
                placeholder="Favorites"
                value={usersInNewGroup}
                onChange={onchange}
              />
            )}
          />
        </DialogContent>
      </Stack>
      <DialogActions>
        <Button onClick={handleCreateGroupChat}>Create</Button>
        <Button onClick={() => setOpenModal(false)}>Cancel</Button>
      </DialogActions>
    </div>
  )
}

export default GroupChatList
