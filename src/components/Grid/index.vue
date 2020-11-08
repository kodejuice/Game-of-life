
<template>
    <div
        class="grid"
        @mousedown="drag_start"
        @mouseup="drag_end"
    >
        <template v-for="i in grid.height()">
            <div class="row">
                <template v-for="j in grid.width()">
                    <cell
                        :key="grid.cell_id(i-1, j-1)"
                        :ref="grid.cell_id(i-1, j-1)"
                        :index="{i:i-1, j:j-1}"
                        :active="grid.get(i-1, j-1)"
                        :scale_factor="grid.scale_factor()"
                        :cell_color="color()"
                        @mouse_move="mousemove"
                    />
                </template>
            </div>
        </template>
    </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Cell from './Cell.vue';
import ConwayGrid from '../../util/ConwayGrid';
import {random_color} from './helper';
import W from '../../state';


@Component({
    components: {
        Cell,
    }
})
export default class Grid extends Vue {
    dragging: boolean = false;
    @Prop() grid!: ConwayGrid;
    @Prop() is_halted!: boolean;

    /**
     * globalize this grid component if this component is:
     *  @mounted
     *  @updated
     */
    mounted() { this.globalize_grid_component(); }
    updated() { this.globalize_grid_component(); }

    /**
     * @mouseup event handler
     */
    drag_start() {
        this.dragging = true;
    }
    /**
     * @mousedown event handler
     */
    drag_end() {
        this.dragging = false;
        this.on_draw_end();
    }

    /**
     * mousemove event
     * @param {Event}                ev
     * @param {boolean}              clicked    was the cell clicked?
     * @param {{i:number, j:number}} index      index of the cell
     */
    mousemove(ev: Event, clicked = false, index: {i:number, j:number}) {
        if ((!this.dragging && !clicked) || this.is_halted) return;

        const {i,j} = index;
        this.activate_cell(i, j);

        if (clicked) {
            this.on_draw_end();
        }
    }

    /**
     * return the color to apply to an active cell
     */
    color() {
        const {cell_color} = W.APP_STATE;
        if (cell_color == 'random') {
            return random_color();
        }
        return cell_color;
    }

    /**
     * make this component instance available in APP state
     */
    private globalize_grid_component() {
        // is this bad practice?
        W.APP_STATE.grid.component = this;
    }

    /**
     * activate/deactivate a cell
     * @param      {number}  i       row index
     * @param      {number}  j       column index
     * @param      {boolean}  alive   alive || dead
     */
    private activate_cell(i:number, j:number, alive = true) {
        const box = this.cell_elem(i, j);
        this.grid.set(i, j, alive);
        box.style.background = alive ? this.color() : 'initial';
    }

    /**
     * takes index of cell an return its HTML element
     * @param  {number}         i row index
     * @param  {number}         j column index
     * @return {HTMLDivElement}
     */
    private cell_elem(i: number, j: number): HTMLDivElement {
        const cell = this.$refs[this.grid.cell_id(i, j)] as Vue[];
        return cell[0].$refs.cell as HTMLDivElement;
    }

    /**
     * update census stat after draw end (mousedown or click)
     */
    private on_draw_end() {
        this.grid.update_census();
    }

}
</script>


<style lang="scss" scoped>
    @import './style';
</style>
