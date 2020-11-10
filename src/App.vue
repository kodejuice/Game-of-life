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
import Toasted from 'vue-toasted';
import W from './state';

import ConwayGrid from './util/ConwayGrid';

Vue.use(Toasted);

@Component({
    components: {
        Grid,
        Controls,
    },
})

export default class App extends Vue {
    halt_simulation: boolean = false;
    conway_grid: ConwayGrid = new ConwayGrid();

    mounted() {
        // recommend a chrome-based browser
        const isChromeBased = !!(window as any).chrome;
        if (!isChromeBased) {
            this.$toasted.show('Please switch to a Chromium based browser (e.g Edge, Opera, Vivaldi)', {
                position: 'top-left',
                type: 'info',
                theme: 'outline',
            });
        }
    }

}
</script>

<style lang="scss">
@import './sass/app';
.toasted-container.top-left {
    top: 0%;
    left: 3%;
}
</style>
