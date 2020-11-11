/**
 * Biereagu Sochima Everton (@kodejuice)
 * (C) 2020
 */

import {random as R} from 'lodash';

import ConwayGrid from './ConwayGrid';
import ConwaySimulation from './ConwaySimulation';

interface GridComponent extends Vue {
    activate_cell(i:number, j:number, active?:boolean): void,
    grid: ConwayGrid
}


/**
 * DOM grid
 * will be used to manipulate grid cells in the DOM
 * via the grid component
 *
 * @class      DOMGrid (name)
 */
class DOMGrid {
    // this will be set when the <Grid> component is mounted
    // @see    /src/components/Grid/index.vue     @globalize_grid_component()
    public component!: GridComponent;

    // simulation class
    public simulation: ConwaySimulation;

    constructor() {
        // initialize simulation class with an instance of DOMGrid
        this.simulation = new ConwaySimulation(this);
    }


    /**
     * generator to return the indexes of cells
     * in the grid.
     */
    *cells_index(alive?: Set<string>): Generator<[number, number]> {
        const {grid, activate_cell} = this.component;
        const alive_cells = alive || grid.alive();

        for (let cell_index of alive_cells) {
            yield grid.decode_index(cell_index);
        }
    }

    /**
     * Initialize grid cells
     */
    init_grid() {
        if (!this.component) return this.not_set_err();
        const {grid, activate_cell} = this.component;

        const width = grid.width(), height = grid.height();
        const cells = width * height;

        let toCover = .4 * cells; // 40%
        while (toCover--) {
            const [i, j] = [R(0, height-1), R(0, width-1)]; // random grid index
            activate_cell(i, j);
        }
    }

    /**
     * clear the grid via DOM manipulation
     * using the refs provided by Vue.
     *
     */
    clear_grid() {
        if (!this.component) return this.not_set_err();
        const {grid, activate_cell} = this.component;

        for (let [i, j] of this.cells_index()) {
            activate_cell(i, j, false);
        }

        grid.update_census(true);
    }

    /**
     * Shuffle the grid cells.
     */
    shuffle_grid() {
        if (!this.component) return this.not_set_err();
        const {grid, activate_cell} = this.component;

        let alive_cells_len = grid.alive().size,
            width = grid.width(),
            height = grid.height();

        this.clear_grid();

        // populate grid with same number of active cells
        // as the just cleared grid
        const added = new Set<string>();
        while (alive_cells_len) {
            const [i, j] = [R(0, height-1), R(0, width-1)]; // random grid index
            const index = grid.encode_index(i, j);
            if (added.has(index)) continue;

            activate_cell(i, j);
            added.add(index);

            alive_cells_len -= 1;
        }

        grid.update_census();
    }

    not_set_err() {
        alert("An error occured, Please refresh this page.");
    }
}


export default DOMGrid;
