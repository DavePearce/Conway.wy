import uint from std::integer

/**
 * Define the board state with the requirement that the width and
 * height match the length of the cells array.
 */
public type State is {
    bool[] cells,
    uint width,
    uint height
} where |cells| == width * height && width > 0 && height > 0

/**
 * Intialise the game in a window with given dimensions.  Since the
 * width and height come from the Canvas properties, assume they are
 * non-negative.
 *
 */
public function init(uint width, uint height) -> (State r)
requires width >= 20
requires height >= 20
ensures r.width == width / 20
ensures r.height == height / 20
ensures |r.cells| == r.width*r.height
ensures all {i in 0..|r.cells| | r.cells[i] == false}:
    width = width / 20
    height = height / 20
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
 *
 * We give this a partial spec, saying what changes, but not spelling out the
 * details that everything else does not change.
 */
public function click(int x, int y, State s) -> (State r)
ensures s.height == r.height && s.width == r.width
ensures 0 <= x && x < s.width && 0 <= y && y < s.height ==> r.cells[x + y * s.width] == !s.cells[x + y * s.width]
ensures all {a in 0..s.width, b in 0..s.height | a != x || b != y <==> r.cells[a + b * s.width] == s.cells[a + b * s.width]}:
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

public function update(State state)-> (State r)
ensures all {j in 0..|r.cells| | r.cells[j] == update_cell(j, state)}
ensures state.width == r.width && state.height == r.height:
    // Create copy of cells array
    bool[] ncells = state.cells
    // Iterate through all cells
    for y in 0..state.height
    where |ncells| == |state.cells|
    where all {j in 0..(y*state.width) | j < |ncells| && j >= 0 && ncells[j] == update_cell(j, state)}:
        for x in 0..state.width
        where |ncells| == |state.cells|
        where all {j in 0..(x + y*state.width)| j < |ncells| && j >= 0 && ncells[j] == update_cell(j, state)}:
            int i = x + y*state.width
            ncells[i] = update_cell(i, state)
    // Switch over new cells array
    state.cells = ncells
    // Done
    return state  


/**
 * Updates a cell according to Conway's game of life rules
 */

public function update_cell(int index, State state) -> (bool out)
requires index >= 0 && index < |state.cells|
ensures out <==> count_living((uint) index, state) == 3 || (state.cells[index] && count_living((uint) index,state) == 2):
    uint count = count_living((uint) index, state)
    if state.cells[index]:
        switch count:
            case 0,1:
                // Any live cell with fewer than two live neighbours dies, 
                // as if caused by under-population.
                return false
            case 2,3:
                // Any live cell with two or three live neighbours lives
                // on to the next generation.
                return true
            case 4,5,6,7,8: 
                // Any live cell with more than three live neighbours dies, 
                // as if by overcrowding.
                return false
    else if count == 3:
        // Any dead cell with exactly three live neighbours 
        // becomes a live cell, as if by reproduction. 
        return true
    // Other dead cells remain dead
    return false

/**
 * Count the number of living cells surrounding a given cell on the
 * board.  Since there are at most eight neighbouring cells for any
 * given cell, the result can be at most eight.  Cells on the board
 * are assumed to be next to dead cells.
 */
public function count_living(uint index, State state) -> (uint r)
requires index < |state.cells|
// There are at most 8 neighbours
ensures r <= 8:
    int x = index % state.width
    int y = index / state.width
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
public function alive(int x, int y, State state) -> (uint r)
// Return is either zero or one
ensures (r == 0 || r == 1)
ensures x < 0 || x >= state.width || y < 0 || y >= state.height || some {i in 0..|state.cells| | i == x + y*state.width && !state.cells[i]} <==> r == 0:
    if x < 0 || x >= state.width || y < 0 || y >= state.height || !state.cells[x + y*state.width]:
        return 0
    else:
        return 1

