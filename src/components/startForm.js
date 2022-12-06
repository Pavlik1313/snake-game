import '../styles/startForm.css'
export default function startForm(){
    return (<div className='form-background'>
            <div className='start-form-content'>
                <h1>Snake game!)</h1>
                <h4>Please enter your username</h4>
                <input className='username-input' placeholder='Username'/>
                <button className='start-button'
                onClick={()=>{document.getElementsByClassName('form-background')[0].remove()}}>Start!</button>
            </div>
        </div>)

}