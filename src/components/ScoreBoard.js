import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { pause, resume, restart } from "../actions"
/*
const ScoreBoard = (props) => {

    return (
        <div className='score-board'>
            <div>Score: {props.score}</div>
            <div>Level: 1</div>
            <button className="score-board-button" onClick={(e) => {}}>Play</button>
            <button className="score-board-button" onClick={(e) => {}}>Restart</button>
        </div>
    )

}
*/
export const ScoreBoard = (props) => {

    const dispatch = useDispatch()
    const game = useSelector((state) => state.game)
    const { score, isRunning, gameOver } = game

    return (
        <div className='score-board'>
            <div>Score: {score}</div>
            <div>Level: 1</div>
            <button 
                className="score-board-button" 
                onClick={(e) => {
                    if (gameOver) { return }
                    if (isRunning) { dispatch(pause()) } //will this work
                    else { dispatch(resume()) }
                }}
            >
                {isRunning ? 'Play' : 'Pause'}
            </button>
            <button 
                className="score-board-button" 
                onClick={(e) => {
                    dispatch(restart())
                }}
            >
                Restart
            </button>
        </div>
    )
}