import React from "react";
import ConstantUpdate from "../assets/ConstantUpdate.json";

function Dashboard() {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDayName = daysOfWeek[new Date().getDay()];
  const todaysWorkout = ConstantUpdate.find((item) => item.Day.toLowerCase() === currentDayName.toLowerCase());
  
  return (
    <>
      <div className="container">
        <div className="card-container">
          {todaysWorkout ? (
            <div className="card">
              <h2>Workout for {todaysWorkout.Day}</h2>
              <p><strong>Focus:</strong> {todaysWorkout.Focus}</p>
              <hr/>

              {todaysWorkout.Sections && todaysWorkout.Sections.map((section, sectionIdx) => (
                <div key={sectionIdx} className="workout-section">
                  <hr/>
                  <h3>{section.SectionName}</h3>      
                    {section.Exercises.map((ex, exIdx) => (
                      <p key={exIdx} className="exercise-item">
                        <label className="exercise-label">
                          <div className="exercise-details">
                            <strong className="exercise-name">{ex.Exercise}</strong> :- {ex.Sets_Reps}
                            <span className="exercise-points">({ex.Points} pts)</span>
                          </div>                           
                        </label>
                      </p>
                    ))}
                </div>
              ))}
            </div>
          ) : (
            <div className="card">
              <h3>No workout found for today.</h3>
            </div>
          )}       
        </div>
      </div>
    </>
  );
}

export default Dashboard;
