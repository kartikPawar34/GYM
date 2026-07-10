import React, { useState } from "react";

function UnitConverter() {
  const [conversionType, setConversionType] = useState("ftInToCm");
  
  // Input states
  const [inputVal1, setInputVal1] = useState("");
  const [inputVal2, setInputVal2] = useState("");
  const [result, setResult] = useState(null);

  // Clear fields on mode change
  const handleTypeChange = (e) => {
    setConversionType(e.target.value);
    setInputVal1("");
    setInputVal2("");
    setResult(null);
  };

  const handleCalculate = () => {
    const val1 = parseFloat(inputVal1) || 0;
    const val2 = parseFloat(inputVal2) || 0;

    switch (conversionType) {
      case "ftInToCm":
        if (val1 > 0 || val2 > 0) {
          const totalCm = (val1 * 30.48) + (val2 * 2.54);
          setResult(`${totalCm.toFixed(2)} cm`);
        }
        break;

      case "cmToFtIn":
        if (val1 > 0) {
          const totalInches = val1 / 2.54;
          const calculatedFeet = Math.floor(totalInches / 12);
          const calculatedInches = Math.round(totalInches % 12);
          setResult(`${calculatedFeet} ft ${calculatedInches} in`);
        }
        break;

      case "lbsToKg":
        if (val1 > 0) {
          const kg = val1 * 0.45359237;
          setResult(`${kg.toFixed(2)} kg`);
        }
        break;

      case "kgToLbs":
        if (val1 > 0) {
          const lbs = val1 / 0.45359237;
          setResult(`${lbs.toFixed(2)} lbs`);
        }
        break;

      default:
        setResult(null);
    }
  };

  return (
    <div className="NAVcontainer">
      <h2>Unit Converter</h2>
      
      {/* Dynamic Type Selector Dropdown */}
      <select value={conversionType} onChange={handleTypeChange} style={{ marginBottom: "10px", width: "100%" }}>
        <option value="ftInToCm">Feet & Inches → CM</option>
        <option value="cmToFtIn">CM → Feet & Inches</option>
        <option value="lbsToKg">Pounds (lbs) → Kilograms (kg)</option>
        <option value="kgToLbs">Kilograms (kg) → Pounds (lbs)</option>
      </select>
      <br />

      {/* Conditional Inputs rendering dynamically based on type selection */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        {conversionType === "ftInToCm" ? (
          <>
            <input
              type="number"
              placeholder="Feet (ft)"
              value={inputVal1}
              onChange={(e) => setInputVal1(e.target.value)}
              style={{ width: "100%" }}
            />
            <input
              type="number"
              placeholder="Inches (in)"
              value={inputVal2}
              onChange={(e) => setInputVal2(e.target.value)}
              style={{ width: "100%" }}
            />
          </>
        ) : (
          <input
            type="number"
            placeholder={
              conversionType === "cmToFtIn" ? "Height (cm)" :
              conversionType === "lbsToKg" ? "Weight (lbs)" : "Weight (kg)"
            }
            value={inputVal1}
            onChange={(e) => setInputVal1(e.target.value)}
            style={{ width: "100%" }}
          />
        )}
      </div>

      {result && <p className="Result">Converted: {result}</p>}

      <button onClick={handleCalculate} className="submit-btn">
        Convert Unit
      </button>
    </div>
  );
}

export default UnitConverter;