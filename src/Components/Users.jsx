import * as React from "react"
import { styled } from "@mui/material/styles"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { deepOrange, red } from "@mui/material/colors"
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import "./ChatList.css"
import DeleteForeverIcon from "@mui/icons-material/DeleteForever"
import DialogActions from "@mui/material/DialogActions"
import { deleteUserAction } from "../Redux/Actions/usersDatabaseAction"
import { useState } from "react"

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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}))

const Users = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector((state) => state.loggedUserReducer.user)
  const userList = useSelector((state) => state.userDatabaseReducer)

  const deleteUser = (id) => {
    dispatch(deleteUserAction(id))
  }

  const navigate = useNavigate()
  if (loggedUser === {}) {
    navigate("/")
  }
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
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

                {/* dlug technologiczny <Dialog
                    open={open}
                    onClose={handleClose}
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
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                      >
                        <DialogTitle id="alert-dialog-title">
                          {"Are you sure to delete this user?"}
                        </DialogTitle>
                        <DialogContent></DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>Cancel</Button>
                          <Button onClick={() => deleteUser(id)}>
                            Delete user
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </DialogContent>
                  </Dialog> */}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Users
