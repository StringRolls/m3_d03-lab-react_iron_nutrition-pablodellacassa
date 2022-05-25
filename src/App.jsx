// src/App.js
import { useState } from "react";
import "./App.css";
import foods from "./foods.json";
import FoodBox from "./components/FoodBox";
import AddFoodForm from "./components/AddFoodForm";
import Search from "./components/Search";

const foodsJson = foods.slice();

function App() {
  const [foodData, setFoodData] = useState(foodsJson);
  const [foods, setFoods] = useState(foodsJson);

  function addFood(newFood) {
    setFoodData([...foodData, newFood]);
    setFoods([...foodData, newFood].sort((a, b) => a.name > b.name));
  }

  function checkCoincidences(searchInfo) {
    let searchResults = foodData.filter((food) => {
      return food.name.toLowerCase().includes(searchInfo.toLowerCase());
    });

    setFoods(searchResults);
  }

  function deleteFood(foodToDelete) {
    const newFoods = foods.filter((food) => {
      return food.name !== foodToDelete;
    });

    setFoods(newFoods);
  }

  function toggleForm() {
    document.getElementById("displayButton").classList.toggle("hidden");
    document.getElementById("hiddenForm").classList.toggle("hidden");
  }

  return (
    <div className="App">
      <h1>Search</h1>
      <div className="search-container">
      <Search checkCoincidences={checkCoincidences} />
      <button id="displayButton" onClick={toggleForm}>Search</button>
      </div>
      <h1>Add Food Entry</h1>
      <div className="addFoodBox-container">
        <AddFoodForm addFood={addFood} />
        <button onClick={toggleForm}>Hide form</button>
      </div>
      <h1>Food List</h1>
      <div className="foodBox-container">
        {foods.map((foodItem) => (
          <FoodBox key={foodItem.name} food={foodItem} />
        ))}
      </div>
    </div>
  );
}
export default App;
