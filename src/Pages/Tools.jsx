import React from "react";
import BMI from "../functions/BMI";
import BMR from "../functions/BMR";
import TDEE from "../functions/TDEE";

function Tools(){
  return(
    <>
        <div className="container">
          <div className="card-container1">
            <div className="card1">
              <BMI/>
            </div>
            <div className="card1">
              <BMR/>
            </div>
            <div className="card1">
              <TDEE/>
            </div>
          </div>
        </div>
    </>
  )
}

export default Tools;