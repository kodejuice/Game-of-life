<template>
    <div>
        <div class="overlay" v-if="overlay"></div>
        <div class="controls row">
            <div class="col col-2 rand">
                <b-button variant="outline-info" title="Shuffle grid cells" @click="shuffle">
                    <b-icon icon="shuffle" /> random
                </b-button>
            </div>

            <div class="col col-1 color" title="Change cell color">
                <change-color-button
                    @update_color="update_cell_color($event)"
                />
            </div>

            <div class="col col-1 clear">
                <b-button variant='danger' title="Clear grid" @click="clear">
                    <b-icon icon="x-circle-fill" />
                </b-button>
            </div>

            <div class="col col-2 zoom">
                <zoom-button
                    :can_scale_up="grid.can_scale('up')"
                    :can_scale_down="grid.can_scale('down')"
                    @scale_up="scale('up')"
                    @scale_down="scale('down')"
                />
            </div>

            <div class="col col-3 population" title="Census">
                <p class="text-info">[{{grid.alive().size}} alive]</p>
                <p class="text-danger">[{{grid.dead().size}} dead]</p>
            </div>

            <div class="col"></div>
            <div class="col col-2 center speed-btn">
                <change-speed-button />
            </div>

            <div class="col col-2 center play-pause">
                <play-button />
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { BButton, BIcon, BIconShuffle, BIconXCircleFill } from 'bootstrap-vue';
import {defer} from 'lodash';
import ChangeColorButton from './ChangeColorButton.vue';
import ChangeSpeedButton from './ChangeSpeedButton.vue';
import ZoomButton from './ZoomButton.vue';
import PlayButton from './PlayButton.vue';
import ConwayGrid from '../../util/ConwayGrid';
import W from '../../state';

@Component({
    components: {
        BButton,
        BIcon,
        BIconShuffle,
        BIconXCircleFill,
        ChangeColorButton,
        ChangeSpeedButton,
        PlayButton,
        ZoomButton,
    }
})
export default class Controls extends Vue {
    overlay: boolean = false;
    @Prop() grid!: ConwayGrid;

    scale(dir: 'up'|'down') {
        this.dom_update(()=>{
            this.grid.scale(dir);
        });
    }

    clear() {
        if (this.grid_size==0 || !confirm("Clear the grid?")) return;
        this.dom_update(()=>{
            W.APP_STATE.grid.clear_grid();
        })
    }

    shuffle() {
        if (this.grid_size == 0) return;
        this.dom_update(()=>{
            W.APP_STATE.grid.shuffle_grid();
        });
    }

    update_cell_color(color: string) {
        W.APP_STATE.cell_color = color;
    }

    get grid_size() {
        return this.grid.alive().size;
    }

    private dom_update(fn: ()=>void) {
        this.$emit('halt');
        this.overlay = true;
        this.$nextTick(()=>{
            defer(()=>{
                fn();
                this.$emit('resume');
                this.overlay = false;
            });
        });
    }
}
</script>


<style lang="scss" scoped>
@import './style.scss';

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    background: rgba(0,0,0,0.4);
}

</style>
