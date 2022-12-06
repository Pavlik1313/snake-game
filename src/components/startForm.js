import '../styles/startForm.css'
export default function startForm(){
    return (<div className='form-background'>
            <div className='start-form-content'>
                <h1>Welcome to the snake game!)</h1>
                <h4>Please enter your username</h4>
                <input className='username-input' placeholder='Username'/>
                <button className='start-button'>Start!</button>
            </div>
        </div>)

}