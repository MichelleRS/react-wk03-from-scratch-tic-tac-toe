import { createContext, useContext, useState } from 'react';
import boardData from '../board-data.js';

const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [board, setBoard] = useState(boardData);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [active, setActive] = useState(true);
  const [gameMessage, setGameMessage] = useState('');

  const handleClick = (space) => {
    // add logic:
    // check if game is over
    if (!active) return;
    // check if space has an X or O
    if (!board[space].content) {
      // change box content to current player: X or O
      board[space] = { space: space, content: currentPlayer };
      // switch current player
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      // check if winner
      checkWinner(board);
    }
    // return content to Box
  };

  return (
    <GameContext.Provider
      value={{
        board,
        setBoard,
        currentPlayer,
        setCurrentPlayer,
        active,
        setActive,
        gameMessage,
        setGameMessage,
        handleClick,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

// check for a match of 3
const checkMatch = (a, b, c) => {
  if (!a || !b || !c) return false;
  if (a === b && b === c) return true;
};
// check for winner
const checkWinner = (board) => {
  if (checkMatch(board[0].content, board[1].content, board[2].content));
  if (checkMatch(board[3].content, board[4].content, board[5].content));
  if (checkMatch(board[6].content, board[7].content, board[8].content));
  if (checkMatch(board[0].content, board[3].content, board[6].content));
  if (checkMatch(board[1].content, board[4].content, board[7].content));
  if (checkMatch(board[2].content, board[5].content, board[8].content));
  if (checkMatch(board[0].content, board[4].content, board[8].content));
  if (checkMatch(board[2].content, board[4].content, board[6].content));
};

const useGameContext = () => {
  const context = useContext(GameContext);
  return context;
};

export { GameProvider, useGameContext };
