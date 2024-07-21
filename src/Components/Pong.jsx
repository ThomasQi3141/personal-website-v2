import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SunIcon from "../assets/sun.svg";
import MoonIcon from "../assets/moon.svg";

const Canvas = styled.canvas`
  background: ${(props) => (props.mainDarkMode ? "rgb(29, 30, 32)" : "white")};
  display: block;
  margin: 0 auto;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 3rem;
  right: 3rem;
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
`;

const ScoreWrapper = styled.div`
  position: absolute;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 2rem;
  font-size: 3rem;
  color: ${(props) => (props.mainDarkMode ? "white" : "rgb(29, 30, 32)")};
`;

const Score = styled.div`
  min-width: 5rem;
  text-align: center;
`;

const BrightnessButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  align-items: center;
  margin-top: 3rem;
  margin-left: 3rem;
`;

const BrightnessIcon = styled.img`
  width: 2rem;
  height: 2rem;
`;

const Pong = ({ textColor, mainDarkMode, toggleDarkMode }) => {
  const canvasRef = useRef(null);
  const keys = useRef({ w: false, s: false, ArrowUp: false, ArrowDown: false });
  const [paused, setPaused] = useState(true);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const navigate = useNavigate();
  const scoring = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const paddleWidth = 10,
      paddleHeight = 100,
      ballRadius = 10,
      playerSpeed = 10,
      ballSpeed = 12;

    let player1Y = (canvas.height - paddleHeight) / 2,
      player2Y = (canvas.height - paddleHeight) / 2,
      ballX = canvas.width / 2,
      ballY = canvas.height / 2,
      ballDX = ballSpeed,
      ballDY = ballSpeed;

    const drawNet = () => {
      ctx.setLineDash([15, 15]);
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.strokeStyle = mainDarkMode ? "white" : "rgb(29, 30, 32)";
      ctx.stroke();
      ctx.setLineDash([]);
    };

    const drawPaddle = (x, y) => {
      ctx.fillStyle = mainDarkMode ? "white" : "rgb(29, 30, 32)";
      ctx.fillRect(x, y, paddleWidth, paddleHeight);
    };

    const drawBall = () => {
      ctx.beginPath();
      ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = mainDarkMode ? "white" : "rgb(29, 30, 32)";
      ctx.fill();
      ctx.closePath();
    };

    const moveBall = () => {
      if (!paused) {
        ballX += ballDX;
        ballY += ballDY;

        if (
          ballY + ballDY > canvas.height - ballRadius ||
          ballY + ballDY < ballRadius
        ) {
          ballDY = -ballDY;
        }

        if (
          (ballX + ballDX < paddleWidth &&
            ballY > player1Y &&
            ballY < player1Y + paddleHeight) ||
          (ballX + ballDX > canvas.width - paddleWidth &&
            ballY > player2Y &&
            ballY < player2Y + paddleHeight)
        ) {
          ballDX = -ballDX;
        }

        if (ballX + ballDX < 0 && !scoring.current) {
          scoring.current = true;
          setPlayer2Score((prev) => prev + 1);
          resetBall();
        } else if (ballX + ballDX > canvas.width && !scoring.current) {
          scoring.current = true;
          setPlayer1Score((prev) => prev + 1);
          resetBall();
        }
      }
    };

    const resetBall = () => {
      ballX = canvas.width / 2;
      ballY = canvas.height / 2;
      ballDX = ballSpeed * (Math.random() > 0.5 ? 1 : -1);
      ballDY = ballSpeed * (Math.random() > 0.5 ? 1 : -1);
      setTimeout(() => {
        scoring.current = false;
      }, 500);
    };

    const movePaddles = () => {
      if (keys.current.w) {
        player1Y = Math.max(player1Y - playerSpeed, 0);
      }
      if (keys.current.s) {
        player1Y = Math.min(
          player1Y + playerSpeed,
          canvas.height - paddleHeight
        );
      }
      if (keys.current.ArrowUp) {
        player2Y = Math.max(player2Y - playerSpeed, 0);
      }
      if (keys.current.ArrowDown) {
        player2Y = Math.min(
          player2Y + playerSpeed,
          canvas.height - paddleHeight
        );
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawNet();
      drawPaddle(0, player1Y);
      drawPaddle(canvas.width - paddleWidth, player2Y);
      drawBall();
      moveBall();
      movePaddles();
      requestAnimationFrame(draw);
    };

    const keyDownHandler = (e) => {
      e.preventDefault();
      if (e.key in keys.current) {
        keys.current[e.key] = true;
      }
    };

    const keyUpHandler = (e) => {
      e.preventDefault();
      if (e.key in keys.current) {
        keys.current[e.key] = false;
      }
    };

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    draw();

    return () => {
      document.removeEventListener("keydown", keyDownHandler, false);
      document.removeEventListener("keyup", keyUpHandler, false);
    };
  }, [paused, mainDarkMode]);

  const handleStart = () => {
    setPaused(false);
  };

  const handleReset = () => {
    setPaused(true);
    setPlayer1Score(0);
    setPlayer2Score(0);
    scoring.current = false;
  };

  return (
    <>
      <BrightnessButton onClick={toggleDarkMode}>
        <BrightnessIcon
          src={mainDarkMode ? SunIcon : MoonIcon}
          alt={mainDarkMode ? "Light Mode" : "Dark Mode"}
        />
      </BrightnessButton>
      <ButtonWrapper>
        <Button onClick={paused ? handleStart : handleReset}>
          {paused ? "Start" : "Reset"}
        </Button>
        <Button onClick={() => navigate("/")}>Back</Button>
      </ButtonWrapper>
      <ScoreWrapper mainDarkMode={mainDarkMode}>
        <Score>{player1Score}</Score>
        <Score>{player2Score}</Score>
      </ScoreWrapper>
      <Canvas ref={canvasRef} mainDarkMode={mainDarkMode} />
    </>
  );
};

export default Pong;
