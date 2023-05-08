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
import * as React from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

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
  const loggedUser = useSelector((state) => state.loggedUserReducer.user)
  const userList = useSelector((state) => state.userDatabaseReducer)

  const navigate = useNavigate()
  if (loggedUser === {}) {
    navigate("/")
  }

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
            {userList.map(({ username, id }) => (
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
