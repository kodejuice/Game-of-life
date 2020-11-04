/**
 * Biereagu Sochima Everton (@kodejuice)
 * (C) 2020
 */

import Matrix from './Matrix';

const SCALES = [
    { cols: 0,   rows: 0 },
    { cols: 150, rows: 80 },  //1
    { cols: 100, rows: 46 },  //2
    { cols: 50,  rows: 24 },  //3
    { cols: 25,  rows: 12 },  //4
    { cols: 20,  rows: 10 },  //5
    { cols: 10,  rows: 5 },   //6
    { cols: 5,   rows: 3 },   //7
];

type SCALE = 1 | 2 | 3 | 4 | 5 | 6 | 7;

/*
next_generation(): this
randomize(): this
 */


/**
 * Conways Game Of Life grid.
 *
 * @class      ConwayGrid
 * @extends    Matrix<true|false>
 * @author     (Biereagu Sochima <sochima.agu1@gmail.com>)
 */
class ConwayGrid extends Matrix<boolean> {
    private dead_cells: Set<string>;
    private alive_cells: Set<string>;
    private $scale_factor: SCALE = 2;

    constructor() {
        super(
            SCALES[2].cols, //width
            SCALES[2].rows, //height
            false,
        );

        this.dead_cells = new Set();
        this.alive_cells = new Set();
    }

    /**
     * return alive cells set
     */
    alive() {
        return this.alive_cells;
    }

    /**
     * return dead cells set
     */
    dead() {
        return this.dead_cells;
    }

    /**
     * return the index of a cell in a grid as string "i:j"
     * @param {number} i row index
     * @param {number} j column index
     */
    cell_index(i:number, j: number) {
        return `${i}:${j}`;
    }

    /**
     * set the value of a grid, then check
     *  if the cell is alive, update stat accordinly
     * 
     * @param {number}  i     row index
     * @param {number}  j     col index
     * @param {boolean} value cell value
     * @override super.set
     */
    set(i: number, j: number, value: boolean) {
        super.set(i, j, value);
        this.$monitor_cell_life(i, j);
    }

    /**
     * toggle cell value,
     *   true=>false, false=>true
     *
     * @param {number} i row index
     * @param {number} j column index
     */
    toggle(i:number, j:number) {
        var val = this.get(i, j);
        if (val) {
            this.set(i, j, false);
        } else {
            this.set(i, j, true);
        }
    }

    /**
     * scale up/down matrix
     *
     * @param {'up'|'down'} direction
     */
    scale(direction: 'up'|'down') {
        if (direction == 'up' && this.can_scale('up')) {
            this.$scale(this.$scale_factor + 1 as SCALE);
        }
        if (direction == 'down' && this.can_scale('down')) {
            this.$scale(this.$scale_factor - 1 as SCALE);
        }
        return this;
    }

    /**
     * Determines ability to scale.
     *
     * @param      {'up'|'down'}   direction  The direction
     * @return     {boolean}  True if able to scale, False otherwise.
     */
    can_scale(direction: 'up'|'down'): boolean {
        if (direction == 'up') return this.$scale() < SCALES.length-1;
        else return this.$scale() > 1;
    }

    /**
     * return currently applied scale factor
     * @return {SCALE}
     */
    scale_factor(): SCALE {
        return this.$scale_factor;
    }

    /**
     * update population sets, so vue can update dom accordinly
     */
    update_census() {
        // this lets Vue know about changes in the sets
        this.alive_cells = new Set(this.alive_cells);
        this.dead_cells = new Set(this.dead_cells);
    }

    /**
     * clears the grid
     */
    clear_grid() {
        this.clear();
        this.$update_grid_stat(false);
    }

    /**
     * scale grid, sets the height/width of grid
     * according to selected scale factor
     *
     * @param {SCALE} factor
     */
    private $scale(factor?: SCALE) {
        if (!factor) return this.$scale_factor;

        const {rows, cols} = SCALES[factor];
        this.$set_width(cols);
        this.$set_height(rows);

        this.$update_grid_stat();

        return this.$scale_factor = factor;
    }

    /**
     * resets population sets,
     * then go over each cell, check if the 
     * cell is dead/alive cells and update appropriate sets
     *
     * @param      {boolean}  check_cells  should we go over each cell?
     */
    private $update_grid_stat(check_cells = true) {
        this.alive_cells = new Set();
        this.dead_cells = new Set();
        if (!check_cells) return;

        for (let i=0; i<this.height(); ++i) {
            for (let j=0; j<this.width(); ++j) {
                this.$monitor_cell_life(i, j, false);
            }
        }
    }

    /**
     * check if a cell is dead or alive, then update population sets
     *
     * @param {number}  i                   row index
     * @param {number}  j                   column index
     * @param {boolean} monitor_deaths      should we update if its a dead cell? (dead_cells)
     */
    private $monitor_cell_life(i:number, j:number, monitor_deaths=true) {
        const index = this.cell_index(i, j);
        if (this.get(i, j) == true) { // alive
            this.alive_cells.add(index);
            this.dead_cells.delete(index);
        }
        else if (monitor_deaths) { // dead
            this.dead_cells.add(index);            
            this.alive_cells.delete(index);
        }
    }
}

export default ConwayGrid;
