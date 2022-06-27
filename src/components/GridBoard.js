import React, { useEffect, useRef } from 'react'
import GridSquare from './GridSquare'
import { useSelector, useDispatch } from 'react-redux'
import { shapes } from '../utils'
import { moveDown } from '../actions'

export default function GridBoard (props)  {

    //hold the reference to requesAnimationframe
    const requestRef = useRef()

    //track time of last update
    const lastUpdateTimeRef = useRef(0)

    //track total time
    const progressTimeRef = useRef(0)

    const dispatch = useDispatch()

    const update = (time) => {
        requestRef.current = requestAnimationFrame(update)

        if (isRunning){
            return
        }

        if (!lastUpdateTimeRef.current) {
            lastUpdateTimeRef.current = time
        }

        const deltaTime = time - lastUpdateTimeRef.current
        progressTimeRef.current += deltaTime

        if (progressTimeRef.current > speed){
            dispatch(moveDown())
            progressTimeRef.current = 0
        }

        lastUpdateTimeRef.current = time
    }

    //Grid is a 10 by 18 matrix
    const game = useSelector((state) => state.game)
    const { grid, shape, rotation, x, y, isRunning, speed } = game

    //Next block generated
    const block = shapes[shape][rotation]

    //Color of the next block
    const blockColor = shape


    useEffect(() => {
        requestRef.current = requestAnimationFrame(update)
        return () => cancelAnimationFrame(requestRef.current)
    }, [isRunning])

    return (
        <div className='grid-board'>
            {
                grid.map((item, i) => {
                    return item.map((square, j) => { 
                        const blockX = j - x
                        const blockY = i - y
                        let color = square
                        if (blockX >= 0 && blockX < block.length && blockY >= 0 && blockY < block.length) {
                            color = block[blockY][blockX] === 0 ? color : blockColor
                        }

                        const k = i * grid[0].length + j;




                        return (<GridSquare key={k} color={color} />)
                    })
                })
            }
        </div>
    )
}
