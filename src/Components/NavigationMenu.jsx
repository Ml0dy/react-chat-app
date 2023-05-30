import { AccountCircle } from "@mui/icons-material"
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings"
import PlaylistAddCheckCircleIcon from "@mui/icons-material/PlaylistAddCheckCircle"
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle"
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import { deepOrange } from "@mui/material/colors"
import React from "react"
import { Link } from "react-router-dom"

const NavigationMenu = ({ userMenu }) => {
  return (
    <List>
      {userMenu.map((text, index) => (
        <Link
          to={`/${text.replace(" ", "").toLowerCase()}`}
          key={userMenu[index]}
          style={{
            textDecoration: "none",
            color: "#000",
            fontWeight: "bold",
          }}
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {text === "Admin panel" ? (
                  <AdminPanelSettingsIcon sx={{ color: deepOrange[500] }} />
                ) : (
                  " "
                )}
                {text === "User Profile" ? (
                  <AccountCircle sx={{ color: deepOrange[500] }} />
                ) : (
                  " "
                )}
                {text === "Chat List" ? (
                  <PlaylistAddCheckCircleIcon sx={{ color: deepOrange[500] }} />
                ) : (
                  " "
                )}
                {text === "User List" ? (
                  <SupervisedUserCircleIcon sx={{ color: deepOrange[500] }} />
                ) : (
                  " "
                )}
                {text === "Users" ? (
                  <SupervisedUserCircleIcon sx={{ color: deepOrange[500] }} />
                ) : (
                  " "
                )}
              </ListItemIcon>
              <ListItemText primary={text.toUpperCase()} />
            </ListItemButton>
          </ListItem>
        </Link>
      ))}
    </List>
  )
}

export default NavigationMenu
