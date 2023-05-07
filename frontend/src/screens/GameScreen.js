import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import GameBoard from '../components/GameBoard';
import Header from '../components/Header';
import { getScore, saveScore } from '../utils/score';
import { isLoggedIn } from '../utils/auth';

const GameScreen = () => {
  const history = useHistory();

  // State variabler for spillet
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timer, setTimer] = useState(60);
  const [gameStatus, setGameStatus] = useState('playing');
  const [blueSquare, setBlueSquare] = useState({ x: 0, y: 0, size: 50 });
  const [redSquare, setRedSquare] = useState({ x: 400, y: 300, size: 50 });
  const [superMode, setSuperMode] = useState(false);
  const [superCharge, setSuperCharge] = useState(true);
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(() => {
    if (!isLoggedIn()) {
      history.push('/login');
    }
  }, [history]);

  // Oppdater score og lagre i highscore-listen når spillet er over
  useEffect(() => {
    if (gameStatus === 'completed') {
      saveScore(score);
    }
  }, [gameStatus, score]);

  // Fjern den røde firkanten og legg til ny etter en tilfeldig tid
  useEffect(() => {
    const id = setInterval(() => {
      setRedSquare((prevSquare) => ({
        ...prevSquare,
        x: getRandomInt(0, 800 - prevSquare.size),
        y: getRandomInt(0, 600 - prevSquare.size),
      }));
    }, getRandomInt(2000, 5000));
    return () => clearInterval(id);
  }, []);

  // Sjekk kollisjon mellom blå og rød firkant
  useEffect(() => {
    const checkCollision = () => {
      const distance = Math.sqrt(
        (blueSquare.x - redSquare.x) ** 2 + (blueSquare.y - redSquare.y) ** 2
      );
      if (distance < (blueSquare.size + redSquare.size) / 2) {
        if (superMode) {
          setRedSquare({ ...redSquare, x: -100, y: -100 });
        } else {
          setLives((prevLives) => prevLives - 1);
          setBlueSquare((prevSquare) => ({
            ...prevSquare,
            x: getRandomInt(0, 800 - prevSquare.size),
            y: getRandomInt(0, 600 - prevSquare.size),
          }));
          if (lives === 1) {
            setGameStatus('completed');
          }
        }
      }
    };

    const id = setInterval(() => {
      checkCollision();
    }, 10);
    return () => clearInterval(id);
  }, [blueSquare, redSquare, lives, superMode]);

  // Start nedtelling av timer
  useEffect(() => {
    const id = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  // Oppdater score og superladning når blå firkant treffer kanten av skjermen
  useEffect(() => {
    const updateScore = () => {
      setScore((prevScore) => prevScore + 1);
      if (superCharge < 100) {
        setSuperCharge((prevCharge) => prevCharge + 1);
      }
    };
    const checkBoundary = () => {
      if (blueSquare.x <= 0 || blueSquare.x + blueSquare.size >= 800) {
        updateScore();
      }
      if (blueSquare.y <= 0 || blueSquare.y + blueSquare.size >= 600) {
        updateScore();
      }
    };

    const id = setInterval(() => {
      checkBoundary();
    }, 10);
    return () => clearInterval(id);
  }, [blueSquare]);

  // Oppdater supermodus når superladning er full
  useEffect(() => {
    if (superCharge === 100) {
      setSuperMode(true);
    } else {
      setSuperMode(false);
    }
  }, [superCharge]);

  const handleKeyDown = (event) => {
    const speed = superMode ? 20 : 10;
    switch (event.key) {
      case 'ArrowUp':
        setBlueSquare((prevSquare) => ({
          ...prevSquare,
          y: prevSquare.y - speed,
        }));
        break;
      case 'ArrowDown':
        setBlueSquare((prevSquare) => ({
          ...prevSquare,
          y: prevSquare.y + speed,
        }));
        break;
      case 'ArrowLeft':
        setBlueSquare((prevSquare) => ({
          ...prevSquare,
          x: prevSquare.x - speed,
        }));
        break;
      case 'ArrowRight':
        setBlueSquare((prevSquare) => ({
          ...prevSquare,
          x: prevSquare.x + speed,
        }));
        break;
      case ' ':
        if (superCharge === 100) {
          setSuperCharge(0);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div onKeyDown={handleKeyDown} tabIndex={0}>
      <Header score={score} lives={lives} timer={timer} />
      <GameBoard
        blueSquare={blueSquare}
        redSquare={redSquare}
        superMode={superMode}
      />
      {gameStatus === 'completed' && (
        <div className="overlay">
          <h2>Game Over</h2>
          <p>Your final score: {score}</p>
          <button onClick={() => history.push('/')}>Back to home</button>
        </div>
      )}
    </div>
  );
};

export default GameScreen;
