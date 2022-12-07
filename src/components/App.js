import React from "react";
import StartForm from './StartForm'
import GameField from './GameField'
import Buttons from "./Buttons";
import GameOverForm from "./GameOverForm";
import PauseForm from "./PauseForm";

import snakeManager from "../managers/SnakeManager";
import foodManager from "../managers/FoodManager";

import '../styles/App.css';


class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      gameIsStarted: false,
      gameIsPaused: false,
      gameIsOver: false,
      score: 0
    }
  }


  componentDidMount() {
    document.body.addEventListener('keydown', (event)=>{
      switch (event.code) {
          case('ArrowUp'): {
            snakeManager.changeDirection('up')
            break
          }
          case('ArrowDown'): {
            snakeManager.changeDirection('down')
            break
          }
        case('ArrowLeft'):{
          snakeManager.changeDirection('left')
          break
        }
        case('ArrowRight'):{
          snakeManager.changeDirection('right')
          break
        }
        case('Space'):{
          this.pause();
          break
        }
      }
    })
  }

  restart = () => {
    snakeManager.reset();
    foodManager.reset();
    this.setState({
      gameIsStarted: true,
      gameIsPaused: false,
      gameIsOver: false,
      score: 0
    })
  }
  start = (username) => {
    this.setState({
      username: username,
      gameIsStarted: true,
      gameIsPaused: false,
      gameIsOver: false,
      score: 0
    })
  }
  pause = () => {
    this.setState({
      ...this.state,
      gameIsPaused: !this.state.gameIsPaused
    })
  }

  setScore = (score) => {
    this.setState({
      ...this.state,
      score: score
    })
  }
  gameOver = () => {
    this.setState({
      ...this.state,
      gameIsStarted: false,
      gameIsOver: true
    })
  }
  render() {
    return (<div id='App'>
      {(this.state.username === '') ? (<StartForm startF={this.start}/>):''}
      {this.state.gameIsOver ? <GameOverForm username={this.state.username} score={this.state.score} restartF={this.restart}/> : ''}
      {this.state.gameIsPaused ? <PauseForm resumeF={this.pause}/> : ''}
      <h1 className='score-label'>Score: {`${this.state.score}`}</h1>
      <GameField isStarted={this.state.gameIsStarted} isPaused={this.state.gameIsPaused} gameOverF={this.gameOver} setScoreF={this.setScore}/>
      <Buttons pauseF={this.pause}/>
    </div> )
  }


}

export default App;
