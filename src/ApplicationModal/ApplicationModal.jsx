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

const drawerWidth = 240;

const ApplicationModal = ({ username }) => {
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
        <img src={Novologo} width="100%" />
        <Divider />
        <List>
          {["Admin panel", "Chats", "Users List"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon></ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box
        component="main"
        alignItems="center"
        justifyContent="center"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          width: "70vw",
          height: "60vh",
          ml: `50px`,
          mr: `50px`,
          mt: `50px`,
          mb: `50px`,
          display: "flex",
        }}
      >
        {/* <Routes>
          <Route path="/" element={<Users userList={userDataBase} />} />
        </Routes> */}
        {/* <UserInfo username="User" isAdmin={false} /> */}
        {/* <AdminPanel userList={userDataBase} chatList={chatList} /> */}
        <ChatList />
      </Box>
    </Box>
  );
};

export default ApplicationModal;
