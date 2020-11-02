<template>
    <div class="cells">
        <template v-for="i in 29">
            <div class="row">
                <div v-for="j in 50"
                    @mousedown="drag_start()"
                    @mouseup="drag_end()"
                    @mousemove="mouseover($event, false, [i,j])"
                    @click="mouseover($event, true, [i,j])"
                    :class="{col: true, box: true, color: grid[`${i}:${j}`]==1}"
                ></div>
            </div>
        </template>
    </div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class Grid extends Vue {
    dragging: boolean = false;
    grid: {[index:string]: 0|1} = {};

    drag_start() {
        this.dragging = true;
    }

    drag_end() {
        this.dragging = false;
        this.$forceUpdate();
    }

    mouseover(ev: Event, clicked = false, [i, j]: [number, number]) {
        if (!this.dragging && !clicked) return;

        let box = (((ev as MouseEvent).target) as HTMLDivElement);
        box.style.background = "#17A2B8";

        this.grid[`${i}:${j}`] = 1;
    }
}
</script>


<style lang="scss" scoped>
@mixin box($size) {
    // flex-item with equal width & height
    padding: 0;
    flex: 0 0 $size;
    max-width: $size;
    padding-bottom: $size;
}

.row {
    overflow: hidden;

    .col.box {
        height: 0;
        border: 0.5px solid #000;    
        &.color {
            background: #17A2B8;
        }
    }
}

.box {
    @include box(2%);
}
</style>
