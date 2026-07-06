import React from "react";
import { NavLink } from "react-router-dom";
import recipe from "../Pages/recipe";

function Navigation() {
  return (
    <nav className="nav-container">
      <div className="nav-pill">
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          Home
        </NavLink>
        
        <NavLink 
          to="/timetable" 
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          Timetable
        </NavLink>
    
       <NavLink 
          to="/recipe" 
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          Cooking
        </NavLink>

      </div>
    </nav>
  );``
}

export default Navigation;