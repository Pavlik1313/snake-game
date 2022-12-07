import '../styles/buttons.css'
import snakeManager from "../managers/SnakeManager"


export default function Buttons (props){
    return(<div className='game-buttons'>
        <button className='pause-button' onClick={props.pauseF} >Pause</button>
        <div className='move-buttons'>
            <button className='up-button' onClick={
                ()=>{
                snakeManager.changeDirection('up')
            }}>ᐃ</button>

            <button className='right-button' onClick={
                ()=>{
                    snakeManager.changeDirection('right')
                }}>ᐅ</button>

            <button className='down-button' onClick={
                ()=>{
                    snakeManager.changeDirection('down')
                }}>ᐁ</button>

            <button className='left-button' onClick={
                ()=>{
                    snakeManager.changeDirection('left')
                }}>ᐊ</button>
        </div>
    </div>)
}