import Novologo from "../Assets/Images/logo_pl.png"
import AdminPanel from "../Components/AdminPanel"
import ChatContainer from "../Components/ChatContainer"
import NavigationMenu from "../Components/NavigationMenu"
import UserInfo from "../Components/UserInfo"
import Users from "../Components/Users"
import UsersAdmin from "../Components/UsersAdmin"
import { adminMenu, usersMenu } from "../Config/GlobalVariables"
import { userDataBase, chatList } from "../Config/dataBase"
import { logoutUserAction } from "../Redux/Actions/loggedUserAction"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew"
import {
  Avatar,
  Dialog,
  DialogContent,
  IconButton,
  AppBar,
  Box,
  Divider,
  Drawer,
  Stack,
  Typography,
} from "@mui/material"
import { deepOrange } from "@mui/material/colors"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { useLocation } from "react-router-dom"

const drawerWidth = 240

const ApplicationModal = () => {
  const loggedUser = useSelector((state) => state.loggedUserReducer)

  const { id, username, isAdmin } = loggedUser

  const [open, setOpen] = useState(false)

  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getRerenderActivity = (currentUserId) => {
    if (currentUserId === -1) {
      navigate("/")
    }
  }

  let currentComponent = <></>
  if (location.pathname === "/adminpanel")
    currentComponent = (
      <AdminPanel userList={userDataBase} chatList={chatList} />
    )
  else if (location.pathname === "/userprofile") currentComponent = <UserInfo />
  else if (location.pathname === "/users") currentComponent = <Users />
  else if (location.pathname === "/chatlist")
    currentComponent = <ChatContainer />
  else if (location.pathname === "/userlist") currentComponent = <UsersAdmin />

  const handleLogout = () => {
    navigate("/")
    dispatch(logoutUserAction())
  }

  const userMenu = isAdmin ? adminMenu : usersMenu

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
            onClick={() => setOpen(true)}
            sx={{ bgcolor: deepOrange[500], boxShadow: 2, cursor: "pointer" }}
          >
            <AccountCircleIcon />
          </Avatar>
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
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
        <NavigationMenu userMenu={userMenu} />
        <Divider />
      </Drawer>
      <Box>{currentComponent}</Box>
    </Box>
  )
}

export default ApplicationModal
