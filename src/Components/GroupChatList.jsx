import { monthNames } from "../Config/GlobalVariables"
import { createGroupChatAction } from "../Redux/Actions/chatsDatabaseAction"
import { currentChatAction } from "../Redux/Actions/currentChatAction"
import { addNewChatToUserAction } from "../Redux/Actions/usersDatabaseAction"
import {
  Autocomplete,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const GroupChatList = ({
  userList,
  currentUserId,
  setOpenModal,
  setCurrentChat,
  currentChat,
}) => {
  const chatDatabase = useSelector((state) => state.chatsDatabaseReducer)
  const reducerCurrentChat = useSelector(
    (state) => state.currentChatReducer.chat
  )
  const [usersInNewGroup, setUsersInNewGroup] = useState()
  const [newChatName, setNewChatName] = useState("")
  const newChatId = chatDatabase.length
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
    console.log(chatDatabase)
    dispatch(
      createGroupChatAction(
        newChatId,
        newChatName,
        usersInNewGroup,
        currentTime()
      )
    )
    setCurrentChat(newChatId)
    dispatch(currentChatAction(chatDatabase[currentChat]))

    setOpenModal(false)
  }

  useEffect(() => {
    if (usersInNewGroup) {
      usersInNewGroup.forEach((singleUser) => {
        dispatch(
          addNewChatToUserAction(singleUser.id, chatDatabase[currentChat])
        )
      })
    }
  }, [chatDatabase])

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
