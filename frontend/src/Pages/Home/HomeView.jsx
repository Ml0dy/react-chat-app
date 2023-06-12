import Novologo from "../../Assets/Images/NovoAcademy_logo.png"
import { loggedUserAction } from "../../Redux/Actions/loggedUserAction"
import "./HomeView.css"
import { loginValidation } from "./loginValidation"
import { Alert } from "@mui/material"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import axios from "axios"
import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"

const URL = "http://localhost:8080/users"

const HomeView = () => {
  const [loginValue, setLoginValue] = useState("")
  const [passwordValue, setPasswordValue] = useState("")
  const [isValidationDone, setIsValidationDone] = useState(false)
  const [isFieldsFilled, setIsFieldsFilled] = useState(false)
  const [userListFromDatabase, setUserListFromDatabase] = useState([])

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const goToRegister = () => navigate("/registration")

  const getAllUsers = () => {
    axios
      .get(URL)
      .then(({ data }) => {
        setUserListFromDatabase(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleLoginValidation = () => {
    const validation = loginValidation(
      loginValue,
      passwordValue,
      userListFromDatabase
    )

    if (loginValue === "" || passwordValue === "") {
      setIsFieldsFilled(true)
      setTimeout(() => {
        setIsFieldsFilled(false)
      }, 3000)
      return
    }
    if (!validation) {
      setIsValidationDone(true)
      setTimeout(() => {
        setIsValidationDone(false)
      }, 3000)

      return
    }

    dispatch(loggedUserAction(validation))
    setLoginValue("")
    setPasswordValue("")
    console.log(validation)
    if (validation.isadmin) navigate("/adminpanel")
    else navigate("/userprofile")
  }

  useEffect(() => {
    getAllUsers()
  }, [])

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
        height={"auto"}
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

        {isValidationDone ? (
          <Alert sx={{ width: "250px" }} severity="error">
            Wrong password or username.
          </Alert>
        ) : (
          ""
        )}

        {isFieldsFilled ? (
          <Alert sx={{ width: "250px" }} severity="error">
            You need to fill all the fields.
          </Alert>
        ) : (
          ""
        )}
      </Stack>
    </Stack>
  )
}

export default HomeView
