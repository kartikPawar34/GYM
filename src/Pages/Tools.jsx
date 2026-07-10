import React, { useState } from "react";
import BMI from "../functions/BMI";
import BMR from "../functions/BMR";
import TDEE from "../functions/TDEE";
import ExerciseBurnCalories from "../functions/ExerciseBurnCal";
import CircularGraph from "../Component/CircularGraph";
import LinearGraph from "../Component/LinearGraph";
import UnitConverter from "../Component/Heightconversion";

function Tools() {
  const [bmi, setBmi] = useState(null);
  const [bmr, setBmr] = useState(null);
  const [tdee, setTdee] = useState(null);

  return (
    <>
      <div className="container">
        <div className="card-container1">
          <div className="card1">
            <BMI onCalculate={setBmi} />
          </div>

          <div className="card1">
            <BMR onCalculate={setBmr} />
          </div>

          <div className="card1">
            <TDEE onCalculate={setTdee} />
          </div>

          <div className="card1">
            <CircularGraph bmi={bmi} tdee={tdee} />
          </div>

          <div className="card">
            <LinearGraph bmr={bmr} tdee={tdee} />
          </div>

          <div className="card">
            <ExerciseBurnCalories />
          </div>
          <div className="card">
            <UnitConverter />
          </div>
        </div>
      </div>
    </>
  );
}

export default Tools;