import React from "react";
import UserInfo from "./UserInfo";
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const AdminPanel = ({ userList, chatList }) => {
  let adminNumber = 0;
  userList.forEach((user) => {
    if (user.isAdmin) adminNumber++;
  });

  return (
    <div>
      <UserInfo username="Admin" isAdmin={true} />
      <Box sx={{ display: "flex" }} flexDirection={"row"} gap={2}>
        <Box>
          <Typography variant="h6" alignContent="center">
            Ilość użytkowników:
          </Typography>
          <Typography variant="h6" alignContent="center">
            {userList.length}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6" alignContent="center">
            Ilość pokoi:
          </Typography>
          <Typography variant="h6" alignContent="center">
            {chatList.length}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6" alignContent="center">
            Ilość adminów:
          </Typography>
          <Typography variant="h6" alignContent="center">
            {adminNumber}
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default AdminPanel;
