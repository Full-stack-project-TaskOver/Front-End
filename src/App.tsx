import { Route, Routes } from "react-router-dom";
import SessionsIndex from "./Component/Session/SessionsIndex";

// Import Components
import SessionCard from "./Component/Session/SessionsIndex";
import SideNav from "./Component/SideNav";
import TaskIndex from "./Component/Tasks/TaskIndex";
import signUp from "./Component/Authentication/sign-up"
import signIp from "./Component/Authentication/sign-in"
import "./App.css";


function App() {
  return (
    <>
      <Routes>
        <Route path="sign-up" element={signUp()}></Route>
        <Route path="sign-in" element={signIp()}></Route>
        <Route path="/" element={<SideNav children={<TaskIndex />} />}></Route>
        <Route
          path="Sessions"
          element={<SideNav children={<SessionsIndex />} />}></Route>
      </Routes>
    </>
  );
}

export default App;
