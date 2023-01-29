import { createContext, useContext, useEffect, useState } from 'react';
import boardData from '../board-data.js';

const GameContext = createContext();

const GameProvider = ({ children }) => {
  const [board, setBoard] = useState(boardData);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [active, setActive] = useState(true);
  const [gameMessage, setGameMessage] = useState(`It's your turn, Player ${currentPlayer}`);

  const handleClick = (space) => {
    // add logic:
    // check if game is over - if active has been set to false, stop click logic
    if (!active) return;
    // check if space has an X or O - if no content is in space
    if (!board[space].content) {
      // change box content to current player: X or O
      board[space] = { space: space, content: currentPlayer };
      // switch current player
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      // show turn message
      yourTurnMessage();
      // check if winner
      checkWinner(board);
      //  TODO: not affecting game functionality - investigate if this is necessary
      setBoard(board);
    }
  };

  // push board content into an array to use in check game status
  const boardContent = [];
  for (let box of board) {
    boardContent.push(box.content);
  }

  // check game status
  const checkGameStatus = (board) => {
    // check if game is over - if active has been set to false, stop click logic
    if (!active) return;
    const winner = checkWinner(board);
    if (winner) {
      // add set game message
      setGameMessage(`Player ${winner} wins!!`);
      // setActive to false to end gameplay in handleClick
      setActive(false);
      // if none of the board content has an empty space
    } else if (!boardContent.some((i) => i === '')) {
      // add set game message
      setGameMessage('No winner!');
    }
  };

  // set current player message
  const yourTurnMessage = () => {
    if (currentPlayer === 'O') {
      setGameMessage("It's your turn, Player X");
    } else if (currentPlayer === 'X') {
      setGameMessage("It's your turn, Player O");
    }
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
        checkGameStatus,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

// create a function to pass winning combos into
const checkMatch = (a, b, c) => {
  // if one or more of the boxes do not have content, don't return a match (false)
  if (!a || !b || !c) return false;
  // another way - check if all spaces have content, otherwise return false
  // if (a && b && c) return false;

  // if there is content and all are equal, return a match (true)
  if (a === b && b === c) return true;
};

// check for winner
const checkWinner = (board) => {
  // pass winning combinations into check match
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
