<template>
    <div>
        <div class="overlay" v-if="overlay"></div>
        <div class="controls row">
            <div class="col col-2 rand">
                <b-button
                    @click="shuffle"
                    :disabled="running"
                    variant="outline-info"
                    title="Shuffle grid cells"
                >
                    <b-icon icon="shuffle" /> random
                </b-button>
            </div>

            <div class="col col-1 color" title="Change cell color">
                <change-color-button
                    @update_color="update_cell_color($event)"
                />
            </div>

            <div class="col col-1 clear">
                <b-button :disabled="running" @click="clear" variant='danger' title="Clear grid">
                    <b-icon icon="x-circle-fill" />
                </b-button>
            </div>

            <div class="col col-2 zoom">
                <zoom-button
                    :disabled="running"
                    :can_scale_up="grid.can_scale('up')"
                    :can_scale_down="grid.can_scale('down')"
                    @scale_up="scale('up')"
                    @scale_down="scale('down')"
                />
            </div>

            <div class="col col-3 population" title="Census">
                <p class="text-info">[{{grid.alive().size}} alive]</p>
                <p class="text-warning" title="Generations">[{{grid.generations}} gen.]</p>
            </div>

            <div class="col"></div>
            <div class="col col-2 center speed-btn">
                <change-speed-button />
            </div>

            <div class="col col-2 center play-pause">
                <play-button
                    :running.sync="running"
                />
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import { BButton, BIcon, BIconShuffle, BIconXCircleFill } from 'bootstrap-vue';
import {defer} from 'lodash';
import ChangeColorButton from './ChangeColorButton.vue';
import ChangeSpeedButton from './ChangeSpeedButton.vue';
import ZoomButton from './ZoomButton.vue';
import PlayButton from './PlayButton.vue';
import ConwayGrid from '../../util/ConwayGrid';
import W from '../../state';
import Toasted from 'vue-toasted';
Vue.use(Toasted);

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
    running: boolean = false;
    @Prop() grid!: ConwayGrid;

    mounted() {
        const that = this;
        W.APP_STATE.grid.simulation.play_pause = (running: boolean = true)=>{
            that.running = running;
        };

        // globalize toasted plugin
        W.APP_STATE.grid.simulation.showToast = (message: string, delay: number = 2300, type = 'error') => {
            that.$toasted.show(message, {
                type,
                duration: delay,
                theme: 'bubble',
                position: 'top-left',
                singleton: true,
            });
        }
    }

    /**
     * scale grid
     * @param {'up'|'down'} dir direction
     */
    scale(dir: 'up'|'down') {
        this.dom_update(()=>{
            this.grid.scale(dir);
        });
    }

    /**
     * clear grid
     */
    clear() {
        if (this.active_cells_count==0 || !confirm("Clear the grid?")) return;
        this.dom_update(()=>{
            W.APP_STATE.grid.clear_grid();
        })
    }

    /**
     * shuffle grid
     */
    shuffle() {
        if (this.active_cells_count == 0) return;
        this.dom_update(()=>{
            W.APP_STATE.grid.shuffle_grid();
        });
    }

    /**
     * onColorChange event handler
     * @param {string} color [description]
     */
    update_cell_color(color: string) {
        W.APP_STATE.cell_color = color;
    }

    /**
     * get active cells count
     */
    get active_cells_count() {
        return this.grid.alive().size;
    }

    /**
     * dom-update operation handler
     * displays an overlay while the dom-update fn is running
     * @param {()=>void} fn  dom-update fn callback
     */
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

    /**
     * `running` state watcher
     */
    @Watch('running')
    onPlayToggle(running: boolean) {
        const {simulation} = W.APP_STATE.grid;
        if (running) {
            simulation.run();
        } else {
            simulation.stop();
        }
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
