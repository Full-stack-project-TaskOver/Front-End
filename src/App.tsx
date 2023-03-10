import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';

import SideNav from './Component/SideNav';


import TaskIndex from './Component/Tasks/TaskIndex';
// components

function App() {
  return (
    <>
      <Routes>
        
        <Route
          path="/"
          element={<SideNav  children={<TaskIndex />} />}
        ></Route>

      </Routes>
    </>
  );
}

export default App;
