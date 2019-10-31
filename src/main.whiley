import std::ascii with string
import std::array
import uint from std::integer

import from_string from js::util
import Document, HTMLCanvasElement from w3c::dom
import CanvasRenderingContext2D from w3c::dom

/**
 * Define the board state.
 */
public type State is {
    bool[] cells,
    uint width,
    uint height
} where |cells| == width * height

function isAlive(int x, int y, State state) -> bool:
    return state.cells[x + (y*state.width)]

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
 * Update the game based on the current keyboard state.
 */
public export function update(State s)->State:
    //
    // Do nothing for now
    //
    return s

/**
 * Draw the current state of the game to a given canvas element.
 */
public export method draw(HTMLCanvasElement canvas, State state):
    CanvasRenderingContext2D ctx = canvas->getContext(from_string("2d"))
    // Light gray for box outline
    ctx->strokeStyle = from_string("#DDDDDD")
    //
    uint i = 0
    while i < state.width:
        uint j = 0
        while j < state.height:
            // Check whether cell alive or dead
            if isAlive(i,j,state):
                ctx->fillStyle = from_string("#000000")
            else:
                ctx->fillStyle = from_string("#FFFFFF")
            //
            ctx->fillRect(i*20,j*20,20,20) 
            ctx->strokeRect(i*20,j*20,20,20) 
            j = j + 1
        //
        i = i + 1
    // Done
