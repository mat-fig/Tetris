import './App.css';
import GridBoard from './components/GridBoard'
import NextBlock from './components/NextBlock';
import ScoreBoard from './components/ScoreBoard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">TETR0</h1>
      </header>
      <GridBoard color='5'/>
      <NextBlock/>
      <ScoreBoard/>
    </div>
  );
}

export default App;
