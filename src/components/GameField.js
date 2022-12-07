import '../styles/gameFild.css'
import React from "react";
import foodManager from "../managers/FoodManager";
import snakeManager from "../managers/SnakeManager";
import config from "../config";


export default class GameField extends React.Component{
    constructor(props) {
        super(props);
        this.state = {snakeBody: snakeManager.body};
        this.BOARD_SIZE = config.BOARD_SIZE;
        this.BOARD = Array(this.BOARD_SIZE).fill(Array(this.BOARD_SIZE).fill(0))
    }


    componentDidMount() {
        foodManager.addNextFood()
        this.gameLoop()
    }


    gameLoop = () => {
        const {isStarted, isPaused, setScoreF, gameOverF} = this.props;
        if(isStarted && !isPaused){
            const newBody = snakeManager.move()
            if(newBody === 0) gameOverF();
            else {
                this.setState({snakeBody:newBody})
                setScoreF(snakeManager.score);
            }
        }
        setTimeout(this.gameLoop, 1000/snakeManager.speed)
    }


    render(){
        return(<div className='field'>
            {this.BOARD.map((row, indexR)=>
                (<div className='rows'>
                    {row.map((item,indexI)=>{
                        const pos = indexR*this.BOARD_SIZE+indexI
                        if (this.state.snakeBody.includes(pos)) return(<div className='items snake' id={pos}></div>)
                        if (foodManager.foodPositions.hasOwnProperty(pos)) return (<div className={`items ${foodManager.foodPositions[pos]}`} id={pos}></div>)
                        else return (<div className='items' id={pos}></div>)})}
                </div>)
            )}
        </div>)
    }

}