import React from 'react';

const GameBoard = ({ blueSquare, redSquare, superMode }) => {
  const superStyle = superMode ? { backgroundColor: 'gold' } : {};

  return (
    <div
      className="game-board"
      style={{ position: 'relative', width: '800px', height: '600px' }}
    >
      <div
        className="blue-square"
        style={{
          ...blueSquare,
          position: 'absolute',
          backgroundColor: 'blue',
        }}
      />
      <div
        className="red-square"
        style={{
          ...redSquare,
          position: 'absolute',
          backgroundColor: 'red',
        }}
      />
      <div
        className="super-mode-indicator"
        style={{
          position: 'absolute',
          top: '0',
          right: '0',
          padding: '5px',
          backgroundColor: 'black',
          color: 'white',
          ...superStyle,
        }}
      >
        {superMode ? 'SUPER MODE' : 'normal mode'}
      </div>
    </div>
  );
};

export default GameBoard;
