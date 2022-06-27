import React from "react"
import { useSelector } from "react-redux"
import { shapes } from "../utils"
import GridSquare from "./GridSquare"

export default function NextBlock (props) {

    const nextShape = useSelector((state) => state.game.nextShape)
    
    const box = shapes[nextShape][0] 

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