import { Route, Routes } from "react-router-dom";

// Import Components
import SessionsIndex from "./Component/Session/SessionsIndex";
import SideNav from "./Component/SideNav";
import TaskIndex from "./Component/Tasks/TaskIndex";
import signUp from "./Component/Authentication/sign-up";
import signIn from "./Component/Authentication/sign-in";
import "./App.css";
import Leaderboard from "./Component/Session/Leaderboard";
import Level from "./Component/LandingPage/Components/CactusLevel";
import LandingPage from "./Component/LandingPage/LandingPage";
import ShowUsers from "./Component/Tasks/ShowUsers";
import Profile from "./Component/Profile/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="sign-up" element={signUp()}></Route>
        <Route path="sign-in" element={signIn()}></Route>
        <Route
          path="/:id"
          element={<SideNav children={<TaskIndex />} />}></Route>
        <Route
          path="/:id/show-users"
          element={<SideNav children={<ShowUsers />} />}></Route>
        <Route
          path="Sessions"
          element={<SideNav children={<SessionsIndex />} />}></Route>
        {/* <Route
          path="/leaderboard/:id"
          element={<SideNav children={<Leaderboard />} />}></Route> */}
        <Route
          path="/leaderboard/:id"
          element={<SideNav children={<Leaderboard />} />}></Route>
          <Route
          path="/Profile"
          element={<SideNav children={<Profile />} />}></Route>
      </Routes>
      
    </>
  );
}

export default App;
