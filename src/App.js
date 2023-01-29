import './App.css';
import Board from './Components/Board/Board.js';
import Header from './Components/Header/Header.js';
import GameMessage from './Components/GameMessage/GameMessage.js';

function App() {
  return (
    <div className="App">
      {/* header */}
      <Header />
      {/* board */}
      <Board />
      {/* game message */}
      <GameMessage />
    </div>
  );
}

export default App;
