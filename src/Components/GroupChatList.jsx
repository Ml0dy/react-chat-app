import { monthNames } from "../Config/GlobalVariables"
import { createGroupChatAction } from "../Redux/Actions/chatsDatabaseAction"
import {
  Autocomplete,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const GroupChatList = ({ userList, currentUserId, setOpenModal }) => {
  const chatDatabase = useSelector((state) => state.chatsDatabaseReducer)
  const [usersInNewGroup, setUsersInNewGroup] = useState([])
  const [newChatName, setNewChatName] = useState("")

  const dispatch = useDispatch()

  const today = new Date()

  const currentTime = () => {
    const hours = () => {
      if (today.getHours() > 9) return today.getHours()
      return "0" + today.getHours()
    }

    const minutes = () => {
      if (today.getMinutes() > 9) return today.getMinutes()
      return "0" + today.getMinutes()
    }

    const month = today.getMonth()

    const day = () => {
      if (today.getDate() <= 9) return "0" + today.getDate()
      return today.getDate()
    }
    return hours() + ":" + minutes() + ", " + day() + " of " + monthNames[month]
  }

  const handleCreateGroupChat = () => {
    if (newChatName === "") return false

    const newChatId = chatDatabase.length
    console.log(usersInNewGroup)
    dispatch(
      createGroupChatAction(
        newChatId,
        newChatName,
        usersInNewGroup,
        currentTime()
      )
    )
    setOpenModal(false)
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
            options={userList}
            getOptionLabel={(user) => user.username}
            defaultValue={[userList[currentUserId]]}
            onChange={(e, data) =>
              setUsersInNewGroup([...usersInNewGroup, e.target.value])
            }
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
