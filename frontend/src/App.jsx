import React from 'react';
import TaskManagement from './components/TaskManagement';
import TimeManagement from './components/TimeManagement';
import FocusMode from './components/FocusMode';
import Inventory from './components/Inventory';

console.log("App.jsx is loading");

function App() {
  return (
    <div> {/* Removed the empty <div> */}
      <h1>FlowState</h1>
      <TaskManagement />
      <TimeManagement />
      <FocusMode />
      <Inventory />
    </div>
  );
}

export default App;