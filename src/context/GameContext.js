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
    // check if space has an X or O
    if (!board[space].content) {
      // change box content to current player: X or O
      board[space] = { space: space, content: currentPlayer };
      // switch current player
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
    // check if game is over
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

const useGameContext = () => {
  const context = useContext(GameContext);
  return context;
};

export { GameProvider, useGameContext };
