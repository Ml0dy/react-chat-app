import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import { ListItem } from "@mui/material";
import Box from "@mui/material/Box";
import Novologo from "../../Assets/Images/NovoAcademy_logo.png";
import TextField from "@mui/material/TextField";
import "./HomeView.css";
import Button from "@mui/material/Button";

const HomeView = () => {
  const [loginValue, setLoginValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  return (
    <Stack
      flex
      flexDirection={"column"}
      width="300px"
      alignItems={"center"}
      gap={7}
    >
      <img src={Novologo} width="200px" />
      <Stack
        className="home-input-container"
        spacing={2}
        flex
        flexDirection={"column"}
        width="300px"
        alignItems={"center"}
        justifyContent={"center"}
        paddingTop={2}
        paddingBottom={2}
      >
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          backgroundColor="white"
          margin="normal"
          value={loginValue}
          onChange={(e) => setLoginValue(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={() =>
            alert("User name: " + loginValue + "Password: " + passwordValue)
          }
        >
          LOG IN
        </Button>
      </Stack>
    </Stack>
  );
};

export default HomeView;
