import React from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Timetable from "./Pages/Timetable";
import Dashboard from "./Pages/DashBoard";
import Cookbook from "./Pages/recipe";
import Tools from "./Pages/Tools";
import Navigation from "./Component/navigation";

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        
        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/timetable" element={<Timetable />} />
            <Route path="/recipe" element={<Cookbook />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/dashboard" element={<Dashboard />} />           
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router> 
  );
}

export default App;