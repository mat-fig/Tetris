export const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}


//return the default grid
export const gridDefault = () => {
    const rows = 18
    const cols = 10
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