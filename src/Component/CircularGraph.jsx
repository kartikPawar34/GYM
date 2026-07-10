import React, { useState, useEffect } from "react";

function CircularGraph({ bmi, bmr, tdee }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const totalSlides = 2;

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 10000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const prevSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  const bmrPercentage = bmr && tdee ? Math.round((parseFloat(bmr) / parseFloat(tdee)) * 100) : 0;
  
  let bmiPercentage = 0;
  let bmiColor = "#e6e6e6";
  let bmiDisplay = "0.0";
  
  if (bmi) {
    bmiDisplay = parseFloat(bmi).toFixed(1);
    bmiPercentage = Math.min(Math.round((parseFloat(bmi) / 35) * 100), 100);
    bmiColor = bmi >= 18.5 && bmi <= 24.9 ? "#4caf50" : "#ff9800"; 
  }

  const tdeeRingRadius = 50;
  const bmrRingRadius = 38;

  const outerSize = 140;
  const innerSize = 120;
  const centerX = outerSize / 2;
  const centerY = outerSize / 2;
  
  const tdeeCircumference = 2 * Math.PI * tdeeRingRadius;
  const bmrCircumference = 2 * Math.PI * bmrRingRadius;
  
  const bmrDashOffset = bmrPercentage === 0 ? bmrCircumference : bmrCircumference - (bmrPercentage / 100) * bmrCircumference;
  const tdeeDashOffset = tdee ? 0 : tdeeCircumference;

  return (
    <div className="NAVcontainer" style={{ textAlign: "center", position: "relative", paddingBottom: "10px" }}>
      <h3 style={{ margin: "0 0 10px 0", fontSize: "16px", fontWeight: "600" }}>
        {slideIndex === 0 ? "BMI Status" : "TDEE and BMR "}
      </h3>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "155px" }}>
        
        {slideIndex === 0 && (
          <div style={{ width: "160px" }}>
            <div style={{ position: "relative", display: "inline-block" }}>
              <svg width={innerSize} height={innerSize} viewBox={`0 0 ${innerSize} ${innerSize}`}>
                <circle cx="60" cy="60" r="50" fill="transparent" stroke="#ddd" strokeWidth="10" />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="transparent"
                  stroke={bmiPercentage > 0 ? bmiColor : "#ffffff00"}
                  strokeWidth="10"
                  strokeDasharray={Math.PI * 100}
                  strokeDashoffset={Math.PI * 100 - (bmiPercentage / 100) * (Math.PI * 100)}
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                  style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
                />
              </svg>
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: "15px", fontWeight: "bold" }}>
                {bmiDisplay}
              </div>
            </div>
            <div style={{ fontSize: "11px", color: "#888", marginTop: "4px" }}>Body Mass Index</div>
          </div>
        )}

        {slideIndex === 1 && (
          <div style={{ width: "160px" }}>
            <div style={{ position: "relative", display: "inline-block" }}>
              <svg width={outerSize} height={outerSize} viewBox={`0 0 ${outerSize} ${outerSize}`}>
                <circle cx={centerX} cy={centerY} r={tdeeRingRadius} fill="transparent" stroke="#ddd" strokeWidth="8" />
                <circle
                  cx={centerX}
                  cy={centerY}
                  r={tdeeRingRadius}
                  fill="transparent"
                  stroke={tdee ? "#FFD700" : "#ddd"}
                  strokeWidth="8"
                  strokeDasharray={tdeeCircumference}
                  strokeDashoffset={tdeeDashOffset}
                  strokeLinecap="round"
                  transform={`rotate(-90 ${centerX} ${centerY})`}
                  style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
                />
                <circle cx={centerX} cy={centerY} r={bmrRingRadius} fill="transparent" stroke="#ddd" strokeWidth="8" />
                <circle
                  cx={centerX}
                  cy={centerY}
                  r={bmrRingRadius}
                  fill="transparent"
                  stroke={bmrPercentage > 0 ? "#800080" : "#ddd"}
                  strokeWidth="8"
                  strokeDasharray={bmrCircumference}
                  strokeDashoffset={bmrDashOffset}
                  strokeLinecap="round"
                  transform={`rotate(-90 ${centerX} ${centerY})`}
                  style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
                />
              </svg>
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <span style={{ fontSize: "14px", fontWeight: "bold", color: "#800080" }}>{bmrPercentage > 0 ? `${bmrPercentage}%` : '--'}</span>
                <span style={{ fontSize: "9px", color: "#888" }}>BMR Ratio</span>
              </div>
            </div>
            <div style={{ fontSize: "10px", color: "#888", marginTop: "4px", display: "flex", justifyContent: "space-between", padding: "0 15px" }}>
              <span><span style={{ color: "#FFD700", fontWeight: "bold" }}>●</span> TDEE</span>
              <span><span style={{ color: "#800080", fontWeight: "bold" }}>●</span> BMR</span>
            </div>
          </div>
        )}

      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "15px", marginTop: "8px" }}>
        <span onClick={prevSlide} style={{ cursor: "pointer", fontSize: "16px", color: "#888", userSelect: "none" }}>‹</span>
        <span style={{ fontSize: "10px", color: "#aaa" }}>{(slideIndex + 1)} / {totalSlides}</span>
        <span onClick={nextSlide} style={{ cursor: "pointer", fontSize: "16px", color: "#888", userSelect: "none" }}>›</span>
      </div>
    </div>
  );
}

export default CircularGraph;