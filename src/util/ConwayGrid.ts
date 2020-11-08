/**
 * Biereagu Sochima Everton (@kodejuice)
 * (C) 2020
 */

import {random} from 'lodash';

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


/**
 * Conways Game Of Life grid.
 *
 * @class      ConwayGrid
 * @extends    Matrix<boolean>
 * @author     (Biereagu Sochima <sochima.agu1@gmail.com>)
 */
class ConwayGrid extends Matrix<boolean> {
    generations: number = 0;
    private alive_cells: Set<string>;
    private cell_ids: Map<string, number>;
    private $scale_factor: SCALE = 2;

    constructor() {
        super(
            SCALES[2].cols, //width
            SCALES[2].rows, //height
            false,
        );

        this.alive_cells = new Set();
        this.cell_ids = new Map();
        this.$init_cell_ids();
    }

    /**
     * return alive cells set
     */
    alive() {
        return this.alive_cells;
    }


    /**
     * encode index of a cell in a grid as string "i:j"
     * @param {number} i row index
     * @param {number} j column index
     */
    encode_index(i:number, j: number) {
        return `${i}:${j}`;
    }

    /**
     * decodes the index from result
     *  of encode_index(...)
     *  @param {string} index
     */
    decode_index(index: string): [number, number] {
        const [i, j] = index.split(':');
        return [+i, +j];
    }

    /**
     * return unique id of a cell
     * @param {number} i row index
     * @param {number} j column index
     */
    cell_id(i:number, j:number) {
        return this.cell_ids.get(this.encode_index(i, j)) as number;
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
    update_census(clear = false) {
        if (clear) {
            this.alive_cells = new Set();
            this.generations = 0;
        } else {
            // this lets Vue know about changes in the sets
            this.alive_cells = new Set(this.alive_cells);
        }
    }


    update_active_cells(active: Set<string>) {
        this.alive_cells = active;
        this.generations += 1;
    }

    /**
     * Return the active next generation cells.
     *
     * This returns a set containing the indexes
     * of cells that are active in the next generation.
     *
     * @return     {Set<string>}    indexes of active cells in the next generation
     */
    next_generation(): Set<string> {
        const alive = this.alive();
        const next_gen = new Set<string>();

        for (let index of alive) {
            const [i, j] = this.decode_index(index);
            const n = this.live_neighbours(i, j);
            if (n==2 || n==3) {
                next_gen.add(index);
            }

            // visualize the grid as one of these:
            //    X _ _        X _ _
            //    O _ _   OR   _ O _
            //    _ _ _        _ _ _
            //
            // where X -> the position of this cell (current iteration)
            //       O -> cells which are neighbours of X
            //
            // we need to know if the cell `O` is dead and has 3 live neighbours
            // if it meets that criteria, then it makes it into the next generation
            //
            for (let cell_O of this.neighbours(i, j)) {
                const [ci, cj] = cell_O;
                if (this.get(ci,cj) == false) {
                    if (this.live_neighbours(ci, cj) == 3) {
                        next_gen.add(this.encode_index(ci, cj));
                    }
                }
            }
        }

        return next_gen;
    }



    /**
     * Return the neighbours of a cell
     *
     * @param      {number}  i       row index
     * @param      {number}  j       column index
     */
    private *neighbours(i:number, j:number): Generator<[number, number]> {
        const neighbours = [
            [i-1, j-1], [i-1, j], [i-1,j+1],
            [i,   j-1],           [i,  j+1],
            [i+1, j-1], [i+1, j], [i+1,j+1]
        ];
        for (let [r, c] of neighbours) {
            if (this.in_range(r, c)) {
                yield [r, c];
            }
        }
    }

    /**
     * Return the number of live/active neighbouring cells
     *  of a given cell index
     *
     * @param      {number}  i       row index
     * @param      {number}  j       column index
     * @return     {number}          number of live neighbouring cells
     */
    private live_neighbours(i: number, j: number): number {
        let live = 0;
        for (let [r,c] of this.neighbours(i, j)) {
            live += this.get(r, c) ? 1 : 0;
        }
        return live;
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

        let new_grid;
        new_grid = this.$set_width(cols);
        new_grid = this.$set_height(rows, new_grid);

        this.$update_grid(new_grid);
        this.$update_grid_stat();

        return this.$scale_factor = factor;
    }

    /**
     * resets population sets,
     * then go over each cell, check if the 
     * cell is dead/alive cells and update appropriate sets
     *
     * @param      {boolean}  check_cells   should we go over each cell?
     * @param      {boolean}  init_cell_ids initialize cell ids?
     */
    private $update_grid_stat(check_cells = true) {
        this.alive_cells = new Set();
        this.$init_cell_ids();

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
        const index = this.encode_index(i, j);
        if (this.get(i, j) == true) { // alive
            this.alive_cells.add(index);
        }
        else if (monitor_deaths) { // dead
            this.alive_cells.delete(index);
        }
    }

    /**
     * Initializes the cell identifiers.
     */
    private $init_cell_ids() {
        this.cell_ids.clear();

        for (let i=0; i<this.height(); ++i) {
            for (let j=0; j<this.width(); ++j) {
                this.cell_ids.set(this.encode_index(i,j), random(1,10e10,true));
            }
        }
    }
}

export default ConwayGrid;
