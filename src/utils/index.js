export const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

//return the default grid
export const gridDefault = () => {
    const matrix = []

    for (let i = 0; i < 18; i++){
        let row = []
        for (let j = 0; j < 10; j++){
            row.push(0)
        }
        matrix.push(row)
    }

    return matrix
}

// Define block shapes and their rotations as arrays.
export const shapes = [
    // none
    [[[0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0]]],
  
    // I
    [[[0,0,0,0],
      [1,1,1,1],
      [0,0,0,0],
      [0,0,0,0]],
  
     [[0,1,0,0],
      [0,1,0,0],
      [0,1,0,0],
      [0,1,0,0]]],
  
    // T
    [[[0,0,0,0],
      [1,1,1,0],
      [0,1,0,0],
      [0,0,0,0]],
  
     [[0,1,0,0],
      [1,1,0,0],
      [0,1,0,0],
      [0,0,0,0]],
  
     [[0,1,0,0],
      [1,1,1,0],
      [0,0,0,0],
      [0,0,0,0]],
  
     [[0,1,0,0],
      [0,1,1,0],
      [0,1,0,0],
      [0,0,0,0]]],
  
    // L
    [[[0,0,0,0],
      [1,1,1,0],
      [1,0,0,0],
      [0,0,0,0]],
  
     [[1,1,0,0],
      [0,1,0,0],
      [0,1,0,0],
      [0,0,0,0]],
  
     [[0,0,1,0],
      [1,1,1,0],
      [0,0,0,0],
      [0,0,0,0]],
  
     [[0,1,0,0],
      [0,1,0,0],
      [0,1,1,0],
      [0,0,0,0]]],
  
    // J
    [[[1,0,0,0],
      [1,1,1,0],
      [0,0,0,0],
      [0,0,0,0]],
  
     [[0,1,1,0],
      [0,1,0,0],
      [0,1,0,0],
      [0,0,0,0]],
  
     [[0,0,0,0],
      [1,1,1,0],
      [0,0,1,0],
      [0,0,0,0]],
  
     [[0,1,0,0],
      [0,1,0,0],
      [1,1,0,0],
      [0,0,0,0]]],
  
    // Z
    [[[0,0,0,0],
      [1,1,0,0],
      [0,1,1,0],
      [0,0,0,0]],
  
     [[0,0,1,0],
      [0,1,1,0],
      [0,1,0,0],
      [0,0,0,0]]],
  
    // S
    [[[0,0,0,0],
      [0,1,1,0],
      [1,1,0,0],
      [0,0,0,0]],
  
     [[0,1,0,0],
      [0,1,1,0],
      [0,0,1,0],
      [0,0,0,0]]],
  
    // O
    [[[0,1,1,0],
      [0,1,1,0],
      [0,0,0,0],
      [0,0,0,0]]]
]

//Generate a random shape 
export const randomShape = () => {
    return random(1, shapes.length - 1)
}

//return default state for the game play
export const defaultState = () => {
    return {
        //Begin with the empty grid 
        grid: gridDefault(),

        //Get some random shape 
        shape: randomShape(),

        //Set the rotation to 0
        rotation: 0,

        /*set the (x,y) coordinate position to (5,-4) to place the 
        generated block in the middle */
        x: 5,
        y: -4,

        //process the next shape at random
        nextShape: randomShape(),

        //Truthy value if the game is paused or not
        isRunning: true,

        //Keep score 
        score: 0,

        //set the speed
        speed: 1000,

        //Truthy value for ending game
        gameOver: false
    }
}

//Handle next rotation
export const nextRotation = (shape, rotation) => {
  return (rotation + 1) % shapes[shape].length
}

export const canMoveTo = (shape, grid, x, y, rotation) => {
  const currentShape = shapes[shape][rotation]
  console.log(currentShape)
  // Loop through all rows and cols of the **shape**
  for (let row = 0; row < currentShape.length; row++) {
      for (let col = 0; col < currentShape[row].length; col++) {
          // Look for a 1 here
          if (currentShape[row][col] !== 0) {
              // x offset on grid
              const proposedX = col + x
              // y offset on grid
              const proposedY = row + y
              if (proposedY < 0) {
                  continue
              }
              // Get the row on the grid
              const possibleRow = grid[proposedY]
              // Check row exists
              if (possibleRow) {
                  // Check if this column in the row is undefined, if it's off the edges, 0, and empty
                  if (possibleRow[proposedX] === undefined || possibleRow[proposedX] !== 0) {
                      // undefined or not 0 and it's occupied we can't move here.
                      return false
                  }
              } else {
                  return false
              }
          }
      }
  }
  return true
}

export const addBlockToGrid = (shape, grid, x, y, rotation) => {
  //get the current block
  const block = shapes[shape][rotation]

  //make a copy of the current grid
  const newGrid = [...grid]

  // Map the Block onto the grid                                                           
  for (let row = 0; row < block.length; row++) {
    for (let col = 0; col < block[row].length; col++) {
        if (block[row][col]) {
            newGrid[row + y][col + x] = shape;
        }
    }
  }
  return newGrid;
}

// Checks for completed rows and scores points
export const checkRows = (grid) => {
  // Points increase for each row completed
  // i.e. 40 points for completing one row, 100 points for two rows
  const points = [0, 40, 100, 300, 1200]
  let completedRows = 0
  for (let row = 0; row < grid.length; row++) {
    // No empty cells means it can't find a 0, so the row must be complete!
    if (grid[row].indexOf(0) === -1) {
      completedRows += 1
      // Remove the row and add a new empty one at the top
      grid.splice(row, 1)
      grid.unshift(Array(10).fill(0))
    }
  }
  return points[completedRows]
}