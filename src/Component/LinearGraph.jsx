import React from "react";

function LinearGraph({ bmr, tdee }) {
  const bmrValue = bmr ? parseFloat(bmr) : 0;
  const tdeeValue = tdee ? parseFloat(tdee) : 0;

  // Use the larger value, fallback to 2500 for baseline axis preview sizing
  const maxValue = Math.max(bmrValue, tdeeValue, 2500);
  
  const graphHeight = 120;
  const bmrBarHeight = bmrValue ? (bmrValue / maxValue) * graphHeight : 15;
  const tdeeBarHeight = tdeeValue ? (tdeeValue / maxValue) * graphHeight : 15;

  return (
    <div className="NAVcontainer">
      <h2>Metabolic Comparison</h2>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", height: `${graphHeight + 40}px`, gap: "40px", marginTop: "10px" }}>
        
        {/* BMR Column Bar */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontSize: "11px", fontWeight: "bold", color: "#7d1ee9" }}>{bmrValue ? `${Math.round(bmrValue)} kcal` : "---"}</span>
          <div style={{
            width: "35px",
            height: `${bmrBarHeight}px`,
            backgroundColor: "#7d1ee9",
            borderRadius: "4px 4px 0 0",
            transition: "height 0.5s ease-out"
          }} />
          <span style={{ fontSize: "12px", marginTop: "5px", fontWeight: "500", color: "#555" }}>BMR</span>
        </div>

        {/* TDEE Column Bar */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontSize: "11px", fontWeight: "bold", color: "#d19900" }}>{tdeeValue ? `${Math.round(tdeeValue)} kcal` : "---"}</span>
          <div style={{
            width: "35px",
            height: `${tdeeBarHeight}px`,
            backgroundColor: "#d19900",
            borderRadius: "4px 4px 0 0",
            transition: "height 0.5s ease-out"
          }} />
          <span style={{ fontSize: "12px", marginTop: "5px", fontWeight: "500", color: "#555" }}>TDEE</span>
        </div>

      </div>
    </div>
  );
}

export default LinearGraph;