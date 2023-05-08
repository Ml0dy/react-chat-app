import { deleteUserAction } from "../Redux/Actions/usersDatabaseAction"
import "./ChatList.css"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import { Box, Button, Dialog, DialogContent, DialogTitle } from "@mui/material"
import DialogActions from "@mui/material/DialogActions"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { deepOrange } from "@mui/material/colors"
import { styled } from "@mui/material/styles"
import * as React from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
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

const UsersAdmin = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector((state) => state.loggedUserReducer.user)
  const userList = useSelector((state) => state.userDatabaseReducer)

  const [userToDeleteId, setUserToDeleteId] = useState(-1)

  const navigate = useNavigate()
  if (loggedUser === {}) {
    navigate("/")
  }

  const [open, setOpen] = useState(false)

  const handleClickOpen = (id) => {
    setUserToDeleteId(id)
    setOpen(true)
  }

  const deleteUser = (id, isAdmin) => {
    if (loggedUser.id === id || isAdmin === true) {
      alert("Can't delete this user")
    } else {
      dispatch(deleteUserAction(id))
      setOpen(false)
    }
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
              <StyledTableCell align="center">isAdmin</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map(({ username, id, isAdmin }) => (
              <StyledTableRow key={id}>
                <StyledTableCell component="th" scope="row" align="center">
                  {username}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" align="center">
                  {id}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {isAdmin ? "Admin" : "-"}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" align="center">
                  <DeleteForeverIcon
                    onClick={() => handleClickOpen(id)}
                    sx={{
                      color: deepOrange[500],
                      cursor: "pointer",
                    }}
                  />
                  <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                    sx={{
                      paddingTop: 0,
                    }}
                  >
                    <DialogContent
                      sx={{
                        bgcolor: deepOrange[500],
                        alignItems: "center",
                        justifyItems: "center",
                      }}
                    >
                      <Dialog
                        open={open}
                        onClose={() => setOpen(false)}
                        aria-labelledby="alert-dialog-title"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Are you sure to delete this user?"}
                        </DialogTitle>
                        <DialogContent></DialogContent>
                        <DialogActions>
                          <Button onClick={() => setOpen(false)}>Cancel</Button>
                          <Button onClick={() => deleteUser(userToDeleteId)}>
                            Delete user
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </DialogContent>
                  </Dialog>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default UsersAdmin
