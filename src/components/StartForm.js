import '../styles/startForm.css'
import React from "react";

export default class StartForm extends React.Component{
   constructor(props) {
       super(props)
   }


    componentDidMount() {
       const username = localStorage.username;
       if(username) document.getElementsByClassName('username-input')[0].value = username
    }


    onClick = ()=>{
        const {startF} = this.props;
        const username = document.getElementsByClassName('username-input')[0].value;
        if(username.length < 3 || username.length > 15) alert("Username length must be between 3 and 15 charters")
        else {
            startF(username)
            localStorage.username = username
        }
    }



    render() {
        return (<div className='form-background'>
            <div className='form-content'>
                <h1>Snake game!)</h1>
                <h4>Please enter your username</h4>
                <input className='username-input' placeholder='Username' />
                <button className='start-button'
                        onClick={this.onClick}>Start!</button>
            </div>
        </div>)
    }



}