import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import { Avatar, Container, Grid, Paper, Toolbar } from "@mui/material"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { deepOrange } from "@mui/material/colors"
import React from "react"
import { useSelector } from "react-redux"

const UserInfo = () => {
  const loggedUser = useSelector((state) => state.loggedUserReducer)

  const { username, isadmin } = loggedUser

  return (
    <>
      <Toolbar />
      <Box
        className="chats-container"
        component="main"
        sx={{
          flexGrow: 1,
          height: "90%",
          overflow: "auto",
          borderRadius: 3,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8} lg={9}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 240,
                  width: 200,
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
                  Role: {isadmin ? "Admin" : "User"}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default UserInfo
