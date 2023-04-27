import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import { ListItem } from "@mui/material";
import Box from "@mui/material/Box";
import Novologo from "../../Assets/Images/NovoAcademy_logo.png";
import TextField from "@mui/material/TextField";
import "./HomeView.css";
import Button from "@mui/material/Button";
import { loginValidation } from "./loginValidation";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { loggedUserAction } from "../../Redux/Actions/loggedUserAction";

const HomeView = () => {
  const [loginValue, setLoginValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const userInfo = useSelector((state) => state.loggedUserReducer.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginValidation = () => {
    const validation = loginValidation(loginValue, passwordValue);
    if (!validation) {
      setLoginValue("");
      setPasswordValue("");
      return alert("validation error");
    }
    dispatch(loggedUserAction(validation));
    setLoginValue("");
    setPasswordValue("");
    console.log(validation);
    if (validation.isAdmin) navigate("/adminpanel");
    else navigate("/userprofile");
  };

  return (
    <Stack
      flex
      flexDirection={"column"}
      width="300px"
      alignItems={"center"}
      gap={7}
    >
      <img src={Novologo} alt="novologo" width="200px" />
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
        <Button variant="contained" onClick={handleLoginValidation}>
          LOG IN
        </Button>
      </Stack>
    </Stack>
  );
};

export default HomeView;
