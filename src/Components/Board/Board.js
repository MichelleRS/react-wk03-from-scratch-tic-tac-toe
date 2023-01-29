import React from 'react';
import { useGameContext } from '../../context/GameContext.js';
import Box from '../Box/Box.js';
import './Board.css';

export default function Board() {
  const { board } = useGameContext();
  return (
    <div className="board">
      {board.map((data) => (
        // key into box and provide access to board data with space and content
        <Box key={data.space} space={data.space} content={data.content} />
      ))}
    </div>
  );
}
