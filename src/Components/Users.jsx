import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { red } from "@mui/material/colors";
import { Box } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: " #212766",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Users = ({ userList }) => {
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
              <StyledTableCell>User Name </StyledTableCell>
              <StyledTableCell align="left">Id</StyledTableCell>
              <StyledTableCell align="right">isAdmin</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map(({ username, id, isAdmin }) => (
              <StyledTableRow key={id}>
                <StyledTableCell component="th" scope="row">
                  {username}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {id}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {isAdmin ? "Admin" : "NoAdmin"}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Users;
