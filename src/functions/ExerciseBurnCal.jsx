import React, { useState, useEffect } from "react";
import ExerciseCal from "../assets/ExerciseCalBurn.json";

function ExerciseBurnCalories() {
  const [muscleGroup, setMuscleGroup] = useState("");
  const [exercise, setExercise] = useState("");
  const [numSets, setNumSets] = useState("");
  const [setDetails, setSetDetails] = useState([]);
  const [calories, setCalories] = useState(null);

  useEffect(() => {
    const count = parseInt(numSets, 10) || 0;
    setSetDetails((prevDetails) => {
      if (prevDetails.length === count) return prevDetails;
      if (prevDetails.length < count) {
        const extraSets = Array.from({ length: count - prevDetails.length }, () => ({
          reps: "",
          weight: "",
        }));
        return [...prevDetails, ...extraSets];
      } else {
        return prevDetails.slice(0, count);
      }
    });
  }, [numSets]);

  const handleSetChange = (index, field, value) => {
    const updated = [...setDetails];
    updated[index][field] = value;
    setSetDetails(updated);
  };

  const calculateCalories = () => {
    if (exercise && setDetails.length > 0) {
      const selectedExercise = Object.values(ExerciseCal)
        .flat()
        .find((ex) => ex.name === exercise);

      if (selectedExercise) {
        let totalCaloriesBurned = 0;

        setDetails.forEach((set) => {
          const repsCount = parseInt(set.reps, 10) || 0;
          const weightLifted = parseFloat(set.weight) || 0;
          const baseCalories = selectedExercise.calPerRep * repsCount;
          const weightMultiplier = 1 + (weightLifted * 0.015);

          totalCaloriesBurned += baseCalories * weightMultiplier;
        });

        setCalories(totalCaloriesBurned);
      }
    }
  };

  return (
    <div className="NAVcontainer">
      <h2 className="heading"> Calorie Calculator </h2>

      <label className="label">
        Targeted Muscle:
        <select className="dropdown" value={muscleGroup} onChange={(e) => { setMuscleGroup(e.target.value); setExercise(""); }} >
          <option value="">Choose Muscle </option>
          {Object.keys(ExerciseCal).map((group) => (
            <option key={group} value={group}>
              {group.charAt(0).toUpperCase() + group.slice(1)}
            </option>
          ))}
        </select>
      </label>

      {muscleGroup && (
        <label className="label">
          Exercise:
          <select className="dropdown" value={exercise} onChange={(e) => setExercise(e.target.value)} >
            <option value="">Choose Exercise</option>
            {ExerciseCal[muscleGroup].map((ex) => (
              <option key={ex.name} value={ex.name}>{ex.name}</option>
            ))}
          </select>
        </label>
      )}

      <p className="label">
        How many Sets?
        <input className="input" type="number" placeholder="e.g. 4" value={numSets} onChange={(e) => setNumSets(e.target.value)} />
      </p>

      {setDetails.length > 0 && (
        <div className="set-details-container">
          <h3 className="subheading">Set Breakdown:</h3>
          {setDetails.map((set, index) => (
            <div key={index} className="set-row">
              <span className="set-label">Set {index + 1}:</span>
              <input
                className="input input-reps"
                type="number"
                placeholder="Reps"
                value={set.reps}
                onChange={(e) => handleSetChange(index, "reps", e.target.value)}
              />
              <input
                className="input input-weight"
                type="number"
                placeholder="Weight (kg)"
                value={set.weight}
                onChange={(e) => handleSetChange(index, "weight", e.target.value)}
              />
            </div>
          ))}
        </div>
      )}

      <button onClick={calculateCalories} className="submit-btn">
        Calculate
      </button>

      {calories !== null && (
        <p className="Result">🔥 Total Calories Burned: <strong>{calories.toFixed(1)} kcal</strong></p>
      )}
    </div>
  );
}

export default ExerciseBurnCalories;