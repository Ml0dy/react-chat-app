import "./App.css"
import ApplicationModal from "./ApplicationModal/ApplicationModal"
import HomeView from "./Pages/Home/HomeView"
import { Route, Routes } from "react-router-dom"
import RegisterView from "./Pages/Register/RegisterView"

function App() {
  return (
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
  )
}

export default App
