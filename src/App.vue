<template>
    <div id="app" class="container-fluid conway">

        <div style="position: relative;">
            <grid
                :grid="conway_grid"
                :is_halted="halt_simulation"
            />

            <controls
                :grid="conway_grid"
                @halt="halt_simulation = true"
                @resume="halt_simulation = false"
            />
        </div>

    </div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Grid from './components/Grid/index.vue';
import Controls from './components/Controls/index.vue';

import ConwayGrid from './util/ConwayGrid';

@Component({
    components: {
        Grid,
        Controls,
    },
})

export default class App extends Vue {
    halt_simulation: boolean = false;
    conway_grid: ConwayGrid = new ConwayGrid();

}
</script>

<style lang="scss">
@import './sass/app';
</style>
