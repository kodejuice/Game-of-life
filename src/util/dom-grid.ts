/**
 * Biereagu Sochima Everton (@kodejuice)
 * (C) 2020
 */

import Vue from 'vue';
import ConwayGrid from './ConwayGrid';


interface GridComponent extends Vue {
    color_cell(i:number, j:number, active: boolean): void,
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

    *active_cells() {
        const {grid, color_cell} = this.component;
        const alive_cells = grid.alive();

        for (let cell_index of alive_cells) {
            yield grid.decode_index(cell_index);
        }
    }

    clear_grid(update_census = true) {
        if (!this.component) return not_set_err();
        const {grid, color_cell} = this.component;

        for (let [i, j] of this.active_cells()) {
            color_cell(i, j, false);
        }

        if (update_census) {
            grid.update_census(true);
        }
    }
}


function not_set_err() {
    alert("An error occured, Please refresh this page.");
}

export default DOMGrid;
