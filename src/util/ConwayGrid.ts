/**
 * Biereagu Sochima Everton (@kodejuice)
 * (C) 2020
 */

import Matrix from './Matrix';

const SCALES = [
    { cols: 0,   rows: 0 },
    { cols: 200, rows: 96 },  //1
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

    alive() {
        return this.alive_cells;
    }

    dead() {
        return this.dead_cells;
    }


    cell_index(i:number, j: number) {
        return `${i}:${j}`;
    }


    set(i: number, j: number, value: boolean) {
        super.set(i, j, value);
        this.monitor_cell_life(i, j);
    }

    toggle(i:number, j:number) {
        var val = this.get(i, j);
        if (val) {
            this.set(i, j, false);
        } else {
            this.set(i, j, true);
        }
    }

    scale(direction: 'up'|'down') {
        if (direction == 'up' && this.can_scale('up')) {
            this.$scale(this.$scale_factor + 1 as SCALE);
        }
        if (direction == 'down' && this.can_scale('down')) {
            this.$scale(this.$scale_factor - 1 as SCALE);
        }
        return this;
    }

    can_scale(direction: 'up'|'down'): boolean {
        if (direction == 'up') return this.$scale() < 7;
        else return this.$scale() > 0;
    }

    scale_factor(): SCALE {
        return this.$scale_factor;
    }

    private $scale(factor?: 1|2|3|4|5|6|7) {
        if (!factor) return this.$scale_factor;

        const {rows, cols} = SCALES[factor];
        this.set_width(cols);
        this.set_height(rows);

        // update population stat
        this.update_grid_stat();

        return this.$scale_factor = factor;
    }

    private update_grid_stat() {
        this.alive_cells = new Set();
        this.dead_cells = new Set();

        for (let i=0; i<this.height(); ++i) {
            for (let j=0; j<this.width(); ++j) {
                this.monitor_cell_life(i, j, false);
            }
        }
    }

    private monitor_cell_life(i:number, j:number, monitor_deaths=true) {
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
