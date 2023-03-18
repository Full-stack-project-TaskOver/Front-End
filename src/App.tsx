import { Route, Routes } from "react-router-dom";

// Import Components
import SessionsIndex from "./Component/Session/SessionsIndex";
import SideNav from "./Component/SideNav";
import TaskIndex from "./Component/Tasks/TaskIndex";
import signUp from "./Component/Authentication/sign-up";
import signIp from "./Component/Authentication/sign-in";
import "./App.css";
import Leaderboard from "./Component/Session/Leaderboard";
import Level from "./Component/LandingPage/Components/CactusLevel";
import LandingPage from "./Component/LandingPage/LandingPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SideNav children={<TaskIndex />} />}></Route>
        <Route path="sign-up" element={signUp()}></Route>
        <Route path="sign-in" element={signIp()}></Route>
        <Route path="/" element={<SideNav children={<TaskIndex />} />}></Route>
        <Route
          path="/:id"
          element={<SideNav children={<TaskIndex />} />}></Route>

        <Route
          path="Sessions"
          element={<SideNav children={<SessionsIndex />} />}></Route>
        {/* <Route
          path="/leaderboard/:id"
          element={<SideNav children={<Leaderboard />} />}></Route> */}
        <Route path="Landing" element={<LandingPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
