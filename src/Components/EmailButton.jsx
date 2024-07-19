import React from "react";
import EnvelopeDark from "../assets/envelope_dark.svg";
import EnvelopeLight from "../assets/envelope_light.svg";
import "./EmailButton.css";

const EmailButton = ({ darkMode }) => {
  return (
    <a href={"mailto: t29qi@uwaterloo.ca"}>
      <img
        src={darkMode ? EnvelopeLight : EnvelopeDark}
        alt={"Email"}
        className="email-button"
      />
    </a>
  );
};

export default EmailButton;
