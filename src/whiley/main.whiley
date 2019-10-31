import uint from std::integer

import from_string from js::util
import HTMLCanvasElement from w3c::dom
import CanvasRenderingContext2D from w3c::dom

/**
 * Define the board state.
 */
public type State is {
    bool[] cells,
    uint width,
    uint height
} where |cells| == width * height

/**
 * Intialise the game in a window with given dimensions.
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
 * Event handler for click events which toggle a square on or off
 */
public export function click(uint x, uint y, State s) -> State
// Clicked location must be in bounds.
requires x < s.width && y < s.height:
    //
    int index = x + (y * s.width)
    s.cells[index] = !s.cells[index]
    //
    return s

/**
 * Update the game based on the current arrangement of live cells.
 * This applies the three rules of Conway's game of life to either
 * kill cells or to create new cells.
 */
public export function update(State state)->State:
    // Create copy of cells array
    bool[] ncells = state.cells
    // Iterate through all cells
    uint x = 0
    while x < state.width:
        uint y = 0
        while y < state.height:
            int c = count_living(x,y,state)
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
            y = y + 1
            //
        x = x + 1
    // Switch over new cells array
    state.cells = ncells
    // Done
    return state

function count_living(uint x, uint y, State state) -> (uint r)
// There are at most 8 neighbours
ensures r <= 8:
    //
    int count = alive(x-1,y-1,state)
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
function alive(int x, int y, State state) -> (int r)
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
    CanvasRenderingContext2D ctx = canvas->getContext(from_string("2d"))
    // Light gray for box outline
    ctx->strokeStyle = from_string("#DDDDDD")
    //
    uint x = 0
    while x < state.width:
        uint y = 0
        while y < state.height:
            // Check whether cell alive or dead
            if alive(x,y,state) == 1:
                ctx->fillStyle = from_string("#000000")
            else:
                ctx->fillStyle = from_string("#FFFFFF")
            //
            ctx->fillRect(x*20,y*20,20,20) 
            ctx->strokeRect(x*20,y*20,20,20) 
            y = y + 1
        //
        x = x + 1
    // Done
