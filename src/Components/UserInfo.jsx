import React from "react";
import { Avatar, Container, Grid, Paper, Toolbar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";

const UserInfo = ({ username, isAdmin }) => {
  const userInfo = useSelector((state) => state.id);
  console.log(userInfo);

  return (
    <>
      <Toolbar />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "80%",
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
                  }}
                >
                  N
                </Avatar>
                <Typography variant="h6" alignContent="center">
                  {username}
                </Typography>

                <Typography variant="h6" alignContent="center">
                  Role: {isAdmin ? "Admin" : "User"}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default UserInfo;
