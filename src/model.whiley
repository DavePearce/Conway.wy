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
 * Intialise the game in a window with given dimensions.  Since the width and 
 * height come from the Canvas properties, assume they are non-negative.
 */
public function init(uint width, uint height) -> (State r)
requires width > 0 && height > 0
ensures r.width == width
ensures r.height == height
ensures |r.cells| == r.width*r.height
ensures all {i in 0..|r.cells| | r.cells[i] == false}:
    return {
        cells: [false; width*height],
        width: width,
        height: height
    }


/**
 * Click event handler that toggles a square on or off.
 * Since the click locations are generated on the JavaScript side, they could be
 * anything.  However, we know that the State will be valid since it is only 
 * ever created and manipulated on the Whiley side.
 */
public function click(int x, int y, State s) -> (State r)
ensures s.height == r.height && s.width == r.width
ensures all {a in 0..s.width, b in 0..s.height | (a + b * s.width < |r.cells|) && (a != x || b != y) 
            <==> r.cells[a + b * s.width] == s.cells[a + b * s.width]}
ensures 0 <= x && x < s.width && 0 <= y && y < s.height ==>
            r.cells[x + y * s.width] == !s.cells[x + y * s.width]:
    // Check clicked location is within bounds.
    if x >= 0 && y >= 0 && x < s.width && y < s.height:
        int index = x + (y * s.width)
        s.cells[index] = !s.cells[index]
    //
    return s


/** Defines the rules for updating a single cell. */
public property updated_cell(int index, State s, bool out) where
    0 <= index && index < |s.cells| &&
    (out <==> (count_living((uint) index, s) == 3 
           || (s.cells[index] && count_living((uint) index,s) == 2)))


/**
 * Update the game based on the current arrangement of live cells.
 * This applies the three rules of Conway's game of life to either
 * kill cells or to create new cells.
 */
public function update(State state)-> (State r)
ensures all {j in 0..|r.cells| | updated_cell(j, state, r.cells[j]) }
ensures state.width == r.width && state.height == r.height:
    // Create copy of cells array
    bool[] ncells = state.cells
    // Iterate through all cells
    for y in 0..state.height
    where |ncells| == |state.cells|
    where all {j in 0..(y*state.width) | j < |ncells| && j >= 0 && ncells[j] == update_cell(j,state)}:
        for x in 0..state.width
        where |ncells| == |state.cells|
        where all {j in 0..(x + y*state.width)| j < |ncells| && j >= 0 && ncells[j] == update_cell(j,state)}:
            int i = x + y*state.width
            ncells[i] = update_cell(i, state)
    // Switch over new cells array
    state.cells = ncells
    // Done
    return state  


/** Calculate a cell update according to Conway's game of life rules. */
public function update_cell(int index, State state) -> (bool out)
requires index >= 0 && index < |state.cells|
ensures updated_cell(index, state, out):
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
 * Count the number of living cells surrounding a given cell on the board.
 * Since there are at most eight neighbouring cells for any given cell, the result can
 * be at most eight.  Cells on the edge of the board are assumed to be next to dead cells.
 */
public function count_living(uint index, State state) -> (uint r)
requires index < |state.cells|
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
 * Determine whether a given cell is alive or not.  This returns an integer for 
 * convenience when implementing the count_living function above.
 */
public function alive(int x, int y, State state) -> (uint r)
ensures (r == 0 || r == 1)
ensures r == 0 <==> (x < 0 || x >= state.width || y < 0 || y >= state.height || 
                     some {i in 0..|state.cells| | i == x + y*state.width && !state.cells[i]}):
    if x < 0 || x >= state.width || y < 0 || y >= state.height || !state.cells[x + y*state.width]:
        return 0
    else:
        return 1
