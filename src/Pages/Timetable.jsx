import { useState,useEffect } from "react";
import constantUpdate from "../assets/ConstantUpdate.json";

function Timetable(){
  return(
    <>
      <div className="container">
        <h1>Weekly Workout Timetable</h1>
        <table>
          <tr>
            <th>Day</th>
            <th>Focus</th>
          </tr>
          <tbody>
            {constantUpdate.map((item, index)=>(
              <tr key={index}>
                <td className="daycell">{item.Day}</td>
                <td className="focus-cell">{item.Focus}</td>
              </tr>
            ))}
          </tbody>
          </table>
      </div>
    </>
  )
}

export default Timetable;