<template>
    <div id="app" class="container-fluid conway">

        <grid
            :matrix="[]"
        />

        <controls />

    </div>
</template>


<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Grid from './components/Grid.vue';
import Controls from './components/Controls/index.vue';

@Component({
    components: {
        Grid,
        Controls,
    },
})

export default class App extends Vue {


}
</script>

<style lang="scss">
    @import './sass/app';
</style>
