import React from 'react';
import boardData from '../../board-data.js';
import Box from '../Box/Box.js';
import './Board.css';

export default function Board() {
  return (
    <div className="board">
      {boardData.map((data) => (
        <Box key={data.space} />
      ))}
    </div>
  );
}
