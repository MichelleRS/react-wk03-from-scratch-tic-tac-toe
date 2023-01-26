import React from 'react';
import boardData from '../../board-data.js';
import Box from '../Box/Box.js';

export default function Board() {
  return (
    <div>
      {boardData.map((data) => (
        <Box key={data.space} />
      ))}
      ;
    </div>
  );
}
