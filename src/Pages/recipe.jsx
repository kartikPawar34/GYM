import React, { useState } from "react";
import cookbookData from "../assets/recipe.json"; 
import "./CookBook.css"

function Cookbook() {
  const [recipes] = useState(cookbookData.sections?.recipes || []);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeRecipe, setActiveRecipe] = useState(null);

  const categories = ["All", ...new Set(recipes.map((r) => r.category))];

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderNutritionInfo = (nutrition) => {
    if (!nutrition) return null;

    if (nutrition.carbohydrate_g !== undefined) {
      return (
        <p><strong>Macros:</strong> {nutrition.carbohydrate_g}g Carbs | {nutrition.protein_g}g Protein</p>
      );
    }

    return Object.keys(nutrition).map((key) => {
      if (typeof nutrition[key] === "object") {
        const label = key.replace(/_/g, " ");
        return (
          <p key={key}>
            <strong>{label}:</strong> {nutrition[key].carbohydrate_g}g Carbs | {nutrition[key].protein_g}g Protein
          </p>
        );
      }
      return null;
    });
  };

  return (
    <div className="cookbook-container">
      <header className="cookbook-header">
        <h1>{cookbookData.title || "Cookbook"}</h1>
      </header>

      <div className="controls-section">
        <input
          type="text"
          placeholder="Search recipes (e.g., Smoothie, Wrap...)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <div className="category-buttons">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? "active-cat" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="recipe-grid">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe, index) => (
            <div key={`${recipe.name}-${index}`} className="recipe-card" onClick={() => setActiveRecipe(recipe)}>
              <div className="recipe-info">
                <span className="recipe-tag">{recipe.category}</span>
                <h3>{recipe.name}</h3>
                <p className="recipe-desc">{recipe.description.substring(0, 90)}...</p>
                <button className="view-btn">View Full Recipe</button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No snacks found matching your criteria.</p>
        )}
      </div>

      {activeRecipe && (
        <div className="modal-overlay" onClick={() => setActiveRecipe(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setActiveRecipe(null)}>×</button>
            
            <h2>{activeRecipe.name}</h2>
            <span className="modal-category">{activeRecipe.category}</span>
            <p className="modal-description"><em>{activeRecipe.description}</em></p>
            
            <div className="modal-body">
              <div className="modal-ingredients">
                <h3>Ingredients</h3>
                <ul>
                  {activeRecipe.ingredients?.map((ing, i) => (
                    <li key={i}>{ing}</li>
                  ))}
                </ul>

                {activeRecipe.optional_ingredients && (
                  <>
                    <h4 className="optional-title">Optional Add-ins:</h4>
                    <ul className="optional-list">
                      {activeRecipe.optional_ingredients.map((ing, i) => (
                        <li key={i}>{ing}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>

              <div className="modal-instructions">
                <h3>Directions</h3>
                <ol>
                  {activeRecipe.directions?.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>

              <div className="modal-nutrition">
                <h3>Nutrition Facts</h3>
                <p className="serving-size">
                  <strong>Serving:</strong> {activeRecipe.nutrition?.servings_and_size || activeRecipe.nutrition?.yield || "1 serving"}
                </p>
                <div className="macro-box">
                  {renderNutritionInfo(activeRecipe.nutrition)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cookbook;