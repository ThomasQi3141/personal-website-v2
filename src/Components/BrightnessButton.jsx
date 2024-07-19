import React, { useState } from "react";
import SunIcon from "../assets/sun.svg";
import MoonIcon from "../assets/moon.svg";
import "./BrightnessButton.css";

const BrightnessButton = ({ changeColor }) => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    changeColor(!darkMode);
  };

  return (
    <>
      <button className="brightness-button" onClick={toggleDarkMode}>
        <img
          src={darkMode ? SunIcon : MoonIcon}
          alt={darkMode ? "Light Mode" : "Dark Mode"}
          className="brightness-icon"
        />
      </button>
    </>
  );
};

export default BrightnessButton;
