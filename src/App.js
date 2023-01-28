import './App.css';
import Board from './Components/Board/Board.js';
import Header from './Components/Header/Header.js';

function App() {
  return (
    <div className="App">
      {/* header */}
      <Header />
      {/* board */}
      <Board />
    </div>
  );
}

export default App;
