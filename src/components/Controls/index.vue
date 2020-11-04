<template>
    <div class="controls row">
        <div class="col col-2 rand">
            <b-button variant="outline-info" title="Randomize grid cells">
                <b-icon icon="shuffle" /> random
            </b-button>
        </div>

        <div class="col col-1 color" title="Change cell color">
            <change-color-button />
        </div>
        <div class="col col-1 clear">
            <b-button variant='danger' title="Clear grid">
                <b-icon icon="x-circle-fill" />
            </b-button>
        </div>

        <div class="col col-2 zoom">
            <zoom-button />
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
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { BButton, BIcon, BIconShuffle, BIconXCircleFill } from 'bootstrap-vue';
import ChangeColorButton from './ChangeColorButton.vue';
import ChangeSpeedButton from './ChangeSpeedButton.vue';
import ZoomButton from './ZoomButton.vue';
import PlayButton from './PlayButton.vue';
import ConwayGrid from '../../util/ConwayGrid';

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
    @Prop() grid!: ConwayGrid;

}
</script>


<style lang="scss" scoped>
    @import './style.scss';
</style>
