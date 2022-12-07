import '../styles/pauseForm.css'


export default function PauseForm(props){
    return (<div className='form-background'>
        <div className='form-content'>
            <h1>Game paused</h1>
            <button className='resume-button' onClick={props.resumeF}>resume</button>
        </div>
    </div>)

}