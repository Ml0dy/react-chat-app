import "./App.css";
import ApplicationModal from "./ApplicationModal/ApplicationModal";
import HomeView from "./Pages/Home/HomeView";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <HomeView />
        {/* <ApplicationModal username="username" /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
