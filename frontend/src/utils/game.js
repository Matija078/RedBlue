let redSquare;
let blueSquare;
let timerId;
let score = 0;
let lives = 3;
let gameStatus = 'started';

const getRedSquare = () => redSquare;

const getBlueSquare = () => blueSquare;

const setRedSquare = (newSquare) => {
  redSquare = newSquare;
};

const setBlueSquare = (newSquare) => {
  blueSquare = newSquare;
};

const getScore = () => score;

const incrementScore = () => {
  score += 1;
};

const getLives = () => lives;

const decrementLives = () => {
  lives -= 1;
};

const getGameStatus = () => gameStatus;

const setGameStatus = (status) => {
  gameStatus = status;
};

const startGame = () => {
  score = 0;
  lives = 3;
  gameStatus = 'started';
  moveRedSquare();
};

const stopGame = () => {
  clearTimeout(timerId);
  setGameStatus('stopped');
};

const moveRedSquare = () => {
  if (getGameStatus() === 'completed') {
    return;
  }

  const direction = Math.floor(Math.random() * 8);
  const speed = getRedSquare().speed;

  switch (direction) {
    case 0:
      getRedSquare().x += speed;
      break;
    case 1:
      getRedSquare().x += speed;
      getRedSquare().y += speed;
      break;
    case 2:
      getRedSquare().y += speed;
      break;
    case 3:
      getRedSquare().x -= speed;
      getRedSquare().y += speed;
      break;
    case 4:
      getRedSquare().x -= speed;
      break;
    case 5:
      getRedSquare().x -= speed;
      getRedSquare().y -= speed;
      break;
    case 6:
      getRedSquare().y -= speed;
      break;
    case 7:
      getRedSquare().x += speed;
      getRedSquare().y -= speed;
      break;
    default:
      break;
  }

  if (getRedSquare().x < 0 || getRedSquare().x > window.innerWidth) {
    getRedSquare().x = window.innerWidth / 2;
    getRedSquare().y = window.innerHeight / 2;
  }

  if (getRedSquare().y < 0 || getRedSquare().y > window.innerHeight) {
    getRedSquare().x = window.innerWidth / 2;
    getRedSquare().y = window.innerHeight / 2;
  }

  timerId = setTimeout(moveRedSquare, getRedSquare().duration);
};

export {
  getRedSquare,
  getBlueSquare,
  setRedSquare,
  setBlueSquare,
  getScore,
  incrementScore,
  getLives,
  decrementLives,
  getGameStatus,
  setGameStatus,
  startGame,
  stopGame,
};
// Game.js-filen definerer flere funksjoner og variabler som styrer tilstanden til spillet i frontend.
// Variablene redSquare og blueSquare representerer henholdsvis de røde og blå rutene i spillet.
// TimerId-variabelen representerer ID-en til tidtakeren som kontrollerer bevegelsen til den røde firkanten.
// Score- og livvariablene representerer henholdsvis gjeldende poengsum og antall liv.
// GameStatus-variabelen representerer gjeldende status for spillet (startet, stoppet,
