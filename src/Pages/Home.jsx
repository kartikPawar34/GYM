import { useState, useEffect } from "react";
import ConstantUpdate from "../assets/ConstantUpdate.json";
import BMI from "../functions/BMI";
import BMR from "../functions/BMR";
import TDEE from "../functions/TDEE";
import "./CookBook.css"

function Home() {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDayName = daysOfWeek[new Date().getDay()];
  const todaysWorkout = ConstantUpdate.find((item) => item.Day.toLowerCase() === currentDayName.toLowerCase());
  

  return (
    <>
      <div className="container">
        <div className="card-container">
          {todaysWorkout ? (
            <div className="card">
              <h2>Today's Workout ({todaysWorkout.Day})</h2>
              <p><strong>Focus:</strong> {todaysWorkout.focus}</p>
              <p>{todaysWorkout.exercise}</p>
            </div>
          ) : (
            <div className="card">
              <h3>No workout found for today.</h3>
            </div>
          )}
          <div className="card">
            <BMI/>
          </div>
          <div className="card">
            <BMR/>
          </div>
          <div className="card">
            <TDEE/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;