import uint from std::integer

import HTMLCanvasElement from w3c::dom
import CanvasRenderingContext2D from w3c::dom

/**
 * Define the board state with the requirement that the width and
 * height match the length of the cells array.
 */
public type State is {
    bool[] cells,
    uint width,
    uint height
} where |cells| == width * height

/**
 * Intialise the game in a window with given dimensions.  Since the
 * width and height come from the Canvas properties, assume they are
 * non-negative.
 */
public export method init(uint width, uint height) -> State:
    //
    width = width / 20
    height = height / 20
    //
    return {
        cells: [false; width*height],
        width: width,
        height: height
    }

/**
 * Event handler for click events which toggle a square on or off.
 * Since this the click locations are generated on the JavaScript
 * side, I'll assume they could be anything.  However, assume
 * state is still valid since it's only ever created and manipulated
 * on the Whiley side.
 */
public export function click(int x, int y, State s) -> State:
    // Check clicked location is within bounds.
    if x >= 0 && y >= 0 && x < s.width && y < s.height:
        int index = x + (y * s.width)
        s.cells[index] = !s.cells[index]
    //
    return s

/**
 * Update the game based on the current arrangement of live cells.
 * This applies the three rules of Conway's game of life to either
 * kill cells or to create new cells.  Again, since state is only ever
 * created and manipulated on the Whiley side, assume it is valid.
 */
public export function update(State state)->State:
    // Create copy of cells array
    bool[] ncells = state.cells
    // Iterate through all cells
    for x in 0..state.width:
        for y in 0..state.height:
            int c = count_living((uint) x, (uint) y,state)
            int i = x + (state.width*y)
            // Check whether cell alive or dead
            if alive(x,y,state) == 1:
                switch c:
                    case 0,1:
                        // Any live cell with fewer than two live neighbours dies, 
                        // as if caused by under-population.
                        ncells[i] = false
                    case 2,3:
                        // Any live cell with two or three live neighbours lives
                        // on to the next generation.
                    case 4,5,6,7,8:
                        // Any live cell with more than three live neighbours dies, 
                        // as if by overcrowding.
                        ncells[i] = false
            else if c == 3:
                // Any dead cell with exactly three live neighbours 
                // becomes a live cell, as if by reproduction.
                ncells[i] = true
    // Switch over new cells array
    state.cells = ncells
    // Done
    return state

/**
 * Count the number of living cells surrounding a given cell on the
 * board.  Since there are at most eight neighbouring cells for any
 * given cell, the result can be at most eight.  Cells on the board
 * are assumed to be next to dead cells.
 */
function count_living(uint x, uint y, State state) -> (uint r)
// There are at most 8 neighbours
ensures r <= 8:
    //
    uint count = alive(x-1,y-1,state)
    count = count + alive(x-1,y,state)
    count = count + alive(x-1,y+1,state)
    count = count + alive(x,y-1,state)    
    count = count + alive(x,y+1,state)
    count = count + alive(x+1,y-1,state)
    count = count + alive(x+1,y,state)
    count = count + alive(x+1,y+1,state)
    return count

/**
 * Determine whether a given cell is alive or not.  This returns an
 * integer for convenience when implementing the count_living function
 * above.
 */
function alive(int x, int y, State state) -> (uint r)
// Return is either zero or one
ensures (r == 0) || (r == 1):
    //
    if x < 0 || x >= state.width:
        return 0
    else if y < 0 || y >= state.height:
        return 0
    else if state.cells[x + (y*state.width)]:
        return 1
    else:
        return 0

/** 
 * Draw the current state of the game to a given canvas element.  This
 * is achieved by drawing a box for each cell which is either white or
 * black.
 */
public export method draw(HTMLCanvasElement canvas, State state):
    CanvasRenderingContext2D ctx = canvas->getContext("2d")
    // Light gray for box outline
    ctx->strokeStyle = "#DDDDDD"
    //
    for x in 0..state.width:
        for y in 0..state.height:
            // Check whether cell alive or dead
            if alive(x,y,state) == 1:
                ctx->fillStyle = "#000000"
            else:
                ctx->fillStyle = "#FFFFFF"
            //
            ctx->fillRect(x*20,y*20,20,20) 
            ctx->strokeRect(x*20,y*20,20,20) 
    // Done
