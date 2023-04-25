import "./App.css";
import ApplicationModal from "./ApplicationModal/ApplicationModal";
import HomeView from "./Pages/Home/HomeView";

function App() {
  return (
    <div className="app">
      {/* <HomeView /> */}
      <ApplicationModal username="username" />
    </div>
  );
}

export default App;
