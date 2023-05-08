import Novologo from "../../Assets/Images/NovoAcademy_logo.png"
import { loggedUserAction } from "../../Redux/Actions/loggedUserAction"
import "./HomeView.css"
import { loginValidation } from "./loginValidation"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"

const HomeView = () => {
  const [loginValue, setLoginValue] = useState("Admin1")
  const [passwordValue, setPasswordValue] = useState("admin")

  const userDatabase = useSelector((state) => state.userDatabaseReducer)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const goToRegister = () => navigate("/registration")

  const handleLoginValidation = () => {
    const validation = loginValidation(loginValue, passwordValue, userDatabase)

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
          label="Username"
          variant="outlined"
          backgroundcolor="white"
          margin="normal"
          value={loginValue}
          onChange={(e) => setLoginValue(e.target.value)}
          onKeyUp={(e) => (e.key === "Enter" ? handleLoginValidation() : "")}
        />
        <TextField
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
            sx={{
              marginRight: 2,
            }}
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
