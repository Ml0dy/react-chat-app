import React, { useEffect } from "react"
import "./RegisterView.css"
import Stack from "@mui/material/Stack"
import Novologo from "../../Assets/Images/NovoAcademy_logo.png"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useState } from "react"
import { registerValidation } from "./registerValidation"
import { useDispatch, useSelector } from "react-redux"
import { registerUserAction } from "../../Redux/Actions/registerUserAction"
import { userDataBase } from "../../Config/dataBase"
import { loginValidation } from "../Home/loginValidation"
import { loggedUserAction } from "../../Redux/Actions/loggedUserAction"

const RegisterView = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const userDataBase = useSelector((state) => state.userDatabaseReducer)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleUsername = (e) => {
    setUsername(e.target.value)
    setSubmitted(false)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
    setSubmitted(false)
  }

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value)
    setSubmitted(false)
  }

  const handleSubmit = (e) => {
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

    {
      dispatch(registerUserAction(username, password, parseInt(nextID)))
      setSubmitted(true)
      alert("Registration done!")
      setUsername("")
      setPassword("")
      setConfirmPassword("")
      navigate("/")
    }
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
        />
        <TextField
          id="outlined-basic"
          label="Password*"
          variant="outlined"
          type="password"
          value={password}
          onChange={handlePassword}
        />
        <TextField
          id="outlined-basic"
          label="Confirm password*"
          variant="outlined"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPassword}
        />
        <Button variant="contained" marginBottom={2} onClick={handleSubmit}>
          REGISTER
        </Button>
        <p>
          Already signed up? <Link to={"/"}>LOG IN</Link>
        </p>
      </Stack>
    </Stack>
  )
}

export default RegisterView
