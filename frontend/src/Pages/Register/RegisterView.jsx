import Novologo from "../../Assets/Images/NovoAcademy_logo.png"
import { addUserToGroupChatAction } from "../../Redux/Actions/chatsDatabaseAction"
import "./RegisterView.css"
import { registerValidation } from "./registerValidation"
import { Alert } from "@mui/material"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import axios from "axios"
import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

const URL = "http://localhost:8080/users"

const RegisterView = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isRegisterDone, setisRegisterDone] = useState(false)
  const [isUsernameTaken, setIsUsernameTaken] = useState(false)
  const [isEverythingFilled, setIsEverythingFilled] = useState(false)
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false)
  const [userListFromDatabase, setUserListFromDatabase] = useState([])

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const nextID = userListFromDatabase.length

  const cleanStateValues = () => {
    setUsername("")
    setPassword("")
    setConfirmPassword("")
  }

  const handleSubmit = () => {
    const registration = registerValidation(username, userListFromDatabase)
    if (username === "" || password === "" || confirmPassword === "") {
      setIsEverythingFilled(true)
      setTimeout(() => {
        setIsEverythingFilled(false)
      }, 3000)
      return
    }

    if (registration) {
      cleanStateValues()
      setIsUsernameTaken(true)
      setTimeout(() => {
        setIsUsernameTaken(false)
      }, 3000)
      return
    }

    if (password !== confirmPassword) {
      setIsPasswordConfirmed(true)
      setTimeout(() => {
        setIsPasswordConfirmed(false)
      }, 3000)
      return
    }

    setisRegisterDone(true)
    addNewUserToDatabase()
    dispatch(addUserToGroupChatAction(nextID, username))
    cleanStateValues()
    setTimeout(() => {
      navigate("/")
    }, 3000)
  }

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

  const addNewUserToDatabase = () => {
    axios
      .post(URL, {
        username: username,
        password: password,
      })
      .then(() => {})
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  useEffect(() => {
    getAllUsers()
  }, [userListFromDatabase])

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
          onChange={(e) => setUsername(e.target.value)}
          onKeyUp={(e) => (e.key === "Enter" ? handleSubmit() : "")}
        />
        <TextField
          id="outlined-basic"
          label="Password*"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyUp={(e) => (e.key === "Enter" ? handleSubmit() : "")}
        />
        <TextField
          id="outlined-basic"
          label="Confirm password*"
          variant="outlined"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onKeyUp={(e) => (e.key === "Enter" ? handleSubmit() : "")}
        />
        <Button variant="contained" onClick={handleSubmit}>
          REGISTER
        </Button>

        {isRegisterDone ? (
          <Alert sx={{ width: "250px" }} severity="success">
            It worked! You will be redirected to the login page
          </Alert>
        ) : (
          ""
        )}

        {isUsernameTaken ? (
          <Alert sx={{ width: "250px" }} severity="error">
            Username already taken. Choose different one.
          </Alert>
        ) : (
          ""
        )}

        {isEverythingFilled ? (
          <Alert sx={{ width: "250px" }} severity="error">
            You need to fill all fields.
          </Alert>
        ) : (
          ""
        )}

        {isPasswordConfirmed ? (
          <Alert sx={{ width: "250px" }} severity="error">
            Password and confirmed password are not the same.
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
