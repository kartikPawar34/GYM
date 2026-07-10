import React, { useState } from "react";
import ConstantUpdate from "../assets/ConstantUpdate.json";

// 1. Progress Bar Component
function ProgressBar({ earned, total }) {
  // Prevent division by zero if there are no points
  const percentage = total > 0 ? Math.min(Math.round((earned / total) * 100), 100) : 0;

  return (
    <div className="progress-container" style={{ marginTop: "20px", padding: "10px 0" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px", fontSize: "14px" }}>
        <strong>Daily Progress</strong>
        <span>{earned} / {total} pts ({percentage}%)</span>
      </div>
      <div className="progress-track" style={{ width: "100%", height: "10px", backgroundColor: "#333", borderRadius: "5px", overflow: "hidden" }}>
        <div 
          className="progress-fill" 
          style={{ 
            width: `${percentage}%`, 
            height: "100%", 
            backgroundColor: "#8e09e7", 
            transition: "width 0.3s ease-in-out" 
          }}
        />
      </div>
    </div>
  );
}

// 2. Updated WorkoutSection Component
function WorkoutSection({ section, completedExercises, toggleExercise }) {
  return (
    <div className="workout-section">
      <hr />
      <h3 className="section-header">{section.SectionName}</h3>      
      
      <div className="section-content">
        {section.Exercises.map((ex, exIdx) => {
          // Unique key using Section Name and Exercise Name to track completion status safely
          const exerciseId = `${section.SectionName}-${ex.Exercise}-${exIdx}`;
          const isCompleted = !!completedExercises[exerciseId];

          return (
            <p 
              key={exIdx} 
              className={`exercise-item ${isCompleted ? "completed" : ""}`}
              style={{ opacity: isCompleted ? 0.6 : 1, transition: "opacity 0.2s" }}
            >
              <label 
                className="exercise-label" 
                style={{ display: "flex", alignItems: "center", cursor: "pointer", userSelect: "none" }}
              >
                {/* Checkbox to click and earn points */}
                <input 
                  type="checkbox" 
                  checked={isCompleted} 
                  onChange={() => toggleExercise(exerciseId, ex.Points)}
                  style={{
                          marginRight: "12px",
                          width: "18px",
                          height: "18px",
                          cursor: "pointer",
                          border: "2px solid purple",
                          backgroundColor: "transparent",
                          color: "purple"
                        }}

                />
                <div className="exercise-details" style={{ textDecoration: isCompleted ? "line-through" : "none" }}>
                  <strong className="exercise-name">{ex.Exercise}</strong> :- {ex.Sets_Reps}
                  <span className="exercise-points" style={{ marginLeft: "8px", color: "#4CAF50" }}>
                    ({ex.Points} pts)
                  </span>
                </div>                           
              </label>
            </p>
          );
        })}
      </div>
    </div>
  );
}

// 3. Main Dashboard Component
function Dashboard() {
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDayName = daysOfWeek[new Date().getDay()];
  
  const todaysWorkout = ConstantUpdate.find(
    (item) => item.Day.toLowerCase() === currentDayName.toLowerCase()
  );

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const totalSections = todaysWorkout?.Sections?.length || 0;

  // --- STATE FOR TRACKING POINTS & COMPLETION ---
  const [completedExercises, setCompletedExercises] = useState({});
  const [earnedPoints, setEarnedPoints] = useState(0);

  // Calculate the maximum possible points for today's entire workout dynamically
  const totalPossiblePoints = todaysWorkout?.Sections?.reduce((sum, section) => {
    return sum + section.Exercises.reduce((secSum, ex) => secSum + (Number(ex.Points) || 0), 0);
  }, 0) || 0;

  const toggleExercise = (exerciseId, points) => {
    const pts = Number(points) || 0;

    setCompletedExercises((prev) => {
      const isChecking = !prev[exerciseId];
      
      // Update running total points simultaneously
      setEarnedPoints((prevPoints) => isChecking ? prevPoints + pts : prevPoints - pts);
      
      return {
        ...prev,
        [exerciseId]: isChecking
      };
    });
  };

  const nextSection = () => {
    setActiveSectionIndex((prevIndex) => (prevIndex + 1) % totalSections);
  };

  const prevSection = () => {
    setActiveSectionIndex((prevIndex) => (prevIndex - 1 + totalSections) % totalSections);
  };

  return (
    <div className="container">
      <div className="card-container">
        {todaysWorkout ? (
          <div className="card" style={{ display: "flex", flexDirection: "column", minHeight: "480px" }}>
            <h2>Workout for {todaysWorkout.Day}</h2>
            <p><strong>Focus:</strong> {todaysWorkout.Focus}</p>

            {todaysWorkout.Sections && todaysWorkout.Sections.length > 0 ? (
              <div className="section-slider-wrapper" style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
                
                <div className="content-body" style={{ flexGrow: 1 }}>
                  {/* Pass tracking states and handler props down */}
                  <WorkoutSection 
                    section={todaysWorkout.Sections[activeSectionIndex]} 
                    completedExercises={completedExercises}
                    toggleExercise={toggleExercise}
                  />
                </div>

                {/* Fixed Footer Container containing both Navigation Arrows and the Progress Bar */}
                <div className="footer-controls" style={{ marginTop: "auto", paddingTop: "20px" }}>
                  
                  {/* Arrow Navigation Row */}
                  {totalSections > 1 && (
                    <div 
                      className="section-navigation" 
                      style={{ 
                        display: "flex", 
                        justifyContent: "space-between", 
                        alignItems: "center",
                        marginBottom: "10px"
                      }}
                    >
                      <span 
                        className="nav-arrow prev" 
                        onClick={prevSection}
                        style={{ fontSize: "24px", cursor: "pointer", userSelect: "none" }}
                      >
                        &#8592;
                      </span>
                      
                      <span className="nav-indicator" style={{ fontSize: "14px", opacity: 0.8 }}>
                        Section {activeSectionIndex + 1} of {totalSections}
                      </span>
                      
                      <span 
                        className="nav-arrow next" 
                        onClick={nextSection}
                        style={{ fontSize: "24px", cursor: "pointer", userSelect: "none" }}
                      >
                        &#8594;
                      </span>
                    </div>
                  )}

                  {/* Progress Bar Component */}
                  <ProgressBar earned={earnedPoints} total={totalPossiblePoints} />
                </div>

              </div>
            ) : (
              <p>No workout sections available for today.</p>
            )}
          </div>
        ) : (
          <div className="card">
            <h3>No workout found for today.</h3>
          </div>
        )}       
      </div>
    </div>
  );
}

export default Dashboard;