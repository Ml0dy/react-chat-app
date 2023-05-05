import React from "react"
import { Avatar } from "@mui/material"
import { deepOrange } from "@mui/material/colors"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import UserInfo from "./UserInfo"
import { styled, createTheme, ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import MuiDrawer from "@mui/material/Drawer"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { useSelector } from "react-redux"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"

const AdminPanel = ({ userList, chatList }) => {
  let adminNumber = 0
  userList.forEach((user) => {
    if (user.isAdmin) adminNumber++
  })

  const { username, isAdmin } = useSelector(
    (state) => state.loggedUserReducer.user
  )

  return (
    <div>
      <Toolbar />
      <Box
        className="chats-container"
        sx={{
          flexGrow: 1,
          height: 680,
          width: 1200,
          overflow: "auto",
          mt: 8,
          display: "flex",
          flexDirection: "row",
          borderRadius: 4,
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
                    boxShadow: 2,
                  }}
                >
                  <AccountCircleIcon
                    sx={{
                      height: "80px",
                      width: "80px",
                    }}
                  />
                </Avatar>
                <Typography variant="h6" alignContent="center" mt="15px">
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
                  Users:
                </Typography>
                <Typography variant="h6" alignContent="center">
                  {userList.length}
                </Typography>{" "}
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Typography variant="h6" alignContent="center">
                  Rooms:
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
                  Admins:
                </Typography>
                <Typography variant="h6" alignContent="center">
                  {adminNumber}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                <Typography variant="h6" alignContent="center">
                  Users:
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
  )
}

export default AdminPanel
