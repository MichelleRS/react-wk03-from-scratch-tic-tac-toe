import React from 'react';
import { useGameContext } from '../../context/GameContext.js';
import './GameMessage.css';

export default function GameMessage() {
  const { gameMessage } = useGameContext();
  return (
    <section className="game-message">
      <p>{gameMessage}</p>
    </section>
  );
}
