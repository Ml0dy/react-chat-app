import "./App.css"
import ApplicationModal from "./ApplicationModal/ApplicationModal"
import HomeView from "./Pages/Home/HomeView"
import RegisterView from "./Pages/Register/RegisterView"
import { ThemeProvider } from "@emotion/react"
import { createTheme } from "@mui/material/styles"
import { Route, Routes } from "react-router-dom"

export const themes = createTheme({
  palette: {
    secondary: {
      main: "#5359EA",
    },
  },
  typography: {
    fontFamily: [
      "Montserrat",
      "sans-serif",
      "-apple-system",
      "BlinkMacSystemFont",
    ].join(","),
  },
})

function App() {
  return (
    <ThemeProvider theme={themes}>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/adminpanel" element={<ApplicationModal />} />
          <Route path="/userprofile" element={<ApplicationModal />} />
          <Route path="/users" element={<ApplicationModal />} />
          <Route path="/chatlist" element={<ApplicationModal />} />
          <Route path="/userlist" element={<ApplicationModal />} />
          <Route path="/registration" element={<RegisterView />} />
        </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App
