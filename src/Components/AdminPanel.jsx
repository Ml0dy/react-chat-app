import React from "react";
import UserInfo from "./UserInfo";
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";

const AdminPanel = ({ userList, chatList }) => {
  let adminNumber = 0;
  userList.forEach((user) => {
    if (user.isAdmin) adminNumber++;
  });

  const { id, username, isAdmin } = useSelector(
    (state) => state.loggedUserReducer.user
  );

  return (
    <div>
      <Toolbar />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100%",
          overflow: "auto",
          mt: 8,
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                }}
              >
                <Avatar
                  sx={{
                    height: "100px",
                    width: "100px",
                    fontSize: "50px",
                    bgcolor: deepOrange[500],
                  }}
                >
                  {username.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="h6" alignContent="center">
                  {username}
                </Typography>

                <Typography variant="h6" alignContent="center">
                  Role: {isAdmin ? "Admin" : "User"}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                }}
              >
                <Typography variant="h6" alignContent="center">
                  Ilość użytkowników:
                </Typography>
                <Typography variant="h6" alignContent="center">
                  {userList.length}
                </Typography>{" "}
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Typography variant="h6" alignContent="center">
                  Ilość pokoi:
                </Typography>
                <Typography variant="h6" alignContent="center">
                  {chatList.length}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                {" "}
                <Typography variant="h6" alignContent="center">
                  Ilość adminów:
                </Typography>
                <Typography variant="h6" alignContent="center">
                  {adminNumber}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Typography variant="h6" alignContent="center">
                  Ilość użytkowników:
                </Typography>
                <Typography variant="h6" alignContent="center">
                  {userList.length}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};

export default AdminPanel;
