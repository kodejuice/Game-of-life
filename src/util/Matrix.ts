
/*
alive()
dead()
get(i,j)
set(i,j)
unset(i,j)
toggle(i,j)
width()
height()

zoomIn()
zoomOut()
scale_factor()
 */

/**
 * Matrix used to manage the cells in the simulation.
 *
 * @class      Matrix
 */
class Matrix {
    private grid: number[][];
    private active_cells: Set<string>;
    private dead_cells: Set<string>;

    constructor(scale_factor: number) {
        
    }
}
