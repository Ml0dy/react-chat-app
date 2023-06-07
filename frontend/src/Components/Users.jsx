import "./ChatList.css"
import { Box } from "@mui/material"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { styled } from "@mui/material/styles"
import axios from "axios"
import * as React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const URL = "http://localhost:8080/users"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: " #212766",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}))

const Users = () => {
  const loggedUser = useSelector((state) => state.loggedUserReducer)
  const [userListFromDatabase, setUserListFromDatabase] = useState([])

  const navigate = useNavigate()
  if (loggedUser === {}) {
    navigate("/")
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

  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <Box
      className="chats-container"
      sx={{
        flexGrow: 1,
        p: 5,
        width: 800,
        overflow: "auto",
        mt: 8,
        display: "flex",
        flexDirection: "row",
        borderRadius: 4,
      }}
    >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">User Name </StyledTableCell>
              <StyledTableCell align="center">Id</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userListFromDatabase.map(({ username, id }) => (
              <StyledTableRow key={id}>
                <StyledTableCell component="th" scope="row" align="center">
                  {username}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" align="center">
                  {id}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Users
