import { Route, Routes } from "react-router-dom";

// Import Components
import SessionCard from "./Component/Session/SessionsIndex";
import SideNav from "./Component/SideNav";
import TaskIndex from "./Component/Tasks/TaskIndex";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SideNav children={<TaskIndex />} />}></Route>
        <Route
          path="Sessions"
          element={<SideNav children={<SessionCard />} />}></Route>
      </Routes>
    </>
  );
}

export default App;
