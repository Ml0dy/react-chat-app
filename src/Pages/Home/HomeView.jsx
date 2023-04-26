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
  const [currentUserInfo, setCurrentUserInfo] = useState();
  const [inProcess, setInProcess] = useState(false);

  const currentUser = useSelector((state) => state.currentUser);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLoginValidation = () => {
    const validation = loginValidation(loginValue, passwordValue);
    if (!validation) {
      setLoginValue("");
      setPasswordValue("");
      return alert("validation error");
    }
    setCurrentUserInfo(validation);
    console.log(currentUserInfo);
    // dispatch(() => loggedUserAction(currentUserInfo));
    setLoginValue("");
    setPasswordValue("");
    setInProcess(true);
    // navigate("/userlist");
  };

  useEffect(() => {
    console.log("use effect:", currentUserInfo);
    if (inProcess) {
      dispatch(() => loggedUserAction(currentUserInfo.id));
    }
  }, [currentUserInfo]);

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
