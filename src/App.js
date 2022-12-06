import StartForm from './components/startForm'
import GameFild from './components/gameFild'
import Buttons from "./components/buttons";
import './App.css';
const score = 50;
function App() {
  return (<div className='App'>
    <StartForm/>
    <h1>Score: {score}</h1>
    <GameFild/>
    <Buttons/>
  </div> )
}

export default App;
