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
import { Avatar } from "@mui/material";
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

const drawerWidth = 240;

const ApplicationModal = ({ username }) => {
  const location = useLocation();
  console.log(location.pathname);

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
          <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>

          <Typography variant="h6">{username}</Typography>
          <PowerSettingsNewIcon />
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
          {["Admin panel", "Chat List", "User List", "User Profile"].map(
            (text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon></ListItemIcon>
                  <Link to={`/${text.replace(" ", "").toLowerCase()}`}>
                    <ListItemText primary={text} />
                  </Link>
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
        <Divider />
      </Drawer>
      <Box>{currentComponent}</Box>
    </Box>
  );
};

export default ApplicationModal;
