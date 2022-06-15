import React from 'react'
import GridSquard from './GridSquare'

const GridBoard = (props) => {
    //Grid is a 10 by 18 matrix
    const grid = []
    for (let i = 0; i < 18; i++){
        grid.push([])
        for (let j = 0; j < 10; j++){
            grid[i].push(<GridSquard key={`${i}${j}`} color='1' />)
        }
    }

    return (
        <div className='grid-board'>
            {grid}
        </div>
    )
}

export default GridBoard