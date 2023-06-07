import "./ChatList.css"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material"
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
import axios from "axios"
import React, { useState, useEffect } from "react"
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

const URL = "http://localhost:8080/users"

const UsersAdmin = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector((state) => state.loggedUserReducer)

  const [userToDeleteId, setUserToDeleteId] = useState(-1)
  const [isAdminToDelete, setIsAdminToDelete] = useState(false)
  const [listElementAdmin, setListElementAdmin] = useState(false)
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

  const deleteUserFromDatabase = (id) => {
    axios
      .delete(`${URL}/${id}`)
      .then(() => {
        setOpen(false)
      })
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

  const [open, setOpen] = useState(false)

  const handleClickOpen = (id, isAdmin) => {
    setUserToDeleteId(id)
    setOpen(true)
    setListElementAdmin(isAdmin)
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
            {userListFromDatabase.map(({ username, id, isadmin }) => (
              <StyledTableRow key={id}>
                <StyledTableCell component="th" scope="row" align="center">
                  {username}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" align="center">
                  {id}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {isadmin ? "Admin" : "-"}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" align="center">
                  <DeleteForeverIcon
                    onClick={() => handleClickOpen(id, isadmin)}
                    sx={{
                      color: deepOrange[500],
                      cursor: "pointer",
                    }}
                  />
                  <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="alert-dialog-title"
                    sx={{
                      paddingTop: 0,
                    }}
                  >
                    <DialogContent alignItems="center" justifyitems="center">
                      <DialogTitle id="alert-dialog-title">
                        {"Are you sure to delete this user?"}
                      </DialogTitle>

                      {isAdminToDelete ? (
                        <Alert
                          sx={{
                            width: "250px",
                          }}
                          severity="error"
                        >
                          You cannot delete admin.
                        </Alert>
                      ) : (
                        ""
                      )}

                      <DialogActions>
                        <Button onClick={() => setOpen(false)}>Cancel</Button>
                        <Button
                          onClick={() => deleteUserFromDatabase(userToDeleteId)}
                        >
                          Delete user
                        </Button>
                      </DialogActions>
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
