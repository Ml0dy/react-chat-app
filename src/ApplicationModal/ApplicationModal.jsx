import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Novologo from "../Assets/Images/logo_pl.png";
import Stack from "@mui/material/Stack";
import { Avatar, IconButton } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import Users from "../Components/Users";
import { userDataBase } from "../Config/dataBase";
import { chatList } from "../Config/dataBase";
import { Route, Routes } from "react-router";
import UserInfo from "../Components/UserInfo";
import AdminPanel from "../Components/AdminPanel";
import ChatList from "../Components/ChatList";
import { Link, matchRoutes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAction } from "../Redux/Actions/loggedUserAction";
import { useNavigate } from "react-router";
import shadows from "@mui/material/styles/shadows";

const drawerWidth = 240;

const ApplicationModal = () => {
  const loggedUserStore = useSelector((state) => state.loggedUserReducer.user);

  const { id, username, isAdmin } = loggedUserStore;

  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log(loggedUserStore);
  // if (loggedUserStore === {}) {
  //   navigate("/");
  //   dispatch(logoutUserAction());
  // }

  let currentComponent = <></>;
  if (location.pathname === "/adminpanel") {
    currentComponent = (
      <AdminPanel userList={userDataBase} chatList={chatList} />
    );
  } else if (location.pathname === "/userprofile") {
    currentComponent = <UserInfo username="User" isAdmin={false} />;
  } else if (location.pathname === "/userlist") {
    currentComponent = <Users userList={userDataBase} />;
  } else if (location.pathname === "/chatlist") {
    currentComponent = <ChatList />;
  }

  const handleLogout = () => {
    navigate("/");
    dispatch(logoutUserAction());
  };

  const userMenu = isAdmin
    ? ["Admin panel", "Chat List", "User List"]
    : ["User Profile", "Chat List", "User List"];

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
          <Avatar sx={{ bgcolor: deepOrange[500], boxShadow: 2 }}>
            {username.charAt(0).toUpperCase()}
          </Avatar>

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
          {userMenu.map((text, index) => (
            <Link to={`/${text.replace(" ", "").toLowerCase()}`}>
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box>{currentComponent}</Box>
    </Box>
  );
};

export default ApplicationModal;
