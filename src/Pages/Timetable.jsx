import { useState } from "react";
import constantUpdate from "../assets/ConstantUpdate.json";

// Dropdown exercise options
const FOCUS_OPTIONS = [
  "Chest & Biceps",
  "Back & Triceps",
  "Legs & Abs",
  "Shoulders & Arms",
  "Upper Body Hypertrophy",
  "Lower Body & Core Conditioning",
  "Full Body Workout",
  "Cardio & Core",
  "Rest Day"
];

function Timetable() {
  // Main state holding timetable entries
  const [timetable, setTimetable] = useState(constantUpdate);
  
  // Modal visibility state
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Draft state while editing inside the modal
  const [editTimetable, setEditTimetable] = useState([]);

  // Open modal and create a copy of state to edit
  const handleOpenModal = () => {
    setEditTimetable([...timetable]);
    setIsModalOpen(true);
  };

  // Update draft focus selection in modal
  const handleFocusChange = (index, newFocus) => {
    const updated = [...editTimetable];
    updated[index] = { ...updated[index], Focus: newFocus };
    setEditTimetable(updated);
  };

  // Commit changes from modal to timetable
  const handleSaveChanges = () => {
    setTimetable(editTimetable);
    setIsModalOpen(false);
  };

  // Reset timetable back to initial JSON defaults
  const handleReset = () => {
    setTimetable(constantUpdate);
  };

  return (
    <div className="cookbook-container">
      {/* Header Section */}
      <div className="cookbook-header">
        <h1>Weekly Workout Timetable</h1>
        <p>Manage and customize your day-by-day exercise focus</p>
      </div>

      {/* Control Action Buttons */}
      <div className="controls-section">
        <div className="category-buttons">
          <button className="category-btn active-cat" onClick={handleOpenModal}>
            Update Timetable
          </button>
          <button className="category-btn" onClick={handleReset}>
            Reset to Default
          </button>
        </div>
      </div>

      {/* Day Cards Grid */}
      <div className="recipe-grid">
        {timetable.map((item, index) => (
          <div key={index} className="recipe-card">
            <div>
              <span className="recipe-tag">{item.Day}</span>
              <h3>{item.Focus}</h3>
              <p className="recipe-desc">Scheduled focus area for {item.Day}.</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pop-up Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setIsModalOpen(false)}>
              &times;
            </button>
            
            <span className="modal-category">Settings</span>
            <h2>Update Daywise Focus</h2>
            <p className="modal-description">
              Select an exercise focus from the dropdown for each day of the week.
            </p>

            {/* Modal Body with Dropdowns */}
            <div className="modal-body">
              {editTimetable.map((item, index) => (
                <div key={index} className="macro-box">
                  <h4 style={{ margin: "0 0 8px 0", color: "#9a5de5" }}>{item.Day}</h4>
                  <select
                    value={item.Focus}
                    onChange={(e) => handleFocusChange(index, e.target.value)}
                    className="search-input"
                    style={{ maxWidth: "100%", borderRadius: "8px" }}
                  >
                    {FOCUS_OPTIONS.map((option, idx) => (
                      <option key={idx} value={option} style={{ background: "#1c1427", color: "#fff" }}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* Modal Action Controls */}
            <div className="category-buttons" style={{ marginTop: "25px", justifyContent: "flex-end" }}>
              <button className="category-btn" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button className="category-btn active-cat" onClick={handleSaveChanges}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Timetable;