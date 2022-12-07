import config from "../config";
import foodManager from "./FoodManager";

class SnakeManager {
    constructor() {
        this.boardSize = config.BOARD_SIZE;
        this.head = Math.floor(this.boardSize/2)*this.boardSize+Math.floor(this.boardSize/2)
        this.length = config.snake.START_LENGTH;
        this.body = [
            this.head,
            this.head+this.boardSize,
            this.head+2*this.boardSize
        ]
        this.direction = "up"
        this.nextDirection = "up"
        this.speed = config.snake.START_SPEED
        this.score = 0
    }
    reset(){
        this.head = Math.floor(this.boardSize/2)*this.boardSize+Math.floor(this.boardSize/2)
        this.length = config.snake.START_LENGTH;
        this.body = [
            this.head,
            this.head+this.boardSize,
            this.head+2*this.boardSize
        ]
        this.direction = "up"
        this.nextDirection = "up"
        this.speed = config.snake.START_SPEED
        this.score = 0
    }
    isSnakeOnThisPos(pos){
        return this.body.includes(pos)
    }
    getTimeToCrossBoard(){
        return 2000 * this.boardSize / this.speed;
    }
    changeDirection(newDirection){
        if(
            (newDirection === 'up' && this.direction === 'down')||
            (newDirection === 'down' && this.direction === 'up')||
            (newDirection === 'left' && this.direction === 'right')||
            (newDirection === 'right' && this.direction === 'left')
        ) return 0;
        else {
            this.nextDirection = newDirection;
            return 1;
        }
    }
    getNewHeadPos(){
        switch(this.nextDirection){
            case "up": {
                return (this.boardSize**2 + this.head - this.boardSize) % this.boardSize**2
            }
            case "down": {
                return (this.head + this.boardSize) % this.boardSize**2
            }
            case "right": {
                return Math.floor(this.head/this.boardSize)*this.boardSize + (this.head + 1) % this.boardSize
            }
            case "left": {
                return Math.floor(this.head/this.boardSize)*this.boardSize + (this.head - 1) % this.boardSize
            }
            default: {
                throw new Error(`Something went wrong with Snake.nextDirection: invalid value: ${this.nextDirection} `)
            }
        }
    }
    setNewSpeed(){
        const {snake:snakeConfig} = config;
        const {SPEED_INCREASE,START_SPEED, MAX_SPEED, SCORE_FOR_SPEED_INCREASE} = snakeConfig
        this.speed = Math.min(
            START_SPEED * SPEED_INCREASE**Math.floor(this.score/SCORE_FOR_SPEED_INCREASE),
            MAX_SPEED)
    }
    setNewLength(){
        const {snake:snakeConfig} = config;
        const {START_LENGTH, SCORE_FOR_LENGTH_GROWTH} = snakeConfig;
        this.length = Math.floor(this.score / SCORE_FOR_LENGTH_GROWTH) + START_LENGTH;
    }
    addNewHead(newHeadPos){
        this.head = newHeadPos;
        this.body.unshift(newHeadPos);
    }
    cutBody(){
        if (this.body.length > this.length){
            this.body = this.body.slice(0,this.length)
        }
    }
    move(){
        const newHead = this.getNewHeadPos();
        if (this.isSnakeOnThisPos(newHead)) return 0; //game over
        else{
            this.score += foodManager.tryToEat(newHead);
            this.addNewHead(newHead);
            this.setNewLength();
            this.cutBody();
            this.setNewSpeed();
            this.direction = this.nextDirection;
            return this.body
        }
    }
}


export default new SnakeManager();