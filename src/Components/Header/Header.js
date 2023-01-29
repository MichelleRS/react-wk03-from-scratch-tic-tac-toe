import React from 'react';
import { useGameContext } from '../../context/GameContext.js';
import './Header.css';

export default function Header() {
  const { setBoard, setCurrentPlayer, setActive, setGameMessage } = useGameContext();

  function resetGame() {
    setActive(true);
    setBoard([
      { space: 0, content: '' },
      { space: 1, content: '' },
      { space: 2, content: '' },
      { space: 3, content: '' },
      { space: 4, content: '' },
      { space: 5, content: '' },
      { space: 6, content: '' },
      { space: 7, content: '' },
      { space: 8, content: '' },
    ]);
    setCurrentPlayer('X');
    setGameMessage("It's your turn, Player X");
  }

  return (
    <header>
      <h1>Tic-Tac-Toe</h1>
      <button onClick={resetGame}>New Game</button>
    </header>
  );
}
