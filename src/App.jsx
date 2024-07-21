import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BrightnessButton from "./Components/BrightnessButton";
import Title from "./Components/Title";
import Body from "./Components/Body";
import ResumeLink from "./Components/ResumeLink";
import ResumePDF from "./assets/Resume.pdf";
import Footer from "./Components/Footer";
import EmailButton from "./Components/EmailButton";
import ButtonsWrapper from "./Components/ButtonsWrapper";
import GithubButton from "./Components/GithubButton";
import LinkedinButton from "./Components/LinkedinButton";
import PongButton from "./Components/PongButton";
import Pong from "./Components/Pong";
import "./App.css";

const App = () => {
  const [textColor, setTextColor] = useState("white");
  const [mainDarkMode, setMainDarkMode] = useState(true);
  const [resumeLinkColor, setResumeLinkColor] = useState("rgb(179, 136, 245)");

  const changeColor = (darkMode) => {
    if (darkMode) {
      setTextColor("white");
      setResumeLinkColor("rgb(179, 136, 245)");
    } else {
      setTextColor("rgb(29, 30, 32)");
      setResumeLinkColor("rgb(75, 149, 231)");
    }
    setMainDarkMode(darkMode);
  };

  useEffect(() => {
    if (mainDarkMode) {
      document.documentElement.style.setProperty(
        "--main-color",
        "rgb(29, 30, 32)"
      );
      setTextColor("white");
    } else {
      document.documentElement.style.setProperty("--main-color", "white");
      setTextColor("rgb(29, 30, 32)");
    }
  }, [mainDarkMode]);

  return (
    <Router>
      <Routes>
        <Route
          path="/pong"
          element={
            <Pong
              textColor={textColor}
              mainDarkMode={mainDarkMode}
              toggleDarkMode={() => {
                setMainDarkMode(!mainDarkMode);
              }}
            />
          }
        />
        <Route
          path="/"
          element={
            <>
              <BrightnessButton
                changeColor={changeColor}
                darkMode={mainDarkMode}
              />
              <Title textColor={textColor}>Hey, I'm Thomas.</Title>
              <Body textColor={textColor}>
                I'm a second-year computer science student at the University of
                Waterloo, and an automation software developer at the student
                design team WARG. I have experience in full-stack development
                and DevOps, and a keen interest in machine learning. <br />
                <br /> This summer, I'm interning at Atomic Dev Inc., doing
                full-stack web development using React, Express, PHP, and MySQL.
                <br />
                <br />
                Here's my{" "}
                <ResumeLink textColor={resumeLinkColor} href={ResumePDF}>
                  Resume
                </ResumeLink>
                .<br />
                <br />
                Outside of school, you can find me yapping in the MC lounge,
                hitting the gym, or waiting in the Tims line for my iced coffee.
                <br />
                <br />
                Feel free to reach out to me through the links below :)
              </Body>
              <ButtonsWrapper>
                <EmailButton darkMode={mainDarkMode} />
                <GithubButton darkMode={mainDarkMode} />
                <LinkedinButton darkMode={mainDarkMode} />
              </ButtonsWrapper>
              <div className="pong-wrapper">
                <PongButton textColor={textColor} to="/pong">
                  Pong :D
                </PongButton>
              </div>
              <Footer textColor={textColor}>
                &copy; {new Date().getFullYear()} Thomas Qi. All rights
                reserved.
              </Footer>
            </>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
