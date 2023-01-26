import { createContext, useContext, useState } from 'react';
import boardData from '../board-data.js';

const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [board, setBoard] = useState(boardData);

  return <GameContext.Provider value={{ board, setBoard }}>{children}</GameContext.Provider>;
};

const useGameContext = () => {
  const context = useContext(GameContext);
  return context;
};

export { GameProvider, useGameContext };
