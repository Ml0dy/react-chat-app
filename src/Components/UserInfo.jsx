import React from "react";
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const UserInfo = ({ username, isAdmin }) => {
  return (
    <Box sx={{ display: "flex" }} flexDirection={"column"} gap={2}>
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
    </Box>
  );
};

export default UserInfo;
