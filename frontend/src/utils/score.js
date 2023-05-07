// score.js

const SCORE_KEY = 'redblue-highscore';

export const getScore = () => {
  const score = localStorage.getItem(SCORE_KEY);
  return score ? parseInt(score) : 0;
};

export const saveScore = (score) => {
  const highscore = getScore();
  if (score > highscore) {
    localStorage.setItem(SCORE_KEY, score);
  }
};
