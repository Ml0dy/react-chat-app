import React from "react"
import "./RegisterView.css"
import Stack from "@mui/material/Stack"
import Novologo from "../../Assets/Images/NovoAcademy_logo.png"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"

const RegisterView = () => {
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
          label="Username*"
          variant="outlined"
          margin="normal"
        />
        <TextField
          id="outlined-basic"
          label="Password*"
          variant="outlined"
          type="password"
        />
        <TextField
          id="outlined-basic"
          label="Confirm password*"
          variant="outlined"
          type="password"
        />

        <Button variant="contained">REGISTER</Button>
      </Stack>
    </Stack>
  )
}

export default RegisterView
