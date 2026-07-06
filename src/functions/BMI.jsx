import React, { useState } from "react";

function BMI() {
  const [weight, setWeight] = useState(""); 
  const [height, setHeight] = useState(""); 
  const [bmi, setBmi] = useState(null);

  const calculateBMI = () => {
    if (weight && height) {
      const result = (weight / (height * height)).toFixed(2);
      setBmi(result);
    }
  };

  return (
    <div className="NAVcontainer">
      <h2>BMI Calculator</h2>
      <input type="number" placeholder="Weight (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} />
      <br />
      <input type="number" placeholder="Height (m)" value={height} onChange={(e) => setHeight(e.target.value)} />
      <br />
      {bmi && <p className="Result">Your BMI is: {bmi}</p>}
      <button onClick={calculateBMI} className="submit-btn">Calculate BMI</button> 
    </div>
  );
}

export default BMI;
