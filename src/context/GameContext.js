import { createContext, useContext, useEffect, useState } from 'react';
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
      setBoard(board);
    }
    // add checkGameStatus()
    // checkGameStatus(board);
  };

  const boardContent = [];
  for (let box of board) {
    boardContent.push(box.content);
  }

  // check game status
  const checkGameStatus = (board) => {
    if (!active) return;
    const winner = checkWinner(board);
    if (winner) {
      // add set game message
      setGameMessage(`Player ${winner} wins!!`);
      setActive(false);
    } else if (!boardContent.some((i) => i === '')) {
      // add set game message
      setGameMessage('No winner!');
    }
  };

  // if tie

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
        checkGameStatus,
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
  if (checkMatch(board[0].content, board[1].content, board[2].content)) return board[0].content;
  if (checkMatch(board[3].content, board[4].content, board[5].content)) return board[3].content;
  if (checkMatch(board[6].content, board[7].content, board[8].content)) return board[6].content;
  if (checkMatch(board[0].content, board[3].content, board[6].content)) return board[0].content;
  if (checkMatch(board[1].content, board[4].content, board[7].content)) return board[1].content;
  if (checkMatch(board[2].content, board[5].content, board[8].content)) return board[2].content;
  if (checkMatch(board[0].content, board[4].content, board[8].content)) return board[0].content;
  if (checkMatch(board[2].content, board[4].content, board[6].content)) return board[2].content;
};

const useGameContext = () => {
  const context = useContext(GameContext);
  // solve the extra click needed for a cat's game
  useEffect(() => {
    context.checkGameStatus(context.board);
  }, [context]);
  return context;
};

export { GameProvider, useGameContext };
