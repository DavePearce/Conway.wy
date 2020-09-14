import HTMLCanvasElement from w3c::dom
import CanvasRenderingContext2D from w3c::dom

import model

/** 
 * Draw the current state of the game to a given canvas element.  This
 * is achieved by drawing a box for each cell which is either white or
 * black.
 */
public export method draw(HTMLCanvasElement canvas, model::State state):
    CanvasRenderingContext2D ctx = canvas->getContext("2d")
    // Light gray for box outline
    ctx->strokeStyle = "#DDDDDD"
    //
    for x in 0..state.width:
        for y in 0..state.height:
            // Check whether cell alive or dead
            if model::alive(x,y,state) == 1:
                ctx->fillStyle = "#000000"
            else:
                ctx->fillStyle = "#FFFFFF"
            //
            ctx->fillRect(x*20,y*20,20,20) 
            ctx->strokeRect(x*20,y*20,20,20) 
    // Done
