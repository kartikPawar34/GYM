import React, { useState } from "react";

function BMR() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [bmr, setBmr] = useState(null);

  const calculateBMR = () => {
    if (weight && height && age) {
      let result;
      if (gender === "male") {
        result = (10 * weight) + (6.25 * height) - (5 * age) + 5;
      } else {
        result = (10 * weight) + (6.25 * height) - (5 * age) - 161;
      }
      setBmr(result.toFixed(2));
    }
  };

  return (
    <div className="NAVcontainer">
      <h2>BMR Calculator</h2>
      <input type="number" placeholder="Weight (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} />
      <br />
      <input type="number" placeholder="Height (cm)" value={height} onChange={(e) => setHeight(e.target.value)} />
      <br />
      <input type="number" placeholder="Age (years)" value={age} onChange={(e) => setAge(e.target.value)} />
      <br />
      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <br />
      {bmr && <p className="Result">Your BMR is: {bmr} calories/day</p>}
      <button onClick={calculateBMR} className="submit-btn">Calculate BMR</button>
    </div>
  );
}

export default BMR;
