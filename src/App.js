import "./App.css";
import ApplicationModal from "./ApplicationModal/ApplicationModal";
import HomeView from "./Pages/Home/HomeView";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route
          path="/userlist"
          element={<ApplicationModal username="username" />}
        />
      </Routes>

      {/* <ApplicationModal username="username" /> */}
    </div>
  );
}

export default App;
