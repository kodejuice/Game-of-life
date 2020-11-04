<template>
    <div id="app" class="container-fluid conway">

        <grid
            :grid="conway_grid"
        />

        <controls
            :grid="conway_grid"
        />

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
    conway_grid: ConwayGrid = new ConwayGrid();

}
</script>

<style lang="scss">
    @import './sass/app';
</style>
