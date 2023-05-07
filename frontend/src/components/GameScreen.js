import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getUser, saveGame } from '../utils/api';

const GameScreen = () => {
  const [gameStatus, setGameStatus] = useState('started');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [redSquare, setRedSquare] = useState({
    x: 50,
    y: 50,
    speed: 5,
    size: 50,
    direction: 'right',
  });
  const [blueSquare, setBlueSquare] = useState({
    x: 200,
    y: 200,
    size: 50,
  });
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [user, setUser] = useState(null);

  const history = useHistory();

  useEffect(() => {
    getUser().then((data) => setUser(data));
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
    setIntervalId(id);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (gameStatus === 'completed') {
      saveGame(user.id, timer, score, lives).then(() =>
        history.push('/gameover')
      );
    }
  }, [gameStatus, history, lives, score, timer, user]);

  useEffect(() => {
    const moveRedSquare = () => {
      const { x, y, speed, size, direction } = redSquare;
      let newX, newY;
      switch (direction) {
        case 'right':
          newX = x + speed;
          newY = y;
          if (newX > 800 - size) {
            newX = 800 - size;
            setRedSquare((prevSquare) => ({
              ...prevSquare,
              direction: 'down',
            }));
          }
          break;
        case 'down':
          newX = x;
          newY = y + speed;
          if (newY > 600 - size) {
            newY = 600 - size;
            setRedSquare((prevSquare) => ({
              ...prevSquare,
              direction: 'left',
            }));
          }
          break;
        case 'left':
          newX = x - speed;
          newY = y;
          if (newX < 0) {
            newX = 0;
            setRedSquare((prevSquare) => ({
              ...prevSquare,
              direction: 'up',
            }));
          }
          break;
        case 'up':
          newX = x;
          newY = y - speed;
          if (newY < 0) {
            newY = 0;
            setRedSquare((prevSquare) => ({
              ...prevSquare,
              direction: 'right',
            }));
          }
          break;
        default:
          break;
      }
      setRedSquare((prevSquare) => ({ ...prevSquare, x: newX, y: newY }));
    };

    const id = setInterval(moveRedSquare, getRandomInt(2000, 10000));
    return () => clearInterval(id);
  }, [redSquare]);

  useEffect(() => {
    const checkCollision = () => {
      const dx = blueSquare.x - redSquare.x;
      const dy = blueSquare.y - redSquare.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < (blueSquare.size + redSquare.size) / 2) {
        setLives((prevLives) => prevLives - 1);
        setBlueSquare((prevSquare) => ({
          ...prevSquare,
          x: getRandomInt(0, 800 - prevSquare.size),
          y: getRandomInt(0, 600 - prevSquare.size),
        }));
        if (lives === 1) {
          setGameStatus('completed');
        }
      } else {
        setScore((prevScore) => prevScore + 1);
      }
    };

    const id = setInterval(checkCollision, 10);
    return () => clearInterval(id);
  }, [blueSquare, lives, redSquare]);

  const handleKeyDown = (event) => {
    const { key } = event;
    let newX, newY;
    switch (key) {
      case 'ArrowUp':
        newX = blueSquare.x;
        newY = blueSquare.y - 10;
        if (newY < 0) {
          newY = 0;
        }
        break;
      case 'ArrowDown':
        newX = blueSquare.x;
        newY = blueSquare.y + 10;
        if (newY > 600 - blueSquare.size) {
          newY = 600 - blueSquare.size;
        }
        break;
      case 'ArrowLeft':
        newX = blueSquare.x - 10;
        newY = blueSquare.y;
        if (newX < 0) {
          newX = 0;
        }
        break;
      case 'ArrowRight':
        newX = blueSquare.x + 10;
        newY = blueSquare.y;
        if (newX > 800 - blueSquare.size) {
          newX = 800 - blueSquare.size;
        }
        break;
      default:
        break;
    }
    setBlueSquare((prevSquare) => ({ ...prevSquare, x: newX, y: newY }));
  };

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  return (
    <div className="game-screen" onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="red-square" style={redSquare} />
      <div className="blue-square" style={blueSquare} />
      <div className="game-info">
        <div className="score">Score: {score}</div>
        <div className="lives">Lives: {lives}</div>
        <div className="timer">Timer: {timer} s</div>
      </div>
    </div>
  );
};
export default GameScreen;

// eksport standard GameScreen;
// GameScreen-komponenten er en funksjonell komponent som representerer spillskjermen til Red Blue-spillet.
// UseState-kroken brukes til å definere tilstandsvariablene for spillstatus, poengsum, liv, rød firkantposisjon,
//blå firkant posisjon, tidtaker, intervall-ID og bruker.
// UseEffect-kroken brukes til å hente brukerdata fra API og starte timeren når komponenten monteres, og lagre
//spilldata til API når spillet er fullført.
// GetRandomInt-funksjonen er en verktøyfunksjon som returnerer et tilfeldig heltall mellom de angitte minimums- og maksimumsverdiene.
// HandleKeyDown-funksjonen er en tilbakeringingsfunksjon som oppdaterer posisjonen til den blå firkanten basert på piltasten trykket av brukeren.
// Return-setningen inneholder JSX-koden for spillskjermen, som består av den røde firkanten, den blå ruten, spillinfo (score, lives, timer),
// og hendelseslytter for piltastene.
