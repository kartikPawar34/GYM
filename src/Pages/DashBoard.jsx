import React from "react";
import ConstantUpdate from "../assets/ConstantUpdate.json";
import Timetable from "./Timetable";
import Exercise from "../assets/Exercise.json";

function Dashboard() {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  const currentDayName = daysOfWeek[new Date().getDay()];

  // 1. Find today's workout target from ConstantUpdate
  const todaysWorkout = ConstantUpdate.find(
    (item) => item.Day.toLowerCase() === currentDayName.toLowerCase()
  );

  // Helper function to strip non-alphabetical characters for clean matching
  const normalize = (str) => str?.toLowerCase().replace(/[^a-z]/g, "");

  // 2. Find the matching exercise set from Exercise.json
  const ExerciseMatch = todaysWorkout
    ? Exercise.find(
        (ex) => normalize(ex.Focusing) === normalize(todaysWorkout.Focus)
      )
    : null;

  return (
    <div className="container">
      <div className="card-container">
        <div className="card today-card">
          {todaysWorkout ? (
            <h2 className="today-message">
              Today is {todaysWorkout.Day}: "{todaysWorkout.Focus}"
            </h2>
          ) : (
            <h2 className="today-message">
              Today is {currentDayName}: "Rest Day"
            </h2>
          )}
        </div>
      </div>
      <div className="card-container">
        <div className="card today-card">
          {ExerciseMatch ? (
            <div>
              <h3>Exercises for Today:</h3>
              {Object.entries(ExerciseMatch.Exercises).map(([category, list]) => (
                <div key={category}>
                  <h4>{category}</h4>
                    {list.map((item, index) => (
                      <p key={index}>{item}</p>
                    ))}
                </div>
              ))}
            </div>
          ) : (
            <h3>No exercises scheduled today. Enjoy your rest!</h3>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;