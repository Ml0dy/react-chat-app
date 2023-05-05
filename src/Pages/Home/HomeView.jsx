import React, { useState } from "react"
import Stack from "@mui/material/Stack"

import Novologo from "../../Assets/Images/NovoAcademy_logo.png"
import TextField from "@mui/material/TextField"
import "./HomeView.css"
import Button from "@mui/material/Button"
import { loginValidation } from "./loginValidation"
import { useNavigate } from "react-router"
import { useDispatch } from "react-redux"
import { loggedUserAction } from "../../Redux/Actions/loggedUserAction"

const HomeView = () => {
  const [loginValue, setLoginValue] = useState("User1")
  const [passwordValue, setPasswordValue] = useState("user")

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const goToRegister = () => navigate("/registration")

  const handleLoginValidation = () => {
    const validation = loginValidation(loginValue, passwordValue)

    if (loginValue === "" || passwordValue === "") {
      return alert("You must fill all fields (login and password) ")
    }
    if (!validation) {
      setLoginValue("")
      setPasswordValue("")
      return alert("validation error")
    }
    dispatch(loggedUserAction(validation))
    setLoginValue("")
    setPasswordValue("")
    console.log(validation)
    if (validation.isAdmin) navigate("/adminpanel")
    else navigate("/userprofile")
  }

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
        borderRadius={3}
      >
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          backgroundColor="white"
          margin="normal"
          value={loginValue}
          onChange={(e) => setLoginValue(e.target.value)}
          onKeyUp={(e) => (e.key === "Enter" ? handleLoginValidation() : "")}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          value={passwordValue}
          onChange={(e) => setPasswordValue(e.target.value)}
          onKeyUp={(e) => (e.key === "Enter" ? handleLoginValidation() : "")}
        />
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="contained"
            onClick={handleLoginValidation}
            margin={2}
          >
            LOG IN
          </Button>
          <Button variant="contained" onClick={goToRegister}>
            REGISTER
          </Button>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default HomeView
