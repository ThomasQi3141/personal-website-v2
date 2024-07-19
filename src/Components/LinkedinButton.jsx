import React from "react";
import LinkedinDark from "../assets/linkedin_dark.svg";
import LinkedinLight from "../assets/linkedin_light.svg";
import "./LinkedinButton.css";

const EmailButton = ({ darkMode }) => {
  return (
    <a href={"https://www.linkedin.com/in/thomaszhaojieqi/"} target={"_blank"}>
      <img
        src={darkMode ? LinkedinLight : LinkedinDark}
        alt={"LinkedIn"}
        className="linkedin-button"
      />
    </a>
  );
};

export default EmailButton;
