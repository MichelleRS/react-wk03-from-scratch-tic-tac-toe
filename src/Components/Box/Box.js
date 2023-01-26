import React from 'react';
import './Box.css';
import { useGameContext } from '../../context/GameContext.js';

export default function Box() {
  // set a variable to get to handle click
  const { handleClick } = useGameContext();

  return (
    <div className="box" onClick={handleClick}>
      Box
    </div>
  );
}
