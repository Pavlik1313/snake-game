import '../styles/buttons.css'
export default function buttons (){
    return(<div className='game-buttons'>
        <div className='move-buttons'>
            <button className='up-button'>🢁</button>
            <button className='right-button'>🢂</button>
            <button className='down-button'>🢃</button>
            <button className='left-button'>🢀</button>
        </div>
        <button className='pause-button'>Pause</button>
    </div>)
}