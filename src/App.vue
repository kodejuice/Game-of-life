<template>
    <div id="app" class="container-fluid conway">

        <about-modal />

        <div style="position: relative;">
            <header class="header row">
                <div class="col-6">
                    <h1 title="Conway's game of life"> Game Of Life </h1>
                </div>
                <div class="col"></div>
                <div class="col-4">
                    <b-button v-b-modal.about href="#" class="btn btn-light about"> ABOUT </b-button>
                </div>
            </header>

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
import AboutModal from './components/AboutModal.vue';
import { BButton, ModalPlugin } from 'bootstrap-vue';
import Controls from './components/Controls/index.vue';
import Toasted from 'vue-toasted';
import W from './state';

import ConwayGrid from './util/ConwayGrid';

Vue.use(Toasted);
Vue.use(ModalPlugin);

@Component({
    components: {
        Grid,
        AboutModal,
        Controls,
        BButton,
    },
})
export default class App extends Vue {
    halt_simulation: boolean = false;
    conway_grid: ConwayGrid = new ConwayGrid();
    //notify_msg: boolean = false;

    mounted() {
        /*
        if (this.notify_msg) return;
        // recommend a chrome-based browser
        const isChromeBased = !!(window as any).chrome;
        if (!isChromeBased) {
            this.$toasted.show('Please switch to a Chromium based browser (e.g Chrome, Opera, Edge)', {
                position: 'top-left',
                type: 'info',
                theme: 'outline',
            });
            this.notify_msg = true;
        }
        */
    }

}
</script>

<style lang="scss">
@import './sass/app';
.toasted-container.top-left {
    top: 0%;
    left: 3%;
}

header.header {
    div.col-6 {
        h1 {
            margin-bottom: 0;
            text-shadow: 3px 3px 2px #111;
        }
    }
    div.col-4 {
        max-width: 100px;
    }
}

.modal-content {
    color: #282c34;
}
</style>
