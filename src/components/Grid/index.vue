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
                        :key="Math.random()"
                        :index="{i:i-1, j:j-1}"
                        :active="grid.get(i-1, j-1)"
                        :scale_factor="grid.scale_factor()"
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


@Component({
    components: {
        Cell,
    }
})
export default class Grid extends Vue {
    dragging: boolean = false;
    @Prop() grid!: ConwayGrid;
    @Prop() is_halted!: boolean;

    drag_start() {
        this.dragging = true;
    }

    drag_end() {
        this.dragging = false;
        this.on_draw_end();
    }

    mousemove(ev: Event, clicked = false, index: {i:number, j:number}) {
        if ((!this.dragging && !clicked) || this.is_halted) return;

        let box = (((ev as MouseEvent).target) as HTMLDivElement);
        box.style.background = "#17A2B8";

        const {i, j} = index;
        this.grid.set(i, j, true);

        if (clicked) {
            this.on_draw_end();
        }
    }

    private on_draw_end() {
        this.grid.update_census();
    }
}
</script>


<style lang="scss" scoped>
    @import './style';
</style>
