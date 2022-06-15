import React from "react"
import GridSquare from "./GridSquare"

const NextBlock = (props) => {

    const box = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]]

    const grid = box.map((rows, i) => {
        return rows.map((square, j) => {
            return (<GridSquare key={`${i}${j}`} color={square}/>)
        })
    })

    return (
        <div className="next-block">
            {grid}
        </div>
    )
}

export default NextBlock