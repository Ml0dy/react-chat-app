import {
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/material";
import React from "react";
import SendIcon from "@mui/icons-material/Send";
import { useSelector } from "react-redux";
import { userDataBase } from "../Config/dataBase";
import { deepOrange } from "@mui/material/colors";
import ChatView from "./ChatView";

const ChatList = () => {
  const userLogged = useSelector((state) => state.loggedUserReducer.user);
  const { chatList, id } = userLogged;

  const usersList = useSelector((state) => state.userDatabaseReducer);

  const getSecondUser = (id, usersDatabase) => {
    const [secondUser] = usersList.filter((user) => {
      if (user.id === id) {
        return { user };
      }
    });
    return secondUser;
  };

  const userChatList = chatList.map((chat, index) => {
    if (chat.users[0].id === id) {
      return getSecondUser(chat.users[1].id, userDataBase);
    }
    return getSecondUser(chat.users[0].id, userDataBase);
  });

  console.log(userChatList);

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: 650,
        width: 1200,
        overflow: "auto",
        mt: 8,
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Box
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[400]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100%",
          width: "30%",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[900],
            height: "10%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" alignContent="center" mt={2}>
            Chat List
          </Typography>
        </Box>
        <List>
          {userChatList.map(({ username }, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Avatar sx={{ bgcolor: deepOrange[500] }}>
                    {username.charAt(0).toUpperCase()}
                  </Avatar>
                </ListItemIcon>
                <ListItemText primary={username} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
      <Box
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[50]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100%",
          width: "70%",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[900],
            height: "10%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <Typography variant="h4" alignContent="center" mt={2}>
            Username
          </Typography>
        </Box>

        <Box
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[500]
                : theme.palette.grey[900],
            height: "80%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h8" alignContent="center" mt={2}>
            <ChatView />
          </Typography>
        </Box>

        <Box
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[900],
            height: "10%",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TextField
            id="filled-basic"
            variant="filled"
            sx={{
              width: "80%",
              height: 10,
            }}
          />

          <Button
            variant="contained"
            endIcon={<SendIcon />}
            sx={{
              width: "15%",
              height: 40,
              m: 1,
            }}
          >
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatList;
