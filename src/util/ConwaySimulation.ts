/**
 * Biereagu Sochima Everton (@kodejuice)
 * (C) 2020
 */

import {isEqual} from 'lodash';

import ConwayGrid from './ConwayGrid';
import {requestAnimationFrame} from './requestAnimationFrame';

interface GridComponent extends Vue {
    activate_cell(i:number, j:number, active?:boolean): void,
    grid: ConwayGrid
}

interface DOMGrid {
    clear_grid(): void,
    not_set_err(): void,
    component: GridComponent,
    cells_index(alive?: Set<string>): Generator<[number, number]>,
}


/**
 * This class will be used to moderate the Game Of Life simulation.
 *  play / pause / set speed 
 *
 * @class      ConwaySimulation
 * @requires   DOMGrid
 */
class ConwaySimulation {
    public dom_grid: DOMGrid;

    /**
     * used to control the simulation,
     * directly manipulates the <Control> component state
     *
     * @see   /src/components/Control/index.vue  @mounted
     * @type  (running: boolean)=>void
     */
    public play_pause!: (running: boolean)=>void;

    /**
     * used to show toast notifications to the user
     *
     * @see   /src/App.vue  @mounted
     */
    public showToast!: (message: string, delay: number, type?: 'error')=>void;

    // simulation running state
    private running: boolean = false;

    // simulation speed
    private fps: number = 7.5;

    constructor(grid_instance: DOMGrid) {
        this.dom_grid = grid_instance;

        this.initialize_animation();
    }

    run() {
        this.running = true;
        this.play_pause(true); // sync w/ component
    }

    stop() {
        this.running = false;
        this.play_pause(false); // sync w/ component
    }

    /**
     * advance the conway grid to next generation
     * applies update to the DOM
     *
     * @return {boolean}  still-life detected?, is there any difference between current & next generation
     */
    advance_to_next_generation(): boolean {
        const dom_grid = this.dom_grid;
        if (!dom_grid.component) return dom_grid.not_set_err(), false;

        const {grid, activate_cell} = dom_grid.component;

        const active = new Set(grid.alive()); // a copy of the current active cells
        const next_gen = grid.next_generation();
        if (isEqual(active, next_gen)) {
            // no changes, a still-life configuration
            this.showToast('Still life detected', 1900);
            return false;
        }

        // will store new active cells that werent already active
        // in the previous generation
        const new_active_cells: typeof next_gen = new Set();

        for (let index of next_gen) {
            if (active.has(index)) {
                active.delete(index);
            } else {
                new_active_cells.add(index);
            }
        }

        // activate new active cells in the new generation
        for (let [i,j] of dom_grid.cells_index(new_active_cells)) {
            activate_cell(i, j, true);
        }

        // anything remaining in the `active` set now is a dead cell,
        // because we've deleted all new active cells from the set
        for (let [i,j] of dom_grid.cells_index(active)) {
            activate_cell(i, j, false);
        }

        grid.update_active_cells(next_gen);

        return true;
    }


    initialize_animation() {
        let now,
            elapsed,
            then = window.performance.now();

        const that = this;

        function animate() {
            requestAnimationFrame(animate.bind(that));

            let fpsInterval = 1000 / that.fps;

            // calculate elapsed time since last loop/frame
            now = window.performance.now();
            elapsed = now - then;

            // enough time has elapsed, draw next frame
            if (elapsed > fpsInterval) {
                then = now - (elapsed % fpsInterval);

                // draw next frame
                draw.bind(that)();
            }
        }

        function draw() {
            if (that.running) {
                const r = that.advance_to_next_generation();
                if (!r) {
                    // no change occured, stop animation (still-life detected)
                    // TODO: notify user
                    that.stop();
                }
            }
        }

        animate.bind(that)();
    }

}


export default ConwaySimulation;
