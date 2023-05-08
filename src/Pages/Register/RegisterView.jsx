import Novologo from "../../Assets/Images/NovoAcademy_logo.png"
import { addUserToGroupChatAction } from "../../Redux/Actions/chatsDatabaseAction"
import { registerUserAction } from "../../Redux/Actions/usersDatabaseAction"
import "./RegisterView.css"
import { registerValidation } from "./registerValidation"
import { Alert } from "@mui/material"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import React from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

const RegisterView = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isRegisterDone, setisRegisterDone] = useState(false)

  const userDataBase = useSelector((state) => state.userDatabaseReducer)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleUsername = (e) => {
    setUsername(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value)
  }

  const handleSubmit = () => {
    const registration = registerValidation(username)

    if (username === "" || password === "" || confirmPassword === "") {
      return alert("Registration error")
    }

    if (registration) {
      setUsername("")
      setPassword("")
      setConfirmPassword("")
      return alert("Username already taken")
    }

    if (password !== confirmPassword) {
      return alert("Password and confirm password are not the same")
    }

    const nextID = userDataBase.length
    setisRegisterDone(true)
    dispatch(registerUserAction(username, password, nextID))
    dispatch(addUserToGroupChatAction(nextID, username))
    setUsername("")
    setPassword("")
    setConfirmPassword("")
    setTimeout(() => {
      navigate("/")
    }, 4000)
  }

  return (
    <Stack flex width="300px" alignItems={"center"} gap={7}>
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
          label="Username*"
          variant="outlined"
          margin="normal"
          value={username}
          onChange={handleUsername}
          onKeyUp={(e) => (e.key === "Enter" ? handleSubmit() : "")}
        />
        <TextField
          id="outlined-basic"
          label="Password*"
          variant="outlined"
          type="password"
          value={password}
          onChange={handlePassword}
          onKeyUp={(e) => (e.key === "Enter" ? handleSubmit() : "")}
        />
        <TextField
          id="outlined-basic"
          label="Confirm password*"
          variant="outlined"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPassword}
          onKeyUp={(e) => (e.key === "Enter" ? handleSubmit() : "")}
        />
        <Button variant="contained" onClick={handleSubmit}>
          REGISTER
        </Button>
        {isRegisterDone ? (
          <Alert severity="info">
            It worked! You will be redirected to the login page
          </Alert>
        ) : (
          ""
        )}
        <p>
          Already signed up? <Link to={"/"}>LOG IN</Link>
        </p>
      </Stack>
    </Stack>
  )
}

export default RegisterView
