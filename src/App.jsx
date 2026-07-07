import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Timetable from "./Pages/Timetable";
import Navigation from "./Component/Navigation";
import Dashboard from "./Pages/DashBoard";
import Cookbook from "./Pages/recipe";
import Tools from "./Pages/Tools";

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/timetable" element={<Timetable/>} />
          <Route path="/recipe" element={<Cookbook/>} />
          <Route path="/Tools" element={<Tools/>}/>
          <Route path="/Dashboard" element={<Dashboard/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
