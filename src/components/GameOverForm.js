import '../styles/gameOverForm.css'
import config from "../config";
import React from "react";
import axios from "axios";


export default class GameOverForm extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            score: props.score,
            bestScore: undefined,
            leaders: [],
        }
    }


    componentDidMount() {
        const {serverURL} = config;
        axios.post(`${serverURL}/add`,
            {
                name: this.props.username,
                score: this.state.score
            }).then(
            ()=>{
                axios.get(`${serverURL}/records/${this.props.username}`).then(
                    (res)=>{
                        this.setState({bestScore: res.data.score})
                    })
                axios.get(`${serverURL}/records`).then(
                    (res)=>{
                        this.setState({leaders: res.data})
                    })
            }
        )
    }


    render() {
        return (<div className='form-background'>
            <div className='game-over-form-content'>
                <h1>Game over...</h1>
                <h4>Your score: {this.props.score}</h4>
                <h4>Your best score: {this.state.bestScore}</h4>
                <div className='leaders-table-header'>
                    <h2 className='leaders-label'>Leaders:</h2>
                    <div className='leader-header-record'>
                        <div className='leader-rank'>Rang</div>
                        <div className='leader-name'>Name</div>
                        <div className='leader-score'>Score</div>
                    </div>
                </div>
                <div className='leaders-table'>
                    {this.state.leaders.map((leader, rank)=>(
                        <div className='leader-record'>
                            <div className='leader-rank'>{rank+1}</div>
                            <div className='leader-name'>{leader.name}</div>
                            <div className='leader-score'>{leader.score}</div>
                        </div>
                    ))}
                </div>
                <button className='play-button' onClick={this.props.restartF}>Play again</button>
            </div>
        </div>)
    }



}