import React from "react";
import GithubDark from "../assets/github_dark.svg";
import GithubLight from "../assets/github_light.svg";
import "./GithubButton.css";

const EmailButton = ({ darkMode }) => {
  return (
    <a href={"https://github.com/ThomasQi3141"} target={"_blank"}>
      <img
        src={darkMode ? GithubLight : GithubDark}
        alt={"Github"}
        className="github-button"
      />
    </a>
  );
};

export default EmailButton;
