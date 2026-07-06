import React, { useState } from "react";

function TDEE() {
  const [bmr, setBmr] = useState("");
  const [activity, setActivity] = useState("sedentary");
  const [tdee, setTdee] = useState(null);

  const activityFactors = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    veryActive: 1.9,
  };

  const calculateTDEE = () => {
    if (bmr) {
      const result = bmr * activityFactors[activity];
      setTdee(result.toFixed(2));
    }
  };

  return (
    <div className="NAVcontainer">
      <h2>TDEE Calculator</h2>
      <input
        type="number"
        placeholder="Enter your BMR"
        value={bmr}
        onChange={(e) => setBmr(e.target.value)}
      />
      <br />
      <select value={activity} onChange={(e) => setActivity(e.target.value)}>
        <option value="sedentary">Sedentary (little/no exercise)</option>
        <option value="light">Lightly active (1-3 days/week)</option>
        <option value="moderate">Moderately active (3-5 days/week)</option>
        <option value="active">Active (6-7 days/week)</option>
        <option value="veryActive">Very active (physical job + exercise)</option>
      </select>
      <br />
      {tdee && <p className="Result">Your TDEE is: {tdee} calories/day</p>}
      <button onClick={calculateTDEE} className="submit-btn">Calculate TDEE</button>
    </div>
  );
}

export default TDEE;
