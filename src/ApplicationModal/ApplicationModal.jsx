import Novologo from "../Assets/Images/logo_pl.png"
import AdminPanel from "../Components/AdminPanel"
import ChatList from "../Components/ChatList"
import UserInfo from "../Components/UserInfo"
import Users from "../Components/Users"
import UsersAdmin from "../Components/UsersAdmin"
import { userDataBase } from "../Config/dataBase"
import { chatList } from "../Config/dataBase"
import {
  logoutUserAction,
  pageRenderingHandler,
} from "../Redux/Actions/loggedUserAction"
import { AccountCircle } from "@mui/icons-material"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"
import PlaylistAddCheckCircleIcon from "@mui/icons-material/PlaylistAddCheckCircle"
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew"
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle"
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Drawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { deepOrange, red } from "@mui/material/colors"
import React, { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { Link, useLocation } from "react-router-dom"

const drawerWidth = 240

const ApplicationModal = () => {
  const loggedUser = useSelector((state) => state.loggedUserReducer.user)

  const { id, username, isAdmin } = loggedUser

  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getRerenderActivity = (currentUserId) => {
    if (currentUserId === -1) {
      navigate("/")
    }
  }

  let currentComponent = <></>
  if (location.pathname === "/adminpanel") {
    currentComponent = (
      <AdminPanel userList={userDataBase} chatList={chatList} />
    )
  } else if (location.pathname === "/userprofile") {
    currentComponent = <UserInfo username="User" isAdmin={false} />
  } else if (location.pathname === "/users") {
    currentComponent = <Users />
  } else if (location.pathname === "/chatlist") {
    currentComponent = <ChatList />
  } else if (location.pathname === "/userlist") {
    currentComponent = <UsersAdmin />
  }

  const handleLogout = () => {
    navigate("/")
    dispatch(logoutUserAction())
  }

  const userMenu = isAdmin
    ? ["Admin panel", "Chat List", "User List"]
    : ["User Profile", "Chat List", "Users"]

  useEffect(() => {
    getRerenderActivity(id)
  }, [currentComponent])

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        color="default"
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Stack
          flex
          flexDirection={"row"}
          justifyContent={"flex-end"}
          paddingTop={2}
          paddingBottom={2}
          paddingRight={5}
          gap={3}
          alignItems={"center"}
        >
          <Avatar
            onClick={handleClickOpen}
            sx={{ bgcolor: deepOrange[500], boxShadow: 2, cursor: "pointer" }}
          >
            <AccountCircleIcon />
          </Avatar>
          <Dialog
            open={open}
            onClose={handleClose}
            sx={{
              paddingTop: 0,
            }}
          >
            <DialogContent
              sx={{
                bgcolor: "#4dacf5d3",
                alignItems: "center",
                justifyItems: "center",
                paddingBottom: 10,
                paddingLeft: 10,
                paddingRight: 10,
              }}
            >
              <UserInfo />
            </DialogContent>
          </Dialog>

          <Typography variant="h6">Nice to see you, {username}! </Typography>
          <IconButton
            color="primary"
            aria-label="logout"
            onClick={handleLogout}
          >
            <PowerSettingsNewIcon />
          </IconButton>
        </Stack>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <img src={Novologo} alt="novologo" width="100%" />
        <Divider />
        <List>
          {userMenu.map((text) => (
            <Link
              to={`/${text.replace(" ", "").toLowerCase()}`}
              style={{
                textDecoration: "none",
                color: "#000",
                fontWeight: "bold",
              }}
            >
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {text === "Admin panel" ? (
                      <AdminPanelSettingsIcon sx={{ color: deepOrange[500] }} />
                    ) : (
                      " "
                    )}
                    {text === "User Profile" ? (
                      <AccountCircle sx={{ color: deepOrange[500] }} />
                    ) : (
                      " "
                    )}
                    {text === "Chat List" ? (
                      <PlaylistAddCheckCircleIcon
                        sx={{ color: deepOrange[500] }}
                      />
                    ) : (
                      " "
                    )}
                    {text === "User List" ? (
                      <SupervisedUserCircleIcon
                        sx={{ color: deepOrange[500] }}
                      />
                    ) : (
                      " "
                    )}
                    {text === "Users" ? (
                      <SupervisedUserCircleIcon
                        sx={{ color: deepOrange[500] }}
                      />
                    ) : (
                      " "
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text.toUpperCase()} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box>{currentComponent}</Box>
    </Box>
  )
}

export default ApplicationModal
